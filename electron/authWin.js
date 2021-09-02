const { BrowserWindow } = require('electron');
const { join } = require('path');

let win = null;

const filter = {
  urls: ['http://localhost/authorize*'],
};

function destroyAuthWindow() {
  if (!win) return;
  win.close();
  win = null;
}

function createAuthWindow(mainWindow, url) {
  destroyAuthWindow();

  win = new BrowserWindow({
    minWidth: 720,
    minHeight: 500,
    width: 960,
    height: 720,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  win.loadURL(url);

  const {
    session: { webRequest },
  } = win.webContents;

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    await mainWindow.webContents.send('serviceAuthorization', url);
    await destroyAuthWindow();
  });

  win.on('closed', () => {
    win = null;
  });
}

module.exports = {
  destroyAuthWindow,
  createAuthWindow,
};
