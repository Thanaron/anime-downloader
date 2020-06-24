import electron, { Menu } from 'electron';
import path from 'path';
import url from 'url';
import isDev from 'electron-is-dev';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow: any;

app.allowRendererProcessReuse = true;

function createWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 1350,
        minHeight: 500,
        height: 680,
        frame: false,
        titleBarStyle: 'hidden',
        title: 'HorribleSubs Downloader',
        webPreferences: { nodeIntegration: true },
    });

    const loadUrl = isDev
        ? 'http://localhost:3000'
        : url.format({
              pathname: path.join(__dirname, '../renderer-build/index.html'),
              protocol: 'file:',
              slashes: true,
          });

    mainWindow.loadURL(loadUrl);
    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.show();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
