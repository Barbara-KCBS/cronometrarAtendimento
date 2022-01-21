const { app, BrowserWindow } = require('electron')
const path = require('path')
const $ = require('jQuery');

function createWindow () {
    const win = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 300,
        height: 250,
        title: 'ArtFlex 1.0.0',
        alwaysOnTop: true,
        resizable: false,
        fullScreenable: false,
        maximizable: false,
        minimizable: false,
        icon: path.join(__dirname,'icon.ico'),
        show: false,
        webPreferences: {
          preload: path.join(__dirname, './preload.js'),
          nodeIntegration: true, 
          contextIsolation: false,
        }
    })
      win.loadFile('index.html')
      win.once('ready-to-show', () => {
        win.show()
      })
      // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
