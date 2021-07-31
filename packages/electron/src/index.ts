import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';

require('dotenv').config();
// import actions from "./actions";

// https://github.com/electron/electron/issues/9920#issuecomment-575839738

// const isDev = !app.isPackaged;
const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.SNOWPACK_PORT;

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1140,
    minHeight: 700,
    width: 1840,
    height: 900,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  win.webContents.openDevTools();

  if (isDev) {
    win.loadURL(`http://localhost:${PORT}`);
  } else {
    win.loadFile(`file://${join('../../', 'client', 'index.html')}`);
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

try {
  require('electron-reloader')(module, {
    debug: true,
    watchRenderer: true,
  });
} catch (_) {
  console.log('Error');
}

// Object.entries(actions).forEach(([name, fn]) => {
//   console.log(`Attaching ${name}`);
//   fn(ipcMain);
// });

ipcMain.on('toMain', (_event, args) => {
  console.log(args);

  win!.webContents.send('fromMain', 'hello from main thread!!!');
});
