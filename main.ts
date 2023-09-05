import * as frame from "./frame";
import * as element from "./element";
import * as electron_remote from "@electron/remote";

const self_frame = new frame.Frame({
    pre_existing_window: electron_remote.getCurrentWindow()
});

self_frame.show = true;

const this_frame = new frame.Frame();
this_frame.show = true;

const my_element = new element.Element();
const root = document.createElement("div");

document.body.appendChild(root);

setInterval(() => {
    element.shadow.clear(root);
    element.shadow.install(my_element, root);
}, 1000);