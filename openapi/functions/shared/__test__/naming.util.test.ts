import {isNotMatchArraySuffixPattern, isNotMatchSuffixPattern} from "../naming.util";

describe('Naming Util test', function () {
    const ILLEGAL_SUFFIX = 'AnyKeyCodeCd'
    const enumValue = {
        type: 'string',
        title: 'enumValue',
        enum: [],
    };
    const notEnumValue = {
        type: 'string',
        title: 'notEnumValue',
    };

    describe('#isNotMatchSuffixPattern', function () {

        const WITH_ENUM_SUFFIX = 'AnyKeyNameCode'

        it('should be false, value has not Enum ', function () {
            const actual = isNotMatchSuffixPattern(WITH_ENUM_SUFFIX, notEnumValue);
            expect(actual).toBeFalsy()
        });
        it('should be false, suffix is correct', function () {
            const actual = isNotMatchSuffixPattern(WITH_ENUM_SUFFIX, enumValue);
            expect(actual).toBeFalsy()
        });
        it('should be true, suffix is not correct', function () {
            const actual = isNotMatchSuffixPattern(ILLEGAL_SUFFIX, enumValue);
            expect(actual).toBeTruthy()
        });
    });

    describe('#isNotMatchArraySuffixPattern', function () {

        const WITH_ARRAY_ENUM_SUFFIX = 'AnyKeyNameCodes'
        const arrayValue = {...enumValue, type: 'array'};

        it('should be true, array suffix is not correct', function () {
            const actual = isNotMatchArraySuffixPattern(ILLEGAL_SUFFIX, arrayValue);
            expect(actual).toBeTruthy()
        });
        it('should be false, array suffix is correct', function () {
            const actual = isNotMatchArraySuffixPattern(WITH_ARRAY_ENUM_SUFFIX, arrayValue);
            expect(actual).toBeFalsy()
        });
    });
});
