const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 400, // Adjust size as needed
    height: 500,
    x: width - 420, // Position: Top Right corner
    y: 20,
    frame: false, // No "X" or minimize buttons (Frameless)
    transparent: true, // Allows see-through background
    resizable: false,
    alwaysOnTop: false, // Set true if you want it over other windows
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // In development, load the localhost URL
  // In production, you would serve the static build
  mainWindow.loadURL('http://localhost:3000'); 
  
  // Optional: Remove menu bar
  mainWindow.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.path !== 'darwin') app.quit();
});