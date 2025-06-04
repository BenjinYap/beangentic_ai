const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  closeWindow: () => ipcRenderer.send('window:close'),

  test: () => {

  },

  sendPrompt: (prompt) => ipcRenderer.invoke('ai.sendPrompt', prompt),
})