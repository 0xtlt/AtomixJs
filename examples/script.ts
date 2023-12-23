import {
  Component,
  WebLazyComponent,
  WebComponent,
  useAtomixState,
} from "../lib";

const [, setName, subscribeName] = useAtomixState("John");

@WebLazyComponent("atomix-component")
class MyComponent extends Component {
  private startedAt = new Date();

  start() {
    this.logger("start");
    this.printDate();

    this.query<HTMLInputElement>("input")?.addEventListener("input", (ev) => {
      if (ev.target instanceof HTMLInputElement) setName(ev.target?.value);
    });

    this.cycle(() => {
      return subscribeName((name) => {
        this.query<HTMLInputElement>("input")!.value = name;
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
    this.query(
      "span"
    )!.innerHTML = `(Module started at ${this.startedAt.toISOString()}) The date is: ${new Date()}`;
  }
}
