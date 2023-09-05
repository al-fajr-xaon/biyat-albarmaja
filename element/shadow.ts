import * as element from "../element";
import * as electron from "electron";
import * as electron_remote from "@electron/remote";

export function call_electron_custom_api(root: Electron.CrossProcessExports.BrowserWindow, channel: string, data: any) {
    electron_remote.ipcMain.emit("trigger-renderer-ipc", {
        channel,
        window_id: root.id,
        data
    });
}

export function implement_ipc_dom_controller() {
    electron.ipcRenderer.on("clear", () => {
        document.body.innerHTML = "";
    });

    electron.ipcRenderer.on("install", (event: any, data: any) => {
        console.log(event, data);
    });
}

export class Shadow {
    public root: Electron.CrossProcessExports.BrowserWindow;
    public element: element.Element;

    public constructor(root: Electron.CrossProcessExports.BrowserWindow, element: element.Element) {
        this.root = root;
        this.element = element;
    }

    public clear() {
        call_electron_custom_api(this.root, "clear", {});
    }

    public install() {
        call_electron_custom_api(this.root, "install", {
            element: this.element
        });
    }
}