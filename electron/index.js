const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');
const debug = require('debug');
const { createAuthWindow, destroyAuthWin } = require('./authWin');

// https://github.com/electron/electron/issues/9920#issuecomment-575839738

// const isDev = !app.isPackaged;
const isDev = process.env.NODE_ENV === 'dev';
const PORT = 3000;

let win = null;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1140,
    minHeight: 700,
    width: 1840,
    height: 900,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      enableRemoteModule: true,
    },
  });
  win.loadURL(
    isDev
      ? `http://localhost:${PORT}`
      : `file://${join(__dirname, '../dist/index.html')}`,
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('createAuthWindow', (ev, url) => createAuthWindow(win, url));
ipcMain.on('destroyAuthWindow', () => destroyAuthWindow());
