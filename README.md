# TypeScript Options-object "Currying"

Curry a function defaults that only accept 1 options object.

## How to use

```typescript
import { withDefaults } from '../src/index';

// Create function with an options object
function myFunction({ foo, bar }: { foo: string; bar: string }) {
  return { foo, bar };
}

// Compose new function where options are pre-set
const myFunctionWithDefaults = withDefaults(myFunction, {
  foo: 'foo',
});

// `foo`-key is now optional in `myFunctionWithDefaults`
console.log(myFunctionWithDefaults({ bar: 'bar' })); // logs `{ foo: 'foo', bar: 'bar' }`
console.log(myFunctionWithDefaults({ bar: 'bar', foo: 'x' })); // logs `{ foo: 'x', bar: 'bar' }`

// ReturnType is typed
const ret = myFunctionWithDefaults({ bar: 'x' });
console.log(ret.nope); // ❌ Error: "Property 'nope' does not exist on type '{ foo: string; bar: string; }"

myFunctionWithDefaults({
  foo: 'x', // ❌ Error: "Property 'bar' is missing in type '{ foo: string; }' but required in [...]"
});

// We can compose a new function from our function with defaults
const composedFn = withDefaults(myFunctionWithDefaults, { bar: 'bar' });
console.log(composedFn({})); // logs `{ foo: 'foo', bar: 'bar' }`
```

## Local Development

_(This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).)_

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
