'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import {
    createProtocol,
    installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

unhandled({ logger: log.error });

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = 'info';

log.info('App starting...');

const isDevelopment = process.env.NODE_ENV !== 'production';
if (isDevelopment) {
    // Don't load any native (external) modules until the following line is run:
    require('module').globalPaths.push(process.env.NODE_MODULES_PATH);
}

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: any;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createMainWindow() {
    const window = new BrowserWindow({
        backgroundColor: '#2E3440',
        width: 800,
        height: 770,
        minWidth: 800,
        minHeight: 770,
        frame: false,
        title: 'HS Downloader',
        webPreferences: {
            webSecurity: false,
        },
    });

    if (isDevelopment) {
        // Load the url of the dev server if in development mode
        window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST)
            window.webContents.openDevTools({ mode: 'bottom' });
    } else {
        createProtocol('app');
        //   Load the index.html when not in development
        window.loadURL('app://./index.html');
    }

    window.on('closed', () => {
        mainWindow = null;
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        await installVueDevtools();
        mainWindow = createMainWindow();
    } else {
        autoUpdater.autoDownload = false;
        autoUpdater.checkForUpdates();
    }
});

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});

let updateWindow: any;

autoUpdater.on('update-available', info => {
    log.info(`Update available: ${JSON.stringify(info)}`);

    updateWindow = new BrowserWindow({
        frame: false,
        transparent: true,
        maximizable: false,
        parent: mainWindow,
        acceptFirstMouse: true,
    });

    createProtocol('app');
    updateWindow.loadURL('app://./index.html#update');
    updateWindow.show();
    updateWindow.webContents.on('did-finish-load', () => {
        updateWindow.webContents.send('updateInfo', {
            version: info.releaseName,
            notes: info.releaseNotes,
        });
    });
});

ipcMain.on('openMainWindow', () => {
    mainWindow = createMainWindow();
    updateWindow.close();
    updateWindow = null;
});

autoUpdater.on('update-not-available', info => {
    log.info(`Update not available: ${JSON.stringify(info)}`);
    updateWindow = null;

    mainWindow = createMainWindow();
});

autoUpdater.on('error', (ev, err) => {
    log.info(`Error in auto-updater: ${err}`);
});

autoUpdater.on('download-progress', progress => {
    updateWindow.webContents.send('updateDownloadProgress', progress.percent);
});

autoUpdater.on('update-downloaded', (ev, info) => {
    log.info(`Update downloaded successfully. ${JSON.stringify(info)}`);
    updateWindow.webContents.send('updateDownloaded');
});

ipcMain.on('downloadUpdate', () => {
    autoUpdater.downloadUpdate();
});

ipcMain.on('installUpdate', () => {
    autoUpdater.quitAndInstall(true, true);
});
