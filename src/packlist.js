const axios = require('axios');
const log = require('electron-log');

export default class ReleaseSearcher {
    static search(name) {
        axios
            .get(`http://xdcc.horriblesubs.info/search.php?t=${name}`)
            .then(response => {
                log.info(response.data);
            })
            .catch(error => {
                log.error(error);
            });
    }
}
