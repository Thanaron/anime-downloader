const Store = require('electron-store');

const defaults = {
    config: {
        visibleColumns: ['name', 'episode', 'resolution'],
        autoDownload: false,
        autoCheckUpdate: true,
    },
};

const store = new Store({
    defaults,
    name: 'hs-downloader.config',
});

export default store;
