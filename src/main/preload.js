const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example', 'login-spotify', 'popup'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example', 'login-spotify', 'popup'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    fullscreen() {
      ipcRenderer.send('fullscreen');
    },
    popup() {
      ipcRenderer.send('popup');
    },
    spotifyLogin() {
      ipcRenderer.send('login-spotify');
    },
    isLoggedIn() {
      ipcRenderer.send('logged-in');
    },
  },
});
