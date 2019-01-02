const Store = require('electron-store');
const { app } = require('electron').remote;

const defaults = {
    config: {
        visibleColumns: {
            bot: false,
            name: true,
            episode: true,
            resolution: true,
            pack: false,
            size: true,
        },
        autoDownload: false,
        autoCheckUpdate: true,
        uniqueEpisodesOnly: true,
        downloadPath: app.getPath('downloads'),
        selectedTheme: {
            name: 'Dark',
            file: 'Dark.css',
        },
    },
};

const store = new Store({
    defaults,
});

export default store;
