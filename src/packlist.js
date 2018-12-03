const axios = require('axios');
const log = require('electron-log');
const _ = require('lodash');

export default class Packlist {
    static search(input, resolution, uniqueEpisodes) {
        log.debug(`Requesting data for ${input} with resolution ${resolution}`);
        return axios
            .get(`http://xdcc.horriblesubs.info/search.php?t=${input} ${resolution}`)
            .then(response => response.data)
            .then(data => data.split(/[\r\n]+/))
            .then(text => text.map(Packlist.parseLine))
            .then(result => result.filter(entry => entry !== null))
            .then(result => _.sortBy(result, ['name', 'episode']))
            .then(result => (uniqueEpisodes ? Packlist.showUniqueEpisodesOnly(result) : result))
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

    static showUniqueEpisodesOnly(results) {
        let list = _.groupBy(results, 'name');
        list = Object.values(list);
        const output = list.map(series => _.uniqBy(series, 'episode'));
        return _.flatten(output);
    }
}
