const ircXdcc = require('irc-xdcc');
const log = require('electron-log');

class IrcDownloader {
    public instance: any;
    private episodesToDownload: HSReleaseDownloadInfo[];
    private downloadPath: string;
    private username: string;

    constructor(
        episodesToDownload: HSReleaseDownloadInfo[],
        downloadPath: string,
        username: string
    ) {
        this.episodesToDownload = episodesToDownload;
        this.downloadPath = downloadPath;
        this.username = username;
    }

    async connect() {
        ircXdcc('irc.rizon.net', this.username || 'user', {
            userName: this.username || 'user',
            channels: ['#horriblesubs'],
            destPath: this.downloadPath,
            autoConnect: true,
            autoRejoin: true,
            acceptUnpooled: true,
            resume: true,
        })
            .then((instance: any) => {
                this.instance = instance;
            })
            .catch((error: any) => {
                log.error(error);
            });
    }

    download() {
        this.episodesToDownload.forEach((downloadInfo: HSReleaseDownloadInfo) => {
            this.instance
                .xdcc({ botNick: downloadInfo.release.bot, packId: downloadInfo.release.pack })
                .then((xdccInstance: any) => {
                    xdccInstance.start();
                })
                .catch((error: any) => {
                    log.error(error);
                });
        });
    }
}

export default IrcDownloader;
