import { Button } from "./components/button.js";
import { ButtonBuilder } from "./components/button.js";

const button = new ButtonBuilder()
    .text("Hello World")
    .get();

customElements.define("button", Button);

document.body.appendChild(button);