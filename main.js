const { app, BrowserWindow, globalShortcut } = require('electron');

let win;
let clickThrough = true;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    x: 20,
    y: 120,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 🔥 IMPORTANT : visible sur TOUS les workspaces
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  // 🔥 toujours au-dessus même en fullscreen
  win.setAlwaysOnTop(true, 'screen-saver');

  // click-through par défaut
  win.setIgnoreMouseEvents(clickThrough);

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  // F8 = toggle click-through
  globalShortcut.register('F8', () => {
    clickThrough = !clickThrough;
    win.setIgnoreMouseEvents(clickThrough);
  });
});

app.on('window-all-closed', () => app.quit());

