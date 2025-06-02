import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('dist/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.on('window:maximize', () => {
  win.maximize();
});

ipcMain.on('window:minimize', () => {
  win.minimize();
});

ipcMain.on('window:close', () => {
  win.close();
});