"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const __1 = require("..");
function App({ children }) {
    return (React.createElement(__1.SlotContainer, null,
        React.createElement("div", { id: "top-level" },
            React.createElement("div", { className: "dashboard__top-bar" },
                React.createElement(__1.Slot, { name: "TopBar" })),
            React.createElement("div", { className: "dashboard__content" },
                React.createElement(__1.Slot, { name: "Content" }))),
        children));
}
function Counter() {
    const [count, setCount] = React.useState(0);
    return (React.createElement("div", { className: "counter" },
        React.createElement("div", null, count),
        React.createElement("button", { onClick: () => setCount(count => count + 1) }, "Increment")));
}
ReactDOM.render(React.createElement(App, null,
    React.createElement(__1.SlotContainer, null,
        React.createElement(__1.Slot, { name: "box" }),
        React.createElement(__1.SlotContent, { name: "Content" },
            "Test App",
            React.createElement(__1.SlotContent, { name: "TopBar" }, "Top Bar 3"),
            React.createElement(__1.SlotContent, { name: "TopBar" },
                "Top Bar 4 (overrides 3)",
                React.createElement(Counter, null))))), document.getElementById('root'));
