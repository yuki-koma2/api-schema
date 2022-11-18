import {ENUM_SUFFIX} from "./shared/naming.constant";
import {isNotMatchSuffixPattern} from "./shared/naming.util";

// ================
//  schemaで定義されてるEnumの命名規則を確認
// ================
export default (input) => {
    const errors = [];
    const schemaNameArr = Object.keys(input);
    schemaNameArr
        .filter(schemaName => isNotMatchSuffixPattern(schemaName, input[schemaName]))
        .forEach(schemaName => {
            errors.push({message: `Enum is required suffix "${ENUM_SUFFIX}". Find in openapi.yaml : "${schemaName}" `})
        })
    return errors;
}
