'use strict';

import {
    app,
    protocol,
    BrowserWindow,
    ipcMain,
    globalShortcut,
} from 'electron';
import {
    createProtocol,
    installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import { autoUpdater } from 'electron-updater';

const isDevelopment = process.env.NODE_ENV !== 'production';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

unhandled({ logger: log.error, showDialog: true });

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = 'info';

log.info('App starting...');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: any;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
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

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        mainWindow.loadURL('app://./index.html');
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

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
    if (mainWindow === null) {
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

    globalShortcut.register('CommandOrControl+Shift+D', () => {
        mainWindow.webContents.openDevTools({ mode: 'bottom' });
    });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
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

// Auto updater

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});

autoUpdater.on('update-available', info => {
    log.info(`Update available: ${JSON.stringify(info)}`);

    mainWindow.webContents.send('updateAvailable', {
        version: info.releaseName,
        notes: info.releaseNotes,
    });
    autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', info => {
    log.info(`Update not available: ${JSON.stringify(info)}`);
});

autoUpdater.on('error', (ev, err) => {
    log.error(`Error in auto-updater: ${err}`);
});

autoUpdater.on('download-progress', progress => {
    mainWindow.webContents.send('updateDownloadProgress', progress.percent);
});

autoUpdater.on('update-downloaded', (ev, info) => {
    log.info(`Update downloaded successfully. ${JSON.stringify(info)}`);
    mainWindow.webContents.send('updateDownloaded');
});

ipcMain.on('installUpdate', () => {
    autoUpdater.quitAndInstall(true, true);
});
