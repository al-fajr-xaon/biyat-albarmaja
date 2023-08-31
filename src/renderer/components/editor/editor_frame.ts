export interface EditorFrameException {
    name: string;
    message?: string;
    start: { x: number, y: number },
    end: { x: number, y: number }
}

export interface EditorFrame {
    str_value: string;
}