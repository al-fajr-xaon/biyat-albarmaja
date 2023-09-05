import * as frame from "./frame";
import * as electron_remote from "@electron/remote";

const self_frame = new frame.Frame({
    pre_existing_window: electron_remote.getCurrentWindow()
});

self_frame.title = "Integrated Development Environment";
self_frame.size = [1700, 800];
self_frame.center_to_display();

self_frame.dev_tools_open = true;
self_frame.dom_engine.console.warn("Running program in developer mode");
self_frame.dev_tools_open = true;

self_frame.dom_engine.clear();

self_frame.show = true;