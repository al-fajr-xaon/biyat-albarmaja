const events = {
    "win_mouse_down": []
}

export function add_listener(event, callback) {
    events[event].push(callback);
}

export function remove_listener(event, callback) {
    events[event].splice(events[event].indexOf(callback), 1);
}

window.addEventListener("mousedown", (e) => {
    events["win_mouse_down"].forEach((callback) => {
        callback(e);
    });
});