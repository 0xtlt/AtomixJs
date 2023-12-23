import { type AddCycleFn } from "./cycle";

export class Component<Element extends HTMLElement = HTMLElement> {
  // Cycles system
  private _cycles: Array<() => any> = [];

  constructor(private el: Element) {}

  // Events
  onclick?(ev: Event): void;
  onsubmit?(ev: Event): void;
  onchange?(ev: Event): void;

  // Cycles
  cycle(cb: AddCycleFn) {
    let fn = cb();

    if (fn instanceof Promise) {
      fn.then((fn) => this._cycles.push(fn));
    } else {
      this._cycles.push(fn);
    }
  }

  clearCycles() {
    this._cycles.map((cb) => {
      const res = cb();
      if (res instanceof Promise) {
        res.then(() => null);
      }
    });
    this._cycles = [];
  }

  // TODO: finish this
  static attach(element: HTMLElement | string) {
    const el =
      typeof element === "string"
        ? document.querySelector<HTMLElement>(element)
        : element;

    if (!el) {
      throw new Error(`Element not found: ${element}`);
    }

    const component = new this(el);
    component.start?.();
    return component;
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
