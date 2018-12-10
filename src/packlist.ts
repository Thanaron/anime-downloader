import axios from 'axios';
import log from 'electron-log';
import _ from 'lodash';

class Packlist {
    static search(
        input: string,
        resolution: string,
        uniqueEpisodes: boolean
    ): Promise<void | HSRelease[]> {
        log.debug(`Requesting data for ${input} with resolution ${resolution}`);
        return axios
            .get(`http://xdcc.horriblesubs.info/search.php?t=${input} ${resolution}`)
            .then(response => response.data)
            .then(data => data.split(/[\r\n]+/))
            .then(text => text.map(Packlist.parseLine))
            .then(result => result.filter((entry: HSRelease) => entry !== null))
            .then(result => _.sortBy(result, ['name', 'episode']))
            .then(result => (uniqueEpisodes ? Packlist.showUniqueEpisodesOnly(result) : result))
            .catch(error => {
                log.error(error);
            });
    }

    static parseLine(line: string): HSRelease | null {
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
            episode: parseInt(match[5], 10),
            resolution: parseInt(match[6], 10),
            extension: match[7],
        };
    }

    static showUniqueEpisodesOnly(results: HSRelease[]): HSRelease[] {
        const list: _.Dictionary<HSRelease[]> = _.groupBy(results, 'name');
        const formattedList = Object.values(list);
        const output = formattedList.map(series => _.uniqBy(series, 'episode'));
        return _.flatten(output);
    }
}

export default Packlist;
