const events = {
    "win_mouse_down": [],
    "win_key_press": [],
    "win_key_down": []
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

window.addEventListener("keypress", (e) => {
    events["win_key_press"].forEach((callback) => {
        callback(e);
    });
});

window.addEventListener("keydown", (e) => {
    events["win_key_down"].forEach((callback) => {
        callback(e);
    });
});