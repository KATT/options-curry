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
