import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
} from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: 'New Playlist',
            accelerator: 'Ctrl+N',
            click: () => {
              console.log('[MENU] New Playlist hit');
            },
          },
          {
            label: 'New Playlist Folder',
            accelerator: 'Ctrl+Shift+N',
            click: () => {
              console.log('[MENU] New Playlist Folder hit');
            },
          },
          {
            label: 'Private Session',
            click: () => {
              console.log('[MENU] Private Session hit');
            },
          },
          {
            label: 'Offline Mode',
            click: () => {
              console.log('[MENU] Offline Mode hit');
            },
          },
          {
            label: 'Log Out',
            accelerator: 'Ctrl+Shift+W',
            click: () => {
              console.log('[MENU] Log Out hit');
            },
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+Shift+Q',
            visible: false,
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Ctrl+Z',
            click: () => {
              console.log('[MENU] Undo hit');
            },
          },
          {
            label: 'Redo',
            accelerator: 'Ctrl+Y',
            click: () => {
              console.log('[MENU] Redo hit');
            },
          },
          {
            label: 'Cut',
            accelerator: 'Ctrl+X',
            click: () => {
              console.log('[MENU] Cut hit');
            },
          },
          {
            label: 'Copy',
            accelerator: 'Ctrl+C',
            click: () => {
              console.log('[MENU] Copy hit');
            },
          },
          {
            label: 'Paste',
            accelerator: 'Ctrl+V',
            click: () => {
              console.log('[MENU] Paste hit');
            },
          },
          {
            label: 'Delete',
            accelerator: 'Delete',
            click: () => {
              console.log('[MENU] Delete hit');
            },
          },
          {
            label: 'Select All',
            accelerator: 'Ctrl+A',
            click: () => {
              console.log('[MENU] Select All hit');
            },
          },
          {
            label: 'Search',
            accelerator: 'Ctrl+F',
            click: () => {
              console.log('[MENU] Search hit');
            },
          },
          {
            label: 'Filter',
            accelerator: 'Ctrl+H',
            click: () => {
              console.log('[MENU] Filter hit');
            },
          },
          {
            label: 'Preferences',
            accelerator: 'Ctrl+P',
            click: () => {
              console.log('[MENU] Preferences hit');
            },
          },
        ],
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: 'Friend Activity',
                  click: () => {
                    console.log('[MENU] Friend Activity hit');
                  },
                },
              ],
      },
      {
        label: 'Playback',
        submenu: [
          {
            label: 'Play',
            accelerator: 'Space',
            click: () => {
              console.log('[MENU] Play button hit');
            },
          },
          {
            label: 'Next',
            accelerator: 'Ctrl+Right',
            click: () => {
              console.log('[MENU] Next button hit');
            },
          },
          {
            label: 'Previous',
            accelerator: 'Ctrl+Left',
            click: () => {
              console.log('[MENU] Previous button hit');
            },
          },
          {
            label: 'Seek Forward',
            accelerator: 'Shift+Right',
            click: () => {
              console.log('[MENU] Seek Forward button hit');
            },
          },
          {
            label: 'Seek Backward',
            accelerator: 'Shift+Left',
            click: () => {
              console.log('[MENU] Seek Backward button hit');
            },
          },
          {
            label: 'Shuffle',
            accelerator: 'Ctrl+S',
            click: () => {
              console.log('[MENU] Shuffle button hit');
            },
          },
          {
            label: 'Repeat',
            accelerator: 'Ctrl+R',
            click: () => {
              console.log('[MENU] Repeat button hit');
            },
          },
          {
            label: 'Volume Up',
            accelerator: 'Ctrl+Up',
            click: () => {
              console.log('[MENU] Volume Up button hit');
            },
          },
          {
            label: 'Volume Down',
            accelerator: 'Ctrl+Down',
            click: () => {
              console.log('[MENU] Volume Down button hit');
            },
          },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Spotify Help',
            click() {
              shell.openExternal('https://support.spotify.com/us');
            },
          },
          {
            label: 'Spotify Community',
            click() {
              shell.openExternal('https://community.spotify.com/');
            },
          },
          {
            label: 'Your Account',
            click() {
              shell.openExternal('https://www.spotify.com/us/account/overview');
            },
          },
          {
            label: 'About',
            click() {
              // TODO(david): add popup window here
              shell.openExternal('https://newsroom.spotify.com/company-info');
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}
