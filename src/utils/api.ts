// import { LineObj } from "@/store/media";
import { TokenResp } from "@/types/nlp";

import { r } from "@/utils/requests";

// export interface Media {
//     mid: number;
//     url: string;
//     transcript_url: string;
//     title: string;
//     cover_img: string;
//     des: string;
//     tag: string;
//     type: string;
//     transcript: Transcript;
// }

// export interface Transcript {
//     mid: number;
//     source_lang_code: string;
//     target_lang_code: string;
//     lines: LineObj[];
// }

// export const getMediaInfo = (mediaID: number): Promise<Media> => {
//     return r.get(`/api/media/${mediaID}`);
// }

export const getTokenize = (
    langCode: string,
    texts: string[],
): Promise<TokenResp>=> {
    return r.post("/nlp/tokenize", {
        "source_lang_code": langCode,
        "text": texts
    })
}