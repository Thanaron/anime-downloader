const ircXdcc = require('irc-xdcc');
const log = require('electron-log');

export default class Downloader {
    constructor(list) {
        this.list = list;
    }

    async connect() {
        ircXdcc('irc.rizon.net', 'pogchamp1', {
            userName: 'pogchamp1',
            realName: 'pogchamp2',
            channels: ['#horriblesubs'],
            destPath: './downloads',
            autoConnect: true,
            autoRejoin: true,
            acceptUnpooled: true,
            resume: true,
        })
            .then(instance => {
                this.instance = instance;
            })
            .catch(error => {
                log.error(error);
            });
    }

    download() {
        this.list.forEach(pack => {
            this.instance
                .xdcc({ botNick: pack.bot, packId: pack.pack })
                .then(xdccInstance => {
                    xdccInstance.start();
                })
                .catch(error => {
                    log.error(error);
                });
        });
    }
}
