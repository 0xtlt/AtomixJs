export type AddHookFn = () => (() => any) | Promise<() => any>;
