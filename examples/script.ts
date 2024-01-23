import {
  Component,
  WebComponent,
  dataset,
  query,
  useAtomixState,
} from "../lib";

const { set: setName, subscribe: subscribeName } = useAtomixState("John");

@WebComponent("atomix-component")
class MyComponent extends Component {
  startedAt: Date | undefined;
  lazyload: boolean = true;

  @dataset("name")
  name = "Thomas";

  @query("input")
  input: HTMLInputElement | null = null;

  start() {
    this.logger("start", this.name, this.input);
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
        this.name = inputName;
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
