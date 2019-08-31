"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _1 = require(".");
const react_1 = require("@testing-library/react");
describe('mobx-react-slot', () => {
    afterEach(react_1.cleanup);
    it('should be going well', () => __awaiter(this, void 0, void 0, function* () {
        const { getByTestId } = react_1.render(React.createElement(_1.SlotContainer, null,
            React.createElement(_1.Slot, { name: "box" }),
            React.createElement(_1.Slot, { name: "slate" }),
            React.createElement(_1.Slot, { name: "amx" }),
            React.createElement(_1.SlotContent, { name: "box" },
                React.createElement("div", { "data-testid": "box-test" }, "Suhail"),
                React.createElement(_1.SlotContainer, null,
                    React.createElement(_1.SlotContent, { name: "slate" },
                        React.createElement("div", { "data-testid": "isac" }, "British"),
                        React.createElement(_1.SlotContent, { name: "amx" },
                            React.createElement("div", { "data-testid": "wilko" }, "Indeedio")))),
                React.createElement("div", { "data-testid": "box-test2" }, "Suhail XYZ"))));
        expect(getByTestId('box-test').innerHTML).toEqual('Suhail');
        expect(getByTestId('isac').textContent).toContain('British');
        expect(getByTestId('wilko').textContent).toContain('Indeedio');
    }));
});
