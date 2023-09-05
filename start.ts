import electron from "electron";
import path from "path";
import { initialize, enable } from "@electron/remote/main";

initialize();
const app = electron.app;

app.once("ready", () => {
    const main_window = new electron.BrowserWindow({
        width: 1200,
        height: 900,
        frame: true,
        autoHideMenuBar: true,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
            preload: path.join(__dirname, "./preload.js"),
        }
    });

    enable(main_window.webContents); 
    
    electron.ipcMain.on("trigger-renderer-ipc", (event: any) => {
        const {channel, window_id, data} = event;
        const window = electron.BrowserWindow.fromId(window_id);

        if (window) {
            window.webContents.send(channel, data);
        } else {
            console.warn("Voided response to renderer ipc because window was not found");
            console.warn(`channel: ${channel}, window_id: ${window_id}, data: ${data}`);
        }
    });

    main_window.loadFile(path.join(__dirname, "../main.html")).then(() => {
        console.log("Main window loaded successfully");
    }).catch((e) => {
        console.error("Failed to load main window", e);
        process.exit(1);
    });
});