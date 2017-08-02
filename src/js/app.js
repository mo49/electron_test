const {ipcRenderer} = require('electron');
const webview = document.querySelector('webview');

// dom-readyはあらかじめ登録されているイベント
webview.addEventListener('dom-ready', () => {
  ipcRenderer.on('machine-id', (event, machineId) => {
    webview.executeJavaScript(`window.onApplicationReady && window.onApplicationReady("${machineId}");`)
    console.log(machineId);
  })
  ipcRenderer.send('webview-ready'); // ipcMain.on('webview-ready')で受ける
})
