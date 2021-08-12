const { app, BrowserWindow } = require('electron');
const { join } = require('path');

// https://github.com/electron/electron/issues/9920#issuecomment-575839738

// const isDev = !app.isPackaged;
const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.CLIENT_PORT;

let win = null;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1140,
    minHeight: 700,
    width: 1840,
    height: 900,
    titleBarStyle: 'hidden',
    // webPreferences: {
    //   preload: join(__dirname, 'preload.js'),
    // },
  });

  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL(`http://localhost:${PORT}`);
  } else {
    win.loadFile(`file://${join('../', 'build', 'index.html')}`);
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

// ipcMain.on('toMain', (_event, args) => {
//   console.log(args);

//   win!.webContents.send('fromMain', 'hello from main thread!!!');
// });
