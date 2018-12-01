const Store = require('electron-store');

const defaults = {
    config: {
        visibleColumns: ['name', 'episode', 'resolution', 'size'],
        autoDownload: false,
        autoCheckUpdate: true,
        uniqueEpisodesOnly: true,
    },
};

const store = new Store({
    defaults,
});

export default store;
