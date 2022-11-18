import { truthy } from "@stoplight/spectral-functions";
import { Document, Spectral } from "@stoplight/spectral-core";
import { Yaml } from "@stoplight/spectral-parsers";

// Note: ここは公式のサンプルから持ってきてちょっと加工してみただけ
describe('my custom ruleset test sample', function () {
    it('sample test case', function () {
        const inputSchema = `---
        responses:
          '200':
            description: ''`;
        const myDocument = new Document(inputSchema, Yaml);
        const spectral = new Spectral();
        spectral.setRuleset({
            rules: {
                "no-empty-description": {
                    given: "$..description",
                    message: "Description must not be empty",
                    then: {
                        function: truthy,
                    },
                },
            },
        });
        spectral.run(myDocument).then((results) => {
            expect(results.length).toBe(1);
            expect(results[0].message).toBe("Description must not be empty");
        });
    });
});
