# hof-util-react

Allows a hof app to use react components in templates

## Usage

Given a React component as follows:

```jsx
const React = require('react');

class HelloWorld extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

module.exports = HelloWorld;
```

In your app, you first need to add the components:

```js
const hof = require('hof');
const react = require('hof-util-react');

const HelloWorld = require('./components/hello-world');

const app = hof(settings);

app.use(react(HelloWorld));
```

This will then create a template mixin that will render your react component into a page:

```
{{#HelloWorld}}{{/HelloWorld}}
```

The values from the template render context will be passed into your component as props.

## Arguments

If an argument is passed to the template mixin then this is given to the component as a prop of `argument`.

```jsx
const React = require('react');

class HelloWorld extends React.Component {
  render() {
    const greeting = this.props.argument;
    return <h1>{greeting} World!</h1>;
  }
}

module.exports = HelloWorld;
```

```
{{#HelloWorld}}Howdy{{/HelloWorld}}
```

## Options

By default the name of your template mixin will match the name of your component.

If your component has no name (i.e. is an anonymous function) or you want to override the name, then you can pass a custom name when mounting the component.

```js
app.use(react('hello-world', HelloWorld));
```

The template mixin will then be named `hello-world`:

```
{{#hello-world}}Howdy{{/hello-world}}
```

## Compiling JSX

By default `hof-util-react` will expect JSX files to be precompiled. You can have these compiled dynamically on require by registering a babel compiler. Simply run the following function anywhere in your app:

```js
const react = require('hof-util-react');
react.register();
```
