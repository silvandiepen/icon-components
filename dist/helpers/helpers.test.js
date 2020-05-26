"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
test('Remove requested Tags', () => {
    // assert
    const input = `<svg><test id="test"><g><path fill="test"></path></g></test></svg>`;
    const output = `<test id="test"><path fill="test"></path></test>`;
    const tags = ['svg', 'g'];
    // Expect
    expect(helpers_1.removeTags(input, tags)).toStrictEqual(output);
});
test('Remove requested Tags - async', () => __awaiter(void 0, void 0, void 0, function* () {
    // assert
    const input = `<svg><test id="test"><g><path fill="test"></path></g></test></svg>`;
    const output = `<test id="test"><path fill="test"></path></test>`;
    const tags = ['svg', 'g'];
    // Expect
    return helpers_1.asyncRemoveTags(input, tags).then((data) => {
        expect(data).toStrictEqual(output);
    });
}));
test('Remove requested Attributes', () => {
    // assert
    const input = `<svg><test id="test"><path fill="test"></path></test></svg>`;
    const output = `<svg><test><path></path></test></svg>`;
    const attributes = ['id', 'fill'];
    // Expect
    expect(helpers_1.removeAttrs(input, attributes)).toStrictEqual(output);
});
test('Remove requested Attributes - async', () => __awaiter(void 0, void 0, void 0, function* () {
    // assert
    const input = `<svg><test id="test"><path fill="test"></path></test></svg>`;
    const output = `<svg><test><path></path></test></svg>`;
    const attributes = ['id', 'fill'];
    // Expect
    return helpers_1.asyncRemoveAttrs(input, attributes).then((data) => {
        expect(data).toStrictEqual(output);
    });
}));
test('Fix JSX', () => {
    // assert
    const input = `<svg xmlns:xlink><test id="test"><path xlink:href fill="test"></path></test></svg>`;
    const output = `<svg xmlnsXlink><test id="test"><path xlinkHref fill="test"></path></test></svg>`;
    // Expect
    expect(helpers_1.fixJsx(input)).toStrictEqual(output);
});
test('prefixName', () => {
    // assert
    const input = `Some name`;
    const output = `yeah-some-name`;
    const settings = {
        prefix: 'yeah'
    };
    // Expect
    expect(helpers_1.prefixedName(input, settings.prefix)).toStrictEqual(output);
});
test('prefixName - no prefix', () => {
    // assert
    const input = `Some name`;
    const output = `icon-some-name`;
    const settings = {
        prefix: null
    };
    // Expect
    expect(helpers_1.prefixedName(input, settings.prefix)).toStrictEqual(output);
});
test('prefixName - empty prefix', () => {
    // assert
    const input = `Some name`;
    const output = `some-name`;
    const settings = {
        prefix: ''
    };
    // Expect
    expect(helpers_1.prefixedName(input, settings.prefix)).toStrictEqual(output);
});
test('fileName', () => {
    // assert
    const input = `some/path/is/needed/Some name.test.template`;
    const output1 = `Some name.test`;
    const output2 = `iconSome name.test`;
    const settings = {
        prefix: 'icon'
    };
    // Expect
    expect(helpers_1.fileName(input)).toStrictEqual(output1);
    expect(helpers_1.fileName(input, settings)).toStrictEqual(output2);
});
test('svgOnly', () => {
    // assert
    const input1 = `<svg><thisis><a><test></test></a></thisis></svg>`;
    const output1 = `<svg><thisis><a><test></test></a></thisis></svg>`;
    const input2 = `<test></test><svg><thisis><a><test></test></a></thisis></svg>`;
    const output2 = `<svg><thisis><a><test></test></a></thisis></svg>`;
    // Expect
    expect(helpers_1.svgOnly(input1)).toStrictEqual(output1);
    expect(helpers_1.svgOnly(input2)).toStrictEqual(output2);
});
//# sourceMappingURL=helpers.test.js.map