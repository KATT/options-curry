import { withDefaults } from '../src';

function myFunction({foo, bar, zoo}: {
  foo: string;
  bar: string;
  zoo: string;
}) {
  return { foo, bar, zoo };
}
const myFunctionWithDefaults = withDefaults(myFunction, {
  foo: '1',
})
test('happy path', () => {
  expect(myFunctionWithDefaults({ 
    bar: '1', 
    zoo: '1',
  })).toEqual({
    foo: '1',
    bar: '1',
    zoo: '1',
  })
})

test('override', () => {
  expect(myFunctionWithDefaults({ 
    foo: '2',
    bar: '1', 
    zoo: '1',
  })).toEqual({
    foo: '2',
    bar: '1',
    zoo: '1',
  })
})


test('compose', () => {
  const myComposedFunctionWithDefaults = withDefaults(myFunctionWithDefaults, {
    foo: '2',
    bar: '1',
  })
  expect(myComposedFunctionWithDefaults({ 
    zoo: '1',
  })).toEqual({
    foo: '2',
    bar: '1',
    zoo: '1',
  })
})