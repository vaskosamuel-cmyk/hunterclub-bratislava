const React = require('react');
const { renderToString } = require('react-dom/server');
const { MemoryRouter } = require('react-router-dom');
const { LanguageProvider } = require('./dist_test/contexts/LanguageContext.js');
const Action = require('./dist_test/pages/Action.js').default;

console.log(renderToString(React.createElement(MemoryRouter, null, React.createElement(LanguageProvider, null, React.createElement(Action)))));
