const { app, BrowserWindow, ipcMain } = require('electron');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { encryptFile, decryptFile } = require('./src/encryption/aes256.js');
console.log('Resolved path to aes256.js:', __dirname);

// ipcMain.handle('encrypt-file', async (event, filePath, password) => {
//   try {
//     await encryptFile(filePath, password);
//     event.sender.send('encryption-success');
//   } catch (error) {
//     event.sender.send('encryption-error', error.message);
//   }
// });

// ipcMain.handle('decrypt-file', async (event, filePath, password) => {
//   try {
//     await decryptFile(filePath, password);
//     event.sender.send('decryption-success');
//   } catch (error) {
//     event.sender.send('decryption-error', error.message);
//   }
// });

// Window creation function
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('src/ui/index.html');
}

// App setup
app.whenReady().then(() => {
  createWindow();
});

// IPC handlers for encryption and decryption
ipcMain.handle('encrypt-file', async (event, filePath, password) => {
  try {
    await encryptFile(filePath, password);
    event.sender.send('encryption-success');
  } catch (error) {
    event.sender.send('encryption-error', error.message);
  }
});

ipcMain.handle('decrypt-file', async (event, filePath, password) => {
  try {
    await decryptFile(filePath, password);
    event.sender.send('decryption-success');
  } catch (error) {
    event.sender.send('decryption-error', error.message);
  }
});
