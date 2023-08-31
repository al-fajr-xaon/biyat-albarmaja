export abstract class SyntaxEngine<TypeEnum, CustomAttachment, ParserNode> {
    public constructor() {

    }

    public abstract lex(text: string): LexerToken<TypeEnum, CustomAttachment>[];
    public abstract parse(tokens: LexerToken<TypeEnum, CustomAttachment>[], hydrate_tokens: boolean): {
        parsed: ParserNode<TypeEnum, CustomAttachment>[],
        hydrated?: LexerToken<TypeEnum, CustomAttachment>[],
    };
}