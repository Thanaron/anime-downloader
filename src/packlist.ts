import axios from 'axios';
import log from 'electron-log';
class Packlist {
    static search(
        name: string,
        resolution: number,
        group: boolean,
        sort: boolean
    ) {
        if (name.length < 3) {
            throw Error('pogchamp');
        }

        return axios
            .get(
                `https://hs-downloader-api.vapor.cloud/get/${name}/${resolution}?group=${group}&sort=${sort}`
            )
            .then(response => {
                return response.data;
            })
            .catch(err => {
                log.error(err);
            });
    }
}

export default Packlist;
