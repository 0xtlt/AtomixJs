import { Component, atomixContext, WebLazyComponent } from "../lib";

const [, setName, subscribeName] = atomixContext("John", "local");

@WebLazyComponent("atomix-component")
class MyComponent extends Component {
  private startedAt = new Date();

  start() {
    this.logger("start");
    this.printDate();

    this.query<HTMLInputElement>("input")?.addEventListener("input", (ev) => {
      if (ev.target instanceof HTMLInputElement) setName(ev.target?.value);
    });

    this.hook(() => {
      return subscribeName((name) => {
        this.query<HTMLInputElement>("input")!.value = name;
      });
    });

    this.hook(async () => {
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
    this.query(
      "span"
    )!.innerHTML = `(Module started at ${this.startedAt.toISOString()}) The date is: ${new Date()}`;
  }
}
