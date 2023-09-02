import { BrowserWindow, getCurrentWindow } from "@electron/remote";

const modal = new BrowserWindow({
    width: 400,
    height: 300,
    modal: true,
    parent: getCurrentWindow(),
});

// load google
modal.loadURL("https://google.com");