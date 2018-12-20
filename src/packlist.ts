import axios from 'axios';
import log from 'electron-log';
class Packlist {
    static async search(
        name: string,
        resolution: number,
        group: boolean,
        sort: boolean
    ) {
        try {
            const response = await axios.get(
                `https://hs-downloader-api.vapor.cloud/get/${name}/${resolution}?group=${group}&sort=${sort}`
            );
            return response.data;
        } catch (err) {
            log.error(err);
        }
    }
}

export default Packlist;
