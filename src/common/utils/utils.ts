import axios from 'axios';
import store from '@/common/store/store';
import logger from './logger';

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
        logger.info('Generated new username: %s', response.data);
        setUsername(response.data);
        return response.data;
    } catch (err) {
        logger.error(err);
    }
}

function setUsername(username: string) {
    store.commit('config/updateField', {
        path: 'username',
        value: username,
    });
}

export default generateRandomUsername;
