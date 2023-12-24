import { Component, WebComponent, useAtomixState } from "../lib";

const [, setName, subscribeName] = useAtomixState("John");

@WebComponent("atomix-component")
class MyComponent extends Component {
  startedAt: Date | undefined;
  lazyload: boolean = true;

  start() {
    this.logger("start");
    this.startedAt = new Date();
    this.printDate();

    this.querySelector<HTMLInputElement>("input")?.addEventListener(
      "input",
      (ev) => {
        if (ev.target instanceof HTMLInputElement) setName(ev.target?.value);
      }
    );

    this.cycle(() => {
      return subscribeName((name) => {
        this.querySelector<HTMLInputElement>("input")!.value = name;
      });
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
