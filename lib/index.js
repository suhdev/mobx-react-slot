"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_1 = require("mobx");
class SlotContextModel {
    constructor(parent) {
        this.slots = mobx_1.observable.object({}, {}, { deep: false });
        this.exists = {};
        this.parent = parent;
    }
    getView(name) {
        return this.slots[name] || (this.parent && this.parent.getView(name));
    }
    addSlot(name) {
        this.slots[name] = this.slots[name] || null;
    }
    setSlot(name, view) {
        if (this.exists[name]) {
            this.slots[name] = view;
            return;
        }
        if (this.parent) {
            this.parent.setSlot(name, view);
        }
    }
}
__decorate([
    mobx_1.action.bound
], SlotContextModel.prototype, "addSlot", null);
__decorate([
    mobx_1.action.bound
], SlotContextModel.prototype, "setSlot", null);
const SlotContext = React.createContext(null);
function useObserver(viewFn, deps = []) {
    const [view, setView] = React.useState(viewFn);
    const firstTimeRef = React.useRef();
    React.useEffect(() => {
        if (!firstTimeRef.current) {
            setView(viewFn);
            firstTimeRef.current = true;
        }
        const sub = mobx_1.reaction(viewFn, v => setView(v));
        return () => {
            sub();
            firstTimeRef.current = false;
        };
    }, deps);
    return view;
}
exports.useObserver = useObserver;
function SlotContainer({ children }) {
    const parentModel = React.useContext(SlotContext);
    const [model] = React.useState(() => new SlotContextModel(parentModel));
    return (React.createElement(SlotContext.Provider, { value: model }, children));
}
exports.SlotContainer = SlotContainer;
function Slot({ name }) {
    const context = React.useContext(SlotContext);
    context.exists[name] = true;
    return useObserver(() => context.getView(name) || null, [context]);
}
exports.Slot = Slot;
function SlotContent({ name, children }) {
    const context = React.useContext(SlotContext);
    React.useEffect(() => {
        context.setSlot(name, children);
    }, [children]);
    return null;
}
exports.SlotContent = SlotContent;
