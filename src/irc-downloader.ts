import { HSReleaseDownloadInfo } from './types/types';

import ircXdcc from 'irc-xdcc';
import log from 'electron-log';

class IrcDownloader {
    public instance: any;
    public isConnected: boolean = false;
    private downloadPath: string;
    private username: string;

    constructor(downloadPath: string, username: string) {
        this.downloadPath = downloadPath;
        this.username = username;
    }

    async connect() {
        try {
            let instance = await ircXdcc(
                'irc.rizon.net',
                this.username || 'user',
                {
                    userName: this.username || 'user',
                    channels: ['#horriblesubs'],
                    destPath: this.downloadPath,
                    autoConnect: true,
                    autoRejoin: true,
                    acceptUnpooled: true,
                    resume: true,
                }
            );
            this.instance = instance;
            return instance;
        } catch (error) {
            log.error(error);
        }
    }

    registerGenericEvents(episodesToDownload: HSReleaseDownloadInfo[]) {
        this.instance.on(
            'xdcc-progress',
            (xdccInstance: XdccInstance, received: number) => {
                const entry = this.findEntry(xdccInstance, episodesToDownload);
                if (entry) {
                    entry.progress = xdccInstance.xdccInfo.progress;
                    entry.received = (received / 1024 / 1024).toFixed(0);
                    log.info(
                        `XDCC-PROGRESS: Progress update for: ${
                            entry.release.name
                        } - ${entry.release.episode} | ${entry.progress}% - ${
                            entry.received
                        } MB received.`
                    );
                } else {
                    log.warn('Entry not found');
                }
            }
        );

        this.instance.on('xdcc-complete', (xdccInstance: XdccInstance) => {
            const entry = this.findEntry(xdccInstance, episodesToDownload);
            if (entry) {
                entry.progress = 100;
                entry.received = entry.release.size;
                entry.finished = true;
                log.info(
                    `XDCC-COMPLETE: Download complete: ${
                        entry.release.name
                    } - ${entry.release.episode}`
                );
            }
        });

        this.instance.on('registered', (message: any) => {
            log.info(
                `IRC-REGISTERED: Connected to server: ${JSON.stringify(
                    message
                )}`
            );
        });

        this.instance.on(
            'quit',
            (nick: string, reason: string, channels: any, message: string) => {
                if (nick !== this.username) {
                    return;
                }
                log.warn(
                    `IRC-QUIT: User ${nick} has quit the server. Reason: ${reason} - ${JSON.stringify(
                        message
                    )} - Channel: ${channels}`
                );
            }
        );

        this.instance.on(
            'kill',
            (nick: string, reason: string, channels: any, message: any) => {
                if (nick !== this.username) {
                    return;
                }
                log.warn(
                    `IRC-KILL: User connection of ${nick} has been killed. Reason: ${reason}  - ${JSON.stringify(
                        message
                    )} - Channel: ${JSON.stringify(channels)}`
                );
            }
        );

        this.instance.on(
            'kick',
            (
                channel: string,
                nick: string,
                by: string,
                reason: any,
                message: any
            ) => {
                if (this.username !== nick) {
                    return;
                }

                log.info(
                    `IRC-KICK: User ${nick} has been kicked from ${channel} by ${by}. Reason: ${reason} - ${message}`
                );
            }
        );

        this.instance.on('connected', (channels: any) => {
            this.isConnected = true;
            log.info(`IRC-CONNECTED: Joined ${JSON.stringify(channels)}`);
        });

        this.instance.on('xdcc-error', (message: any) => {
            log.error(`XDCC-ERROR: ${message}`);
        });

        this.instance.on('xdcc-created', (xdccInstance: XdccInstance) => {
            log.info(
                `XDCC-CREATED: Created new XDCC instance: ${JSON.stringify(
                    xdccInstance
                )}`
            );
        });

        this.instance.on('xdcc-removed', (xdccInstance: XdccInstance) => {
            log.info(
                `XDCC-REMOVED: Removed XDCC instance ${JSON.stringify(
                    xdccInstance
                )}`
            );
        });

        this.instance.on('xdcc-started', (xdccInstance: XdccInstance) => {
            log.info(
                `XDCC-STARTED: XDCC SEND command has been sent: ${JSON.stringify(
                    xdccInstance
                )}`
            );
        });

        this.instance.on('xdcc-queued', (xdccInstance: XdccInstance) => {
            log.info(
                `XDCC-QUEUED: Requested XDCC instance added to queue: ${JSON.stringify(
                    xdccInstance
                )}`
            );
        });

        this.instance.on('xdcc-canceled', (xdccInstance: XdccInstance) => {
            log.warn(
                `XDCC-CANCELED: XDCC transfer has been canceled: ${JSON.stringify(
                    xdccInstance
                )}`
            );
            const entry = this.findEntry(xdccInstance, episodesToDownload);
            if (entry) {
                entry.error = xdccInstance.xdccInfo.error;
                entry.progress = 100;
            }
        });

        this.instance.on('xdcc-connect', (xdccInstance: XdccInstance) => {
            log.info(
                `XDCC-CONNECT: XDCC transfer starts : ${JSON.stringify(
                    xdccInstance
                )}`
            );
        });

        this.instance.on('xdcc-dlerror', (xdccInstance: XdccInstance) => {
            log.error(
                `XDCC-DLERROR: ${JSON.stringify(JSON.stringify(xdccInstance))}`
            );
            const entry = this.findEntry(xdccInstance, episodesToDownload);
            if (entry) {
                entry.error = xdccInstance.xdccInfo.error;
                entry.progress = 100;
            }
        });
    }

    isEntry(
        xdccInstance: XdccInstance,
        name: string,
        episode: string
    ): boolean {
        return (
            xdccInstance.xdccInfo.fileName!.includes(name) &&
            xdccInstance.xdccInfo.fileName!.includes(episode)
        );
    }

    findEntry(
        xdccInstance: XdccInstance,
        episodesToDownload: HSReleaseDownloadInfo[]
    ): HSReleaseDownloadInfo | undefined {
        return episodesToDownload.find(element =>
            this.isEntry(
                xdccInstance,
                element.release.name,
                element.release.episode
            )
        );
    }

    download(episode: HSReleaseDownloadInfo) {
        this.instance
            .xdcc({
                botNick: episode.release.bot,
                packId: episode.release.pack,
            })
            .then((xdccInstance: XdccInstance) => {
                xdccInstance.start();
            })
            .catch((error: any) => {
                log.error(error.message);
            });
    }

    downloadAll(episodes: HSReleaseDownloadInfo[]) {
        episodes.forEach((downloadInfo: HSReleaseDownloadInfo) => {
            this.download(downloadInfo);
        });
    }

    cancel(episode: HSReleaseDownloadInfo) {
        this.instance
            .xdcc({
                botNick: episode.release.bot,
                packId: episode.release.pack,
            })
            .then((xdccInstance: XdccInstance) => {
                xdccInstance.start();
            })
            .catch((error: any) => {
                log.error(error.message);
            });
    }

    cancelAll(episodes: HSReleaseDownloadInfo[]) {
        episodes.forEach((downloadInfo: HSReleaseDownloadInfo) => {
            this.cancel(downloadInfo);
        });
    }

    disconnect() {
        this.instance.disconnect();
    }
}

export default IrcDownloader;
