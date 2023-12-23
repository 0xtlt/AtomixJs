import { type AddHookFn } from "./hook";

export class Component<Element extends HTMLElement = HTMLElement> {
  // Hooks system
  private _hooks: Array<() => any> = [];

  constructor(private el: Element) {}

  // Events
  onclick?(ev: Event): void;
  onsubmit?(ev: Event): void;
  onchange?(ev: Event): void;

  // Hooks
  hook(cb: AddHookFn) {
    let fn = cb();

    if (fn instanceof Promise) {
      fn.then((fn) => this._hooks.push(fn));
    } else {
      this._hooks.push(fn);
    }
  }

  clearHooks() {
    this._hooks.map((cb) => {
      const res = cb();
      if (res instanceof Promise) {
        res.then(() => null);
      }
    });
    this._hooks = [];
  }

  // Lifecycle
  start?(): void;
  onDestroy?(): void;

  // Logger methods
  static logger(...args: any[]) {
    console.info(`[NOT IMPLEMENTED]`, ...args);
  }

  logger(...args: any[]) {
    console.info(`[${this.element.tagName}]`, ...args);
  }

  // Utils methods
  get element() {
    return this.el;
  }

  query<T extends HTMLElement>(selector: string) {
    return this.element.querySelector<T>(selector);
  }
}
