import * as electron_remote from "@electron/remote";

interface Settings {
    modal: boolean;
}

const settings_default: Settings = {
    modal: false,
};

export class Frame {
    private source_frame: Electron.CrossProcessExports.BrowserWindow;
    private settings: Settings;
    
    public constructor(settings: Settings = settings_default) {
        this.settings = {...settings_default, ...settings};
        this.source_frame = new electron_remote.BrowserWindow({
            parent: settings.modal ? electron_remote.getCurrentWindow() : undefined,
            modal: settings.modal,
        });
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
}