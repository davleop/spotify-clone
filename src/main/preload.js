const { contextBridge, ipcRenderer } = require('electron');

const CHANNELS = ['ipc-example', 'logged-in'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = CHANNELS;
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = CHANNELS;
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    fullscreen() {
      ipcRenderer.send('fullscreen');
    },
    openPopup() {
      ipcRenderer.send('open-popup');
    },
    closePopup() {
      ipcRenderer.send('closed-popup');
    },
    isLoggedIn() {
      ipcRenderer.send('logged-in');
    },
    setCode(code) {
      ipcRenderer.send('set-code', code);
    },
  },
});
