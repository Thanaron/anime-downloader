import ircXdcc from 'irc-xdcc';
import log from 'electron-log';

class IrcDownloader {
    static async connect(downloadPath: string, username: string) {
        try {
            let instance = ircXdcc('irc.rizon.net', username || 'user', {
                userName: username || 'user',
                channels: ['#horriblesubs'],
                destPath: downloadPath,
                autoConnect: true,
                autoRejoin: true,
                acceptUnpooled: true,
                resume: true,
            });
            return instance;
        } catch (error) {
            log.error(error);
        }
    }

    static download(
        instance: any,
        episodesToDownload: HSReleaseDownloadInfo[]
    ) {
        episodesToDownload.forEach((downloadInfo: HSReleaseDownloadInfo) => {
            instance
                .xdcc({
                    botNick: downloadInfo.release.bot,
                    packId: downloadInfo.release.pack,
                })
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
