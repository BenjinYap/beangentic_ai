import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from "node:fs";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = JSON.parse(fs.readFileSync(path.join(__dirname, 'env'), {encoding: 'utf8'}));

const openai = new OpenAI({
  apiKey: env.openai_api_key,
});

// const response = await openai.responses.create({
//     model: "gpt-4.1-nano",
//     input: "Write a one-sentence bedtime story about a unicorn."
// });
//
// console.log(response);

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

ipcMain.handle('ai.sendPrompt', async (prompt) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
});