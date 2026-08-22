"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLanguage = exports.LanguageProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var translations_1 = require("../i18n/translations");
var LanguageContext = (0, react_1.createContext)(undefined);
var LanguageProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(function () {
        // 1. Check URL first for shareable links
        if (typeof window !== 'undefined') {
            var pathLang = window.location.pathname.split('/')[1];
            if (pathLang === 'sk' || pathLang === 'de' || pathLang === 'en' || pathLang === 'ru') {
                return pathLang;
            }
        }
        // 2. Default to Slovak for base URL
        return 'sk';
    }), language = _b[0], setLanguageState = _b[1];
    (0, react_1.useEffect)(function () {
        document.documentElement.lang = language;
    }, [language]);
    var setLanguage = function (lang) {
        setLanguageState(lang);
    };
    var t = function (key, options) {
        var keys = key.split('.');
        var value = translations_1.translations[language];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            }
            else {
                // Fallback to Slovak if translation is missing
                var fallbackValue = translations_1.translations['sk'];
                for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                    var fk = keys_2[_a];
                    if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
                        fallbackValue = fallbackValue[fk];
                    }
                    else {
                        return key; // Return key if not found in fallback either
                    }
                }
                return (options === null || options === void 0 ? void 0 : options.returnObjects) ? fallbackValue : fallbackValue;
            }
        }
        return (options === null || options === void 0 ? void 0 : options.returnObjects) ? value : value;
    };
    return ((0, jsx_runtime_1.jsx)(LanguageContext.Provider, { value: { language: language, setLanguage: setLanguage, t: t }, children: children }));
};
exports.LanguageProvider = LanguageProvider;
var useLanguage = function () {
    var context = (0, react_1.useContext)(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
exports.useLanguage = useLanguage;
