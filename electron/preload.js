const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('authApi', {
  onServiceAuth: func =>
    ipcRenderer.on('serviceAuthorization', (_, ...args) => func(...args)),

  createAuthWindow: url => ipcRenderer.send('createAuthWindow', url),
  destroyAuthWindow: () => ipcRenderer.send('destroyAuthWindow'),
});
