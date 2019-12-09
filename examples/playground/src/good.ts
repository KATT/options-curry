import { withDefaults } from 'options-curry';

interface Options {
  foo: string;
  bar: string;
}

// Create function with an options object
function fn({ foo, bar }: Options) {
  return { foo, bar };
}

// Compose new function where options are pre-set
const fnWithDefaults = withDefaults(fn, {
  foo: 'foo',
});

// `foo`-key is now optional in `fnWithDefaults`
console.log(fnWithDefaults({ bar: 'bar' })); // ➡️ { foo: 'foo', bar: 'bar' }
console.log(fnWithDefaults({ bar: 'bar', foo: 'x' })); // ➡️ ️{ foo: 'x', bar: 'bar' }

// We can compose a new function from our function with defaults
const composedFn = withDefaults(fnWithDefaults, { bar: 'bar' });
console.log(composedFn({})); // ➡️ `{ foo: 'foo', bar: 'bar' }`
