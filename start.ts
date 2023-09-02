import electron from "electron";
import path from "path";

const app = electron.app;

app.once("ready", () => {
    const main_window = new electron.BrowserWindow({
        width: 1200,
        height: 900,
        frame: false,
        autoHideMenuBar: true,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false
        }
    });

    main_window.loadFile(path.join(__dirname, "../main.html")).then(() => {
        console.log("Main window loaded successfully");
    }).catch((e) => {
        console.error("Failed to load main window", e);
        process.exit(1);
    });

    main_window.once("ready-to-show", () => {
        main_window.show();
    });
});