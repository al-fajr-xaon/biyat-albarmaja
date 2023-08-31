export interface LexerToken<TypeEnum, CustomAttachment> {
    type: TypeEnum;
    str_value: string;
    smart?: CustomAttachment;
    
    start: number;
    end: number;

    line: number;
    column: number;
}