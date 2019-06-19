type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type FunctionWithOneArg = (opts: any) => any
type Arguments<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void] ? [] : [T]

export function withDefaults<
  T extends FunctionWithOneArg, 
  >(fn: T, defaults: Partial<Arguments<T>[0]>)  {
    type Options = Arguments<T>[0]
    
    /**
     * Grab the keys of the passed in `defaults`
     * 🐛 Not doing What I want 🐛
     */
    type DefaultKeys = keyof typeof defaults

    /**
     * Make a type of the in `default`s, the options without `defaults` and
     * make a new type where the passed in defaults are optional
     */
    type OptionsPickedDefaults = Pick<Options, DefaultKeys>
    type OptionsWithoutDefaults = Without<Options, DefaultKeys>
    type NewOptions = Partial<OptionsPickedDefaults> & OptionsWithoutDefaults

    return (args: NewOptions): ReturnType<T> => (
      fn({
        ...defaults,
        ...args,
      })
    )
}
