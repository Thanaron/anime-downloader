import axios from 'axios';
import logger from '@/common/utils/logger';
import { HSRelease } from '@/types/types';
import _ from 'lodash';

class Packlist {
    static async search(
        name: string,
        resolution: number,
        group: boolean,
        sort: boolean
    ) {
        logger.debug(
            `Requesting data for ${name} with resolution ${resolution}`
        );
        return axios
            .get(
                `http://xdcc.horriblesubs.info/search.php?t=${name} ${resolution}`
            )
            .then(response => response.data)
            .then(data => data.split(/[\r\n]+/))
            .then(text => text.map(Packlist.parseLine))
            .then(result => result.filter((entry: HSRelease) => entry !== null))
            .then(result =>
                sort ? _.sortBy(result, ['name', 'episode']) : result
            )
            .then(result =>
                group ? Packlist.showUniqueEpisodesOnly(result) : result
            )
            .catch(error => {
                logger.error(error);
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
            episode: match[5],
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
