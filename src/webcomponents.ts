import { Component } from "./atomixComponent";

export function defineWebComponent(
  name: string,
  constructor: { new (el: Element): Component<HTMLElement> },
  isLazy: boolean,
  elementConstructor: CustomElementConstructor = HTMLElement
) {
  customElements.define(
    name,
    class extends elementConstructor {
      private instance: Component | null = null;
      private observer: IntersectionObserver | null = null;

      constructor() {
        super();

        if (isLazy) {
          this.observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !this.instance) {
                  this.instance = new constructor(this);
                  this.instance.start?.();
                }
              });
            },
            { threshold: 0.1 }
          );
        } else {
          this.instance = new constructor(this);
        }
      }

      connectedCallback() {
        if (this.observer) {
          this.observer.observe(this);
        } else {
          this.instance?.start?.();
        }
      }

      disconnectedCallback() {
        this.instance?.onDestroy?.();
        this.instance?.clearCycles?.();

        if (this.observer) {
          this.observer.disconnect();
        }
      }
    }
  );
}

export function WebComponent(name: string) {
  return function (constructor: any) {
    defineWebComponent(name, constructor, false, HTMLElement);
  };
}

export function WebLazyComponent(name: string) {
  return function (constructor: any) {
    defineWebComponent(name, constructor, true, HTMLElement);
  };
}
