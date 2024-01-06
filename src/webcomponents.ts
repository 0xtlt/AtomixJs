import { type ComponentType } from "./atomixComponent";

export function defineWebComponent(
  name: string,
  constructor: { new (el: Element): ComponentType },
  options?: ElementDefinitionOptions
) {
  customElements.define(name, constructor, options);
}

export function WebComponent(name: string, options?: ElementDefinitionOptions) {
  return function (constructor: any) {
    defineWebComponent(name, constructor, options);
  };
}
