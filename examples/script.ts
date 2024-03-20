import { AHTMLElement, useAtomixState } from "../lib";

const { set: setName, subscribe: subscribeName } = useAtomixState("John");

class MyComponent extends AHTMLElement {
  lazyload: boolean = true;

  startedAt: Date | undefined;

  input = this.querySelector("input");

  onStart() {
    this.logger("start", this.dataset.name, this.input);
    this.startedAt = new Date();
    this.printDate();

    this.querySelector<HTMLInputElement>("input")?.addEventListener(
      "input",
      (ev) => {
        if (ev.target instanceof HTMLInputElement) setName(ev.target?.value);
      }
    );

    this.cycle(() => {
      return subscribeName((inputName) => {
        this.dataset.name = inputName;
        this.querySelector<HTMLInputElement>("input")!.value = inputName;
      });
    });
    // OR BETTER
    this.stateSubscribe(subscribeName, (name) => {
      this.querySelector<HTMLInputElement>("input")!.value = name;
    });

    this.cycle(async () => {
      const i = setInterval(() => {
        this.printDate();
      }, 1000);

      return () => clearInterval(i);
    });
  }

  onDestroy() {
    this.logger("destroy");
  }

  // Custom method
  printDate() {
    this.querySelector(
      "span"
    )!.innerHTML = `(Module started at ${this.startedAt?.toISOString()}) The date is: ${new Date()}`;
  }
}

customElements.define("atomix-component", MyComponent);
