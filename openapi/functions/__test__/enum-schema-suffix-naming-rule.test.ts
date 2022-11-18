import {describe, expect} from '@jest/globals';
import enumSchemaSuffixNamingRule from "../enum-schema-suffix-naming-rule";

describe('#enum-schema-suffix-naming-rule test', function () {
    it('should be false, when enum schema Name has correct suffix ', function () {
        const actual = enumSchemaSuffixNamingRule(sampleDto)
        expect(actual?.length).toBe(0)
    });
    it('should be true, when enum schema Name has not correct suffix ', function () {
        const actual = enumSchemaSuffixNamingRule(sampleDtoWithWrongSuffix)
        expect(actual?.length).toBe(1)
    });
});

const sampleDto = {
    SampleCode: {
        title: 'SampleCode',
        type: 'string',
        enum: [],
        example: ''
    },
}
const sampleDtoWithWrongSuffix = {
    SampleWrong: {
        title: 'SampleWrongCode',
        type: 'string',
        enum: [],
    },
}
