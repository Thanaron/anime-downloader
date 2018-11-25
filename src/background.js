import {
    app, protocol, BrowserWindow, ipcMain,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

unhandled({ logger: log.error });

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const isDevelopment = process.env.NODE_ENV !== 'production';

let win;
let searchWindow;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: `HorribleSubs Downloader - Version ${app.getVersion()}`,
        webPreferences: {
            webSecurity: false,
        },
    });
    searchWindow = new BrowserWindow({ show: false });

    if (isDevelopment || process.env.IS_TEST) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    win.on('closed', () => {
        win = null;
    });
}

function createScrapingWindow(data) {
    searchWindow.loadURL(`https://xdcc.horriblesubs.info/?search=${data.name} ${data.quality}`);

    searchWindow.webContents.once('did-navigate', () => {
        searchWindow.webContents.executeJavaScript(
            `
            var script = document.createElement('script');
            script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js";
            document.getElementsByTagName('head')[0].appendChild(script);

            setTimeout(() => {
                var rows = [];
                var $headers = $("th").clone(true);
                $headers.text(function(index, text) { return text.substring(0, text.length-5).toLowerCase()});
                var $rows = $("tbody tr").each(function(index) {
                    $cells = $(this).find("td");
                    rows[index] = {};
                    $cells.each(function(cellIndex) {
                        rows[index][$($headers[cellIndex]).text()] = $(this).text();
                    });    
                });

                var table = {};
                table = rows;
                require('electron').ipcRenderer.send('documentResult', table);
            }, 1000);
        `,
        );
    });
}

ipcMain.on('reloadData', (event, data) => {
    createScrapingWindow(data);
});

ipcMain.on('documentResult', (event, data) => {
    data.shift();
    win.webContents.send('updateTable', data);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        await installVueDevtools();
    } else {
        autoUpdater.autoDownload = false;
        autoUpdater.checkForUpdates();
    }

    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
    log.info(`Update available: ${JSON.stringify(info)}`);
});
autoUpdater.on('update-not-available', (info) => {
    log.info(`Update not available: ${JSON.stringify(info)}`);
});

autoUpdater.on('error', (ev, err) => {
    log.info(`Error in auto-updater: ${err}`);
});

autoUpdater.on('download-progress', (progress) => {
});

autoUpdater.on('update-downloaded', (ev, info) => {
    log.info(`Update downloaded successfully. ${JSON.stringify(info)}`);
});
