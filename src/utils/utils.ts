import axios from 'axios';
import store from '../store/store';
import status from '../status';
import { StatusType } from '@/types/types';

const log = require('electron-log');

async function generateRandomUsername() {
    status.setStatus('Generating new username..', StatusType.Info);
    try {
        const response = await axios.get('https://passwordrandom.com/query', {
            params: {
                command: 'password',
                count: 1,
                format: 'plain',
                scheme: 'cvcvvcv',
            },
        });
        log.info(`Generated new username: ${response.data}`);
        setUsername(response.data);
        status.setStatus(
            `Generated new username: ${response.data}`,
            StatusType.Success
        );
        return response.data;
    } catch (err) {
        log.error(err);
        status.setStatus(`Unable to generate a new username`, StatusType.Error);
    }
}

function setUsername(username: string) {
    store.dispatch('set', {
        key: 'username',
        value: username,
    });
}

export default generateRandomUsername;
