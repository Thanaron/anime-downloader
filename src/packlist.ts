import axios from 'axios';
import status from './status';
import { StatusType } from './types/types';

const log = require('electron-log');

class Packlist {
    static async search(
        name: string,
        resolution: number,
        group: boolean,
        sort: boolean
    ) {
        status.setStatus('Loading..');
        try {
            const response = await axios.get(
                `https://hs-downloader-api.vapor.cloud/get/${name}/${resolution}?group=${group}&sort=${sort}`
            );
            status.setStatus(
                `Found ${response.data.length} entries`,
                StatusType.Success
            );
            return response.data;
        } catch (err) {
            log.error(err);
            status.setStatus(err.message, StatusType.Error);
        }
    }
}

export default Packlist;
