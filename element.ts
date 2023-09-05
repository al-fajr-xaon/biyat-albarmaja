export * as shadow from "./element/shadow";

export abstract class Element {
    private children_rt: Element[] = [];
    private parent_rt: Element | undefined = undefined;

    public constructor(parent?: Element) {
        if (parent) {
            this.parent_rt = parent;
        }
    }

    public get children() {
        return this.children_rt;
    }

    public get parent() {
        return this.parent_rt;
    }
}