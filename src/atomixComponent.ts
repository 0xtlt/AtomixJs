import { type AddCycleFn } from "./cycle";

export const Component = makeAtomixComponent(HTMLElement);
export type ComponentType = InstanceType<typeof Component>;

export function makeAtomixComponent<
  Element extends {
    new (...args: any[]): HTMLElement;
  }
>(element: Element) {
  return class extends element {
    // Cycles system
    _cycles: Array<() => any> = [];
    _namedCycles: Record<string, () => any> = {};
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
      this.start?.();

      if (this.a_onclick) {
        this.addEventListener("click", this.a_onclick);
      }

      if (this.a_onsubmit) {
        this.addEventListener("submit", this.a_onsubmit);
      }

      if (this.a_onchange) {
        this.addEventListener("change", this.a_onchange);
      }
    }

    // Atomix auto subscribed events
    a_onclick?(ev: Event): void;
    a_onsubmit?(ev: Event): void;
    a_onchange?(ev: Event): void;

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

      const keys = Object.keys(this._namedCycles);
      // unmount named cycles
      keys.forEach((key) => {
        const res = this._namedCycles[key]();
        if (res instanceof Promise) {
          res.then(() => null);
        }
      });

      this._cycles = [];
      this._namedCycles = {};
    }

    // Named cycles
    namedCycle(name: string, cb: AddCycleFn) {
      // unmout previous cycle
      if (this._namedCycles[name]) {
        const res = this._namedCycles[name]();
        if (res instanceof Promise) {
          res.then(() => null);
        }
      }
      let fn = cb();

      if (fn instanceof Promise) {
        fn.then((fn) => (this._namedCycles[name] = fn));
      } else {
        this._namedCycles[name] = fn;
      }
    }

    // TODO: finish this
    // static attach(element: HTMLElement | string) {
    //   const el =
    //     typeof element === "string"
    //       ? document.querySelector<HTMLElement>(element)
    //       : element;

    //   if (!el) {
    //     throw new Error(`Element not found: ${element}`);
    //   }

    //   const component = new this();
    //   component.start?.();
    //   return component;
    // }

    // Lifecycle
    start?(): void;
    onDestroy?(): void;

    // Logger methods
    static logger(...args: any[]) {
      console.info(`[NOT IMPLEMENTED]`, ...args);
    }

    logger(...args: any[]) {
      console.info(`[${this.tagName}]`, ...args);
    }
  };
}
