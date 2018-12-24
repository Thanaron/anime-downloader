import axios from 'axios';
import store from '../store/store';

const log = require('electron-log');

async function generateRandomUsername() {
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
        return response.data;
    } catch (err) {
        log.error(err);
    }
}

function setUsername(username: string) {
    store.dispatch('set', {
        key: 'username',
        value: username,
    });
}

export default generateRandomUsername;
