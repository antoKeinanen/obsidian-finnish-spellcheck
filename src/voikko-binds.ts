// @ts-ignore ts(1259)
import Libvoikko from "./voikko/libvoikko-morpho.js";
import { Word, splitAndCleanString } from "./util.js";


export async function init() {
    try {
        const voikko = new Libvoikko();
        return voikko.init("fi-FI");
    }
    catch (err) {
        throw new Error(err);
    }

}

export function spellCheckText(v: any, text: string) {
    let words = splitAndCleanString(text);
    for (let word of words) {
        word.isCorrect = v.spell(word.substring);
    }
    return words;
}

export function getSuggestions(v: any, word: Word): String[] {
    return !word.isCorrect ? v.suggest(word.substring) : [];
}

export function checkGrammar(v: any, text: String) {
    return v.grammarErrors(text);
}
