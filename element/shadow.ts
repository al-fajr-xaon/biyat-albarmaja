import * as element from "../element";
import * as electron from "electron";
import * as electron_remote from "@electron/remote";
import * as frame from "../frame";

export function call_electron_custom_api(win_frame: frame.Frame, channel: string, data: any) {
    electron_remote.ipcMain.emit("trigger-renderer-ipc", {
        channel,
        window_id: win_frame.browser_window.id,
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

    {
        electron.ipcRenderer.on("console:log", (event: any, data: any) => {
            console.log(...data);
        });

        electron.ipcRenderer.on("console:warn", (event: any, data: any) => {
            console.warn(...data);
        });

        electron.ipcRenderer.on("console:error", (event: any, data: any) => {
            console.error(...data);
        });
    }
}

export class Console {
    private win_frame: frame.Frame;

    public constructor(win_frame: frame.Frame) {
        this.win_frame = win_frame;
    }

    public log(...args: any[]) {
        call_electron_custom_api(this.win_frame, "console:log", args);
    }

    public warn(...args: any[]) {
        call_electron_custom_api(this.win_frame, "console:warn", args);
    }

    public error(...args: any[]) {
        call_electron_custom_api(this.win_frame, "console:error", args);
    }
}

export class Shadow {
    private win_frame: frame.Frame;
    private element_rt: element.Element;
    private console_rt: Console;

    public constructor(win_frame: frame.Frame, element: element.Element) {
        this.win_frame = win_frame;
        this.element_rt = element;
        this.console_rt = new Console(win_frame);
    }

    public get console() {
        return this.console_rt;
    }

    public get element() {
        return this.element_rt;
    }

    public get browser_window() {
        return this.win_frame.browser_window;
    }

    public clear() {
        call_electron_custom_api(this.win_frame, "clear", {});
    }

    public install() {
        call_electron_custom_api(this.win_frame, "install", {
            element: this.element
        });
    }
}