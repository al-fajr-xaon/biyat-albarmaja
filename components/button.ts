export class ButtonBuilder {
    #text: string = "";

    public get() {
        return new Button({
            text: this.#text
        });
    }

    public text(value: string) {
        this.#text = value;
        return this;
    }
}

export class Button extends HTMLElement {
    public constructor(settings) {
        super();
        const shadow = this.attachShadow({ mode: "open" });
    }
}