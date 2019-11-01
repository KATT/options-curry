type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const withDefaults = <
  TReturnType,
  TOptions extends Record<string | number | symbol, any>,
  TDefaults extends Partial<TOptions>,
  TDefaultKeys extends keyof TDefaults
>(
  fn: (opts: TOptions) => TReturnType,
  defaults: TDefaults
) => {
  /**
   * Make a type of the in `default`s, the options without `defaults` and
   * make a new type where the passed in defaults are optional
   */
  type OptionsPickedDefaults = Pick<TOptions, TDefaultKeys>;
  type OptionsWithoutDefaults = Without<TOptions, TDefaultKeys>;

  type NewOptions = Partial<OptionsPickedDefaults> & OptionsWithoutDefaults;

  return (args: NewOptions): ReturnType<typeof fn> => {
    /**
     * Something lacking in the inference so typecasting this to `any`
     */
    const arg: any = {
      ...defaults,
      ...args,
    };

    return fn(arg);
  };
};
