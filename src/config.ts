const Store = require('electron-store');
const { app } = require('electron').remote;

const defaults = {
    config: {
        visibleColumns: ['name', 'episode', 'resolution', 'size'],
        autoDownload: false,
        autoCheckUpdate: true,
        uniqueEpisodesOnly: true,
        downloadPath: app.getPath('downloads'),
    },
};

const store = new Store({
    defaults,
});

export default store;
