import {ENUM_ARRAY_SUFFIX, ENUM_SUFFIX} from "./shared/naming.constant";
import {isNotMatchArraySuffixPattern, isNotMatchSuffixPattern} from "./shared/naming.util";

// ================
//  schemaで定義されてるEnumの命名規則を確認
// ================
export default (input) => {
    // propertiesがないものはチェックの対象外、titleの有無はこのチェックの対象外
    if (!input.properties || !input.title) {
        return;
    }
    // error系は除外
    // TODO: Error定義が増えたらここの除外処理を拡張する。今試験的に作っているものでは不要なので、一旦コメントアウト
    // if (input.title === 'BadRequestErrorItem') {
    //     return
    // }
    const errors = [];
    const schemaNameArr = Object.keys(input.properties);
    schemaNameArr
        .filter(schemaName => isNotMatchSuffixPattern(schemaName, input.properties[schemaName]))
        .forEach(schemaName => {
            errors.push({message: `Enum is required suffix "${ENUM_SUFFIX}". Find in : "${input.title}", properties :"${schemaName}" `})
        });
    // allOf パターン allOf : [{enum: xxx}]
    // allOfに複数のスキーマがあるパターンは考慮していない
    schemaNameArr
        .filter(schemaName => !!input.properties[schemaName].allOf)
        .filter(schemaName => isNotMatchSuffixPattern(schemaName, input.properties[schemaName].allOf[0]))
        .forEach(schemaName => {
            errors.push({message: `Enum is required suffix "${ENUM_SUFFIX}". Find in : "${input.title}", properties :"${schemaName}" `})
        });

    // 配列指定の場合
    schemaNameArr
        .filter(schemaName => {
             return input.properties[schemaName].type === 'array'
        })
        .filter(schemaName => isNotMatchArraySuffixPattern(schemaName, input.properties[schemaName].items))
        .forEach(schemaName => {
            errors.push({message: `Enum is required suffix "${ENUM_ARRAY_SUFFIX}". Find in : "${input.title}", properties :"${schemaName}" `})
        });
    return errors;
};
