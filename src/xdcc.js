const ircXdcc = require('irc-xdcc');
const log = require('electron-log');

export default class Downloader {
    constructor(list) {
        this.list = list;
        ircXdcc('irc.rizon.net', 'thanaron', {
            userName: 'thana',
            realName: 'thanaron',
            channels: ['#horriblesubs'],
            destPath: './downloads',
            autoConnect: true,
            autoRejoin: true,
            acceptUnpooled: true,
            progressInterval: 5,
            resume: true,
        })
            .then((instance) => {
                log.debug(instance);
                this.instance = instance;
                this.download();

                this.instance.on('xdcc-progress', (xdccInstance, received) => {
                    log.debug(`${JSON.stringify(xdccInstance)} ${received}`);
                });
            })
            .catch((error) => {
                log.error(error);
            });
    }

    download() {
        this.list.forEach((pack) => {
            this.instance
                .xdcc({ botNick: pack.bot, packId: pack.pack })
                .then((xdccInstance) => {
                    log.debug(xdccInstance);
                    xdccInstance.start();
                })
                .catch((error) => {
                    log.error(error);
                });
        });
    }
}
