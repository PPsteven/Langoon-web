import { Resp } from "./resp";

export interface Token {
    text: string;
    // TODO: add more "AUX"  | "SCONJ" | "INTJ"| "SYM" | "X";} ;
    pos:  "PROPN" | "NOUN" | "VERB" | "ADJ" | "ADV" | "PART" | "NUM"| "PUNCT"| "CCONJ"; 
    whitespace: string;
}

export type Tokens = Token[][];

export type TokenResp = Resp<Tokens>;

export interface Sentence {
    id: number;
    text: string;
    translation: string;
    isSelected: boolean;
    start: number;
    end: number;
    tokens?: Token[];
}