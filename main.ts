import * as frame from "./frame";
import * as element from "./element";
import * as electron_remote from "@electron/remote";

const self_frame = new frame.Frame({
    pre_existing_window: electron_remote.getCurrentWindow()
});

self_frame.show = true;

// We have access to the dom, we will control it via special APIs
const shell_window = self_frame.browser_window;
const dom_engine = new element.shadow.Shadow(shell_window, new element.Element());

dom_engine.clear();