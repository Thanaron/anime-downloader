const ircXdcc = require('irc-xdcc');

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
                console.log(instance);
                this.instance = instance;
                this.download();

                this.instance.on('xdcc-progress', (xdccInstance, received) => {
                    console.log(`${JSON.stringify(xdccInstance)} ${received}`);
                });
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });
    }

    download() {
        this.list.forEach((pack) => {
            this.instance
                .xdcc({ botNick: pack.bot, packId: pack.pack })
                .then((xdccInstance) => {
                    console.log(xdccInstance);
                    xdccInstance.start();
                })
                .catch((error) => {
                    console.error(`Error: ${error}`);
                });
        });
    }
}
