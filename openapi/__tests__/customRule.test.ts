import {Document, Spectral} from "@stoplight/spectral-core";
import {Yaml} from "@stoplight/spectral-parsers";
// @ts-ignore
import {bundleAndLoadRuleset} from '@stoplight/spectral-ruleset-bundler/with-loader';
import * as path from "node:path";
import * as fs from "node:fs";
import {fetch} from "@stoplight/spectral-runtime";
import {expect} from "@jest/globals";

describe('my custom ruleset test', function () {
    const __dirname = path.dirname(".");
    const myDocument = new Document(
        fs.readFileSync(path.join(__dirname, "./__tests__/schemas/openapi.test.yaml"), "utf-8").trim(),
        Yaml,
        "openapi.yaml",
    );
    it('#object-require-title, If object has not title property then return error message.', async function () {
        // given
        const spectral = new Spectral();
        const myRuleset = await bundleAndLoadRuleset(path.resolve(__dirname, '.spectral.yaml'), {fs, fetch});

        // when
        spectral.setRuleset({
            rules: {
                "object-require-title": myRuleset.rules['object-require-title'].definition,
            },
        });
        const results = await spectral.run(myDocument);

        // then
        expect(results.length).toBe(1);
        expect(results[0].message).toContain("must be defined");
    });

    it('#enum-required-suffix, The name of NotInvalidFiledName.yaml in schemas has not suffix.', async function () {
        // given
        const testTarget = "SchoolEnumDef";
        const spectral = new Spectral();
        const myRuleset = await bundleAndLoadRuleset(path.resolve(__dirname, '.spectral.yaml'), {fs, fetch});

        // when
        spectral.setRuleset({
            rules: {
                "enum-required-suffix": myRuleset.rules['enum-required-suffix'].definition,
            },
        });
        const results = await spectral.run(myDocument);

        // then
        expect(results.length).toBe(1);
        expect(results[0].message).toContain("Enum is required suffix");
        expect(results[0].message).toContain(testTarget);
    });

    it('#enum-field-suffix-rule, The name of enum filed in object must have suffix.', async function () {
        // given
        const testTarget = "schoolCodeFiled";
        const testTarget_array = "schoolCodesArray";
        const spectral = new Spectral();
        const myRuleset = await bundleAndLoadRuleset(path.resolve(__dirname, '.spectral.yaml'), {fs, fetch});

        // when
        spectral.setRuleset({
            rules: {
                "enum-field-suffix-rule": myRuleset.rules['enum-field-suffix-rule'].definition,
            },
        });
        const results = await spectral.run(myDocument);

        // then
        expect(results.length).toBe(2);
        results.forEach((result) => {
            expect(result.message).toContain("Enum is required suffix");
        });
        expect(results[0].message).toContain(testTarget_array);
        expect(results[1].message).toContain(testTarget);
    });
});
