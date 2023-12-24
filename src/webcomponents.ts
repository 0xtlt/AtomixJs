import { type ComponentType } from "./atomixComponent";

export function defineWebComponent(
  name: string,
  constructor: { new (el: Element): ComponentType }
) {
  customElements.define(name, constructor);
}

export function WebComponent(name: string) {
  return function (constructor: any) {
    defineWebComponent(name, constructor);
  };
}
