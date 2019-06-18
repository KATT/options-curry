type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type FunctionWithOneArg = (opts: any, ...args: any[]) => any
type Arguments<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void] ? [] : [T]

export function withDefaults<
  T extends FunctionWithOneArg, 
  >(fn: T, defaults: Partial<Arguments<T>[0]>)  {
    type FunctionOpts = Arguments<T>[0]
    type DefaultKeys = keyof typeof defaults

    type FunctionDefaults = Pick<FunctionOpts, DefaultKeys>
    type FunctionWithoutDefaults = Without<FunctionOpts, DefaultKeys>

    type AllowedArgs = Partial<FunctionDefaults> & FunctionWithoutDefaults

    return (args: AllowedArgs): ReturnType<T> => (
      fn({
        ...defaults,
        ...args,
      })
    )
}
