const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const {machineId} = require('node-machine-id');

let mainWindow;

app.on('ready', () => {
  machineId().then(id => {
    createWindow();
    // createMenu();
    ipcMain.on('webview-ready', event => {
      // channel経由でレンダラープロセスに非同期に返信し、任意の引数を渡す
      // ipcMain.send()ではない点に注意
      event.sender.send('machine-id',id); // ipcRenderer.on('machine-id')で受ける
    })
  })
});

app.on('window-all-closed', () => {
  app.quit();
});

// MacだとDockがクリックされた時
app.on('activate', () => {
  if(mainWindow === null) {
    init();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({width:800,height:600});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file',
    slashes: true,
  }));

  mainWindow.on('closed', function() {
    mainWindow = null;
  })
}

function createMenu() {
  const menuTemplate = [
    {
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click() {
            app.quit();
          }
        },
        {
          role: 'separator'
        },
        {
          role: 'resetzoom'
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        }
      ]
    }, {
      label: 'Debug',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: (process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I'),
          click(item, focusWindow) {
            if (focusWindow) {
              focusWindow.webContents.toggleDevTools();
            }
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}
