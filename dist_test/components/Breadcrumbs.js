"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Breadcrumbs;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var Link_1 = __importDefault(require("./Link"));
var react_1 = require("motion/react");
function Breadcrumbs(_a) {
    var items = _a.items;
    return ((0, jsx_runtime_1.jsxs)(react_1.motion.nav, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "flex items-center space-x-2 text-[10px] sm:text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest", children: [(0, jsx_runtime_1.jsxs)(Link_1.default, { to: "/", className: "hover:text-[var(--color-safety)] transition-colors flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Home, { className: "w-3 h-3 sm:w-4 sm:h-4 mr-1.5" }), "Domov"] }), items.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "w-3 h-3 sm:w-4 sm:h-4 text-gray-600" }), item.href ? ((0, jsx_runtime_1.jsx)(Link_1.default, { to: item.href, className: "hover:text-[var(--color-safety)] transition-colors", children: item.name })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-white", children: item.name }))] }, index)); })] }));
}
