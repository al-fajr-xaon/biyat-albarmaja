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
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false
        }
    });

    enable(main_window.webContents); 

    main_window.loadFile(path.join(__dirname, "../main.html")).then(() => {
        console.log("Main window loaded successfully");
    }).catch((e) => {
        console.error("Failed to load main window", e);
        process.exit(1);
    });
});