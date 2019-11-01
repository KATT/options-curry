import { withDefaults } from 'options-curry';

// Create function with an options object
function fn({ foo, bar }: { foo: string; bar: string }) {
  return { foo, bar };
}

// Compose new function where options are pre-set
const fnWithDefaults = withDefaults(fn, {
  foo: 'foo',
});

// Input arguments are typed
fnWithDefaults({
  bar: 1, // ❌ Error "Type 'number' is not assignable to type 'string'"
});

// ReturnType is typed
const ret = fnWithDefaults({ bar: 'x' });
console.log(ret.nope); // ❌ Error: "Property 'nope' does not exist on type '{ foo: string; bar: string; }"
