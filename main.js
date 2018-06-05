console.log('main process working');

const electron = require("electron");

const app = electron.app; 
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
let win;

function createWindow(){
    win = new BrowserWindow();

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
    
}

app.on('ready', function(){
    createWindow();
    const template = [
        {
            label:'Edit',
            submenu:[
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'demo',
            submenu:[
                {
                    label: 'submenu 1',
                    click: function(){
                        console.log('clicked submenu 1');
                    }
                },
                {
                    type:'separator'
                },
                {
                    label: 'submenu 2'
                }               
            ]
        },
        {
            label: 'help',
            click: function(){
                electron.shell.openExternal("http://electron.atom.io")
            }
        }
    ];

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
});

app.on('window-all-close', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});