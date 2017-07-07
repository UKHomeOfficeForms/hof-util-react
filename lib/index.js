'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = (name, Component) => {

  if (!Component && typeof name === 'function') {
    Component = name;
    if (Component.name) {
      name = Component.name;
    } else {
      throw new Error('No component name specified');
    }
  }

  return (req, res, next) => {
    if (res.locals[name]) {
      req.log('warn', `hof-util-react: Overwriting existing local parameter: ${name}`);
    }

    res.locals[name] = () => {
      return function(arg) {
        return ReactDOMServer.renderToString(React.createElement(Component, Object.assign(this, { argument: arg })));
      };
    };
    next();
  };

};
