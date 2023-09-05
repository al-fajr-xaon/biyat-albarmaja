import * as electron_remote from "@electron/remote";

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
    
    public constructor(settings: Settings = settings_default) {
        this.settings = {...settings_default, ...settings};

        if (this.settings.pre_existing_window) {
            this.source_frame = this.settings.pre_existing_window;
        } else {
            this.source_frame = new electron_remote.BrowserWindow({
                parent: settings.modal ? electron_remote.getCurrentWindow() : undefined,
                modal: settings.modal,
                show: false,
            });
        }
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

    public get root_element() {
        
    }
}