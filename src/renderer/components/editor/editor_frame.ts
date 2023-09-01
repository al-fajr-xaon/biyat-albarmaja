export interface EditorFrameException {
    name: string;
    message?: string;
    start: number;
    end: number;
}

export interface EditorFrame {
    str_value: string;
}