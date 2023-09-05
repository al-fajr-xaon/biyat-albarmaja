import * as electron_remote from "@electron/remote";
import * as path from "path";
import * as element from "./element";
import * as elements from "./elements";

interface Settings {
    modal?: boolean;
    pre_existing_window?: Electron.CrossProcessExports.BrowserWindow;
}

const settings_default: Settings = {
    modal: false,
    pre_existing_window: undefined,
};

export class Frame {
    private source_frame: Electron.CrossProcessExports.BrowserWindow;
    private settings: Settings;
    private dom_engine_rt: element.shadow.Shadow;
    
    public constructor(settings: Settings = settings_default) {
        this.settings = {...settings_default, ...settings};

        if (this.settings.pre_existing_window) {
            this.source_frame = this.settings.pre_existing_window;
        } else {
            this.source_frame = new electron_remote.BrowserWindow({
                parent: settings.modal ? electron_remote.getCurrentWindow() : undefined,
                modal: settings.modal,
                show: false,
                webPreferences: {
                    contextIsolation: false,
                    nodeIntegration: true,
                    webSecurity: false,
                    preload: path.join(__dirname, "./target/preload.js"),
                }
            });

            this.source_frame.loadURL("about:blank");
        }

        this.dom_engine_rt = new element.shadow.Shadow(this, new elements.container.Container());
    }

    public center_to_display() {
        this.source_frame.center();
    }

    public set show(show) {
        if (show) {
            this.source_frame.show();
        } else {
            this.source_frame.hide();
        }
    }

    public get show() {
        return this.source_frame.isVisible();
    }

    public get dom_engine() {
        return this.dom_engine_rt;
    }

    public get browser_window() {
        return this.source_frame;
    }

    public set dev_tools_open(open) {
        if (open) {
            this.source_frame.webContents.openDevTools();
        } else {
            this.source_frame.webContents.closeDevTools();
        }
    }

    public get dev_tools_open() {
        return this.source_frame.webContents.isDevToolsOpened();
    }

    public get size() {
        const size_electron = this.source_frame.getSize();
        return [size_electron[0], size_electron[1]];
    }

    public set size(size: [number, number]) {
        this.source_frame.setSize(size[0], size[1]);
    }

    public set position(position: [number, number]) {
        this.source_frame.setPosition(position[0], position[1]);
    }

    public get position() {
        const position_electron = this.source_frame.getPosition();
        return [position_electron[0], position_electron[1]];
    }

    public get title() {
        return this.source_frame.getTitle();
    }

    public set title(title: string) {
        this.source_frame.setTitle(title);
    }
}