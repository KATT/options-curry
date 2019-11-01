# TypeScript Options-object "Currying" <!-- omit in toc -->

Curry a function's default options.

Since working with TypeScript I've moved to mostly having functions that only accepts 1 options argument as then the args get named, order of args doesn't matter, and you can add new options without breaking the API.

Sometimes it's nice to compose a new function with default values set. This lib does that.

- [How to use](#how-to-use)
  - [Examples](#examples)
    - [Happy path](#happy-path)
    - [Type safety showcase](#type-safety-showcase)
- [Local Development](#local-development)
  - [`yarn start`](#yarn-start)
  - [`yarn build`](#yarn-build)
  - [`yarn test`](#yarn-test)

## How to use

```sh
npm i options-curry --save
```

```sh
yarn add options-curry
```

### Examples

#### Happy path

```typescript
import { withDefaults } from 'options-curry';

// Create function with an options object
function myFunction({ foo, bar }: { foo: string; bar: string }) {
  return { foo, bar };
}

// Compose new function where options are pre-set
const myFunctionWithDefaults = withDefaults(myFunction, {
  foo: 'foo',
});

// `foo`-key is now optional in `myFunctionWithDefaults`
console.log(myFunctionWithDefaults({ bar: 'bar' })); // ➡️ { foo: 'foo', bar: 'bar' }
console.log(myFunctionWithDefaults({ bar: 'bar', foo: 'x' })); // ➡️ ️{ foo: 'x', bar: 'bar' }

// We can compose a new function from our function with defaults
const composedFn = withDefaults(myFunctionWithDefaults, { bar: 'bar' });
console.log(composedFn({})); // ➡️ `{ foo: 'foo', bar: 'bar' }`
```

#### Type safety showcase

```typescript
import { withDefaults } from 'options-curry';

// Create function with an options object
function myFunction({ foo, bar }: { foo: string; bar: string }) {
  return { foo, bar };
}

// Compose new function where options are pre-set
const myFunctionWithDefaults = withDefaults(myFunction, {
  foo: 'foo',
});

// Input arguments are typed
myFunctionWithDefaults({
  bar: 1, // ❌ Error "Type 'number' is not assignable to type 'string'"
});

// ReturnType is typed
const ret = myFunctionWithDefaults({ bar: 'x' });
console.log(ret.nope); // ❌ Error: "Property 'nope' does not exist on type '{ foo: string; bar: string; }"
```

## Local Development

_(This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).)_

Below is a list of commands you will probably find useful.

### `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

### `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
