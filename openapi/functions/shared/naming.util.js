import {ENUM_ARRAY_SUFFIX_RegExp, ENUM_SUFFIX_RegExp} from "./naming.constant";

/*
    enumのプロパティを持っていることでenumと判定する。
    その後、keyがサフィックスに合うかを判定する。
 */
export const isNotMatchSuffixPattern = (key, value) => {
    return !!value.enum && !key.match(ENUM_SUFFIX_RegExp);
}

export const isNotMatchArraySuffixPattern = (key, value) => {
    return !!value.enum && !key.match(ENUM_ARRAY_SUFFIX_RegExp);
}
