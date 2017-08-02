module.exports = [
  {
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Cmd+Q',
        click() {
          app.quit();
        }
      }
    ]
  }, {
    label: 'Edit',
    submenu: [
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  }
];
