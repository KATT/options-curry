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
