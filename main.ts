import { BrowserWindow } from "@electron/remote";

const modal = new BrowserWindow({
    width: 400,
    height: 300,
});

// load google
modal.loadURL("https://google.com");