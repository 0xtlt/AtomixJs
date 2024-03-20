import { type AddCycleFn } from "./cycle";

export const AHTMLElement = makeAtomixComponent(HTMLElement);
export type ComponentType = InstanceType<typeof AHTMLElement>;

export function makeAtomixComponent<
  Element extends {
    new (...args: any[]): HTMLElement;
  }
>(element: Element) {
  return class extends element {
    // Cycles system
    #_cycles: Array<() => any> = [];
    #_namedCycles: Record<string, () => any> = {};
    lazyload: boolean = false;
    loaded: boolean = false;

    constructor(...args: any[]) {
      super(...args);
    }

    connectedCallback() {
      if (this.lazyload) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.initComponent();
                observer.unobserve(this);
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(this);

        return;
      }

      setTimeout(() => this.initComponent(), 1);
    }

    disconnectedCallback() {
      if (this.loaded) {
        this.onDestroy?.();
        this.clearCycles?.();
      }
    }

    initComponent() {
      this.loaded = true;
      this.onStart?.();
    }

    stateSubscribe<Type>(
      stateSubscribeCallback: (
        cb: (value: Type, oldValue: Type) => void | Promise<void>
      ) => () => void,
      callback: (value: Type, oldValue: Type) => void | Promise<void>
    ) {
      this.cycle(() => stateSubscribeCallback(callback));
    }

    // Cycles
    cycle(cb: AddCycleFn) {
      let fn = cb();

      if (fn instanceof Promise) {
        fn.then((fn) => this.#_cycles.push(fn));
      } else {
        this.#_cycles.push(fn);
      }
    }

    clearCycles() {
      this.#_cycles.map((cb) => {
        const res = cb();
        if (res instanceof Promise) {
          res.then(() => null);
        }
      });

      const keys = Object.keys(this.#_namedCycles);
      // unmount named cycles
      keys.forEach((key) => {
        const res = this.#_namedCycles[key]();
        if (res instanceof Promise) {
          res.then(() => null);
        }
      });

      this.#_cycles = [];
      this.#_namedCycles = {};
    }

    // Named cycles
    namedCycle(name: string, cb: AddCycleFn) {
      // unmout previous cycle
      if (this.#_namedCycles[name]) {
        const res = this.#_namedCycles[name]();
        if (res instanceof Promise) {
          res.then(() => null);
        }
      }
      let fn = cb();

      if (fn instanceof Promise) {
        fn.then((fn) => (this.#_namedCycles[name] = fn));
      } else {
        this.#_namedCycles[name] = fn;
      }
    }

    // Auto cycled events
    on<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ) {
      this.cycle(() => {
        this.addEventListener(type, listener, options);
        return () => this.removeEventListener(type, listener, options);
      });
    }

    onElement<K extends keyof HTMLElementEventMap>(
      element: HTMLElement | Document | Window,
      type: K,
      listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ) {
      this.cycle(() => {
        element.addEventListener(type, listener as any, options);
        return () =>
          element.removeEventListener(type, listener as any, options);
      });
    }

    // Lifecycle
    onStart?(): void;
    onDestroy?(): void;

    logger(...args: any[]) {
      console.info(`[${this.tagName}]`, ...args);
    }
  };
}
