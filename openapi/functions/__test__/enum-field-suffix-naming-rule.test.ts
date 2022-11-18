import {describe, expect} from '@jest/globals';
import enumSuffixNamingRule from '../enum-field-suffix-naming-rule';

describe('EnumSuffixNamingRule linter test', function () {
    it('should be pass lint when suffix is correct ', function () {
        const actual = enumSuffixNamingRule(sampleDto)
        expect(actual?.length).toBe(0)
    });
    it('should be throw error when properties has illegal Enum suffix', function () {
        const actual = enumSuffixNamingRule(illegalEnumProps)
        expect(actual?.length).toBe(1)
        expect(actual?.[0].message).toContain("Enum is required suffix")
    });

    it('should be throw error when allOf properties has illegal Enum suffix', function () {
        const actual = enumSuffixNamingRule(illegalAllOfEnum)
        expect(actual?.length).toBe(1)
        expect(actual?.[0].message).toContain("Enum is required suffix")
    });

    it('should be throw error when array type properties has illegal Enum suffix', function () {
        const actual = enumSuffixNamingRule(illegalArrayEnum)
        expect(actual?.length).toBe(1)
        expect(actual?.[0].message).toContain("Enum is required suffix")
    });
});


const illegalEnumProps = {
    type: 'string',
    title: 'illegalEnumProps',
    properties: {
        statusCd: {
            type: 'string',
            title: 'UserClassCode',
            enum: [],
        },
    },
};

const sampleDto = {
    title: 'sampleDto',
    type: 'object',
    properties: {
        userId: {},
        emailAddress: {},
        statusCode: {
            type: 'string',
            title: 'UserStatusCode',
            enum: [],
            example: 'ACTIVE'
        },
        sampleCodes: {
            type: 'array',
            items: {
                title: 'ArrayEnumTitle',
                type: 'string',
                enum: [],
            }
        },
        classCode: {
            nullable: true,
            allOf: [
                {
                    type: 'string',
                    title: 'ClassCode',
                    enum: [],
                    example: 'REGULAR',
                }
            ],
        },
    },
    required: []
}


const illegalAllOfEnum = {
    type: 'string',
    title: 'illegalEnumProps',
    properties: {
        IncomeCd: {
            nullable: true,
            allOf: [{
                type: 'string',
                title: 'IncomeCode',
                enum: [],
            }],
        },
    }
};
const illegalArrayEnum = {
    type: 'string',
    title: 'illegalArrayEnumProps',
    properties: {
        IncomeCd: {
            type: 'array',
            items: {
                title: 'ArrayEnumTitle',
                type: 'string',
                enum: [],
            }
        },
    }
};
