import * as element from "../element";

let c = 0;

export function install(element: element.Element, root: HTMLElement) {
    const shadow_element = document.createElement("div");

    shadow_element.innerText = `count: ${c}`;

    root.appendChild(shadow_element);

    c++;
    return shadow_element;
}

export function clear(root: HTMLElement) {
    root.innerHTML = "";
}