const axios = require('axios');
const log = require('electron-log');

export default class Packlist {
    static search(searchData) {
        return axios
            .get(
                `http://xdcc.horriblesubs.info/search.php?t=${searchData.name} ${
                    searchData.resolution
                }`
            )
            .then(response => response.data)
            .then(data => data.split(/[\r\n]+/))
            .then(text => text.map(Packlist.parseLine))
            .then(result => result.filter(entry => entry !== null))
            .catch(error => {
                log.error(error);
            });
    }

    static parseLine(line) {
        const regex = /p\.k\[\d+\]\s=\s{b:"([^"]+)",\sn:(\d+),\ss:(\d+),\sf:"\[HorribleSubs\]\s(.*)\s-\s(\d*)\s\[(\d*)p\]\.(\w*)"};/;
        const match = line.match(regex);

        if (match === null) {
            return null;
        }

        return {
            bot: match[1],
            pack: parseInt(match[2], 10),
            size: parseInt(match[3], 10),
            name: match[4],
            episode: match[5],
            resolution: parseInt(match[6], 10),
            extension: match[7],
        };
    }
}
