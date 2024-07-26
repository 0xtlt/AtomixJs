import type { AddCycleFn } from "./cycle";

export const AHTMLElement = makeAtomixComponent(HTMLElement);
export type ComponentType = InstanceType<typeof AHTMLElement>;

export function makeAtomixComponent<
	Element extends {
		// biome-ignore lint/suspicious/noExplicitAny: because we simply don't know
		new (...args: any[]): HTMLElement;
	},
>(element: Element) {
	return class extends element {
		// Cycles system
		#_cycles: Array<() => unknown> = [];
		#_namedCycles: Record<string, () => unknown> = {};
		#loaded = false;

		connectedCallback() {
			if (!this.dataset["client:load"]) {
				const observer = new IntersectionObserver(
					(entries) => {
						for (const entry of entries) {
							if (entry.isIntersecting) {
								observer.unobserve(this);
								this.initComponent();
							}
						}
					},
					{ threshold: 0.1 },
				);

				observer.observe(this);

				return;
			}

			setTimeout(() => this.initComponent(), 1);
		}

		disconnectedCallback() {
			if (this.#loaded) {
				this.onDestroy?.();
				this.clearCycles?.();
				this.#loaded = false;
			}
		}

		initComponent() {
			if (this.#loaded) return;

			this.#loaded = true;
			this.onStart?.();
		}

		stateSubscribe<Type>(
			stateSubscribeCallback: (
				cb: (value: Type, oldValue: Type) => void | Promise<void>,
			) => () => void,
			callback: (value: Type, oldValue: Type) => void | Promise<void>,
		) {
			this.cycle(() => stateSubscribeCallback(callback));
		}

		// Cycles
		cycle(cb: AddCycleFn) {
			const fn = cb();

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
			for (const key of keys) {
				const res = this.#_namedCycles[key]();
				if (res instanceof Promise) {
					res.then(() => null);
				}
			}

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
			const fn = cb();

			if (fn instanceof Promise) {
				fn.then((fn) => (this.#_namedCycles[name] = fn));
			} else {
				this.#_namedCycles[name] = fn;
			}
		}

		// Auto cycled events
		on<K extends keyof HTMLElementEventMap>(
			type: K,
			listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
			options?: boolean | AddEventListenerOptions,
		): void;

		on(
			type: string,
			listener: (this: HTMLElement, ev: CustomEvent) => unknown,
			options?: boolean | AddEventListenerOptions,
		): void;

		on<K extends keyof HTMLElementEventMap | string>(
			type: K,
			listener: (
				this: HTMLElement,
				ev: K extends keyof HTMLElementEventMap
					? HTMLElementEventMap[K]
					: CustomEvent,
			) => unknown,
			options?: boolean | AddEventListenerOptions,
		) {
			this.cycle(() => {
				this.addEventListener(type, listener as EventListener, options);
				return () =>
					this.removeEventListener(type, listener as EventListener, options);
			});
		}

		onElement<K extends keyof HTMLElementEventMap>(
			element: HTMLElement | Document | Window,
			type: K,
			listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
			options?: boolean | AddEventListenerOptions,
		): void;

		onElement(
			element: HTMLElement | Document | Window,
			type: string,
			listener: (this: HTMLElement, ev: CustomEvent) => unknown,
			options?: boolean | AddEventListenerOptions,
		): void;

		onElement<K extends keyof HTMLElementEventMap | string>(
			element: HTMLElement | Document | Window,
			type: K,
			listener: (
				this: HTMLElement,
				ev: K extends keyof HTMLElementEventMap
					? HTMLElementEventMap[K]
					: CustomEvent,
			) => unknown,
			options?: boolean | AddEventListenerOptions,
		) {
			this.cycle(() => {
				element.addEventListener(type, listener as EventListener, options);
				return () =>
					element.removeEventListener(type, listener as EventListener, options);
			});
		}

		// Lifecycle
		onStart?(): void;
		onDestroy?(): void;

		// Helpers
		_attribute(name: string): string;
		_attribute(name: string, type: "string"): string;
		_attribute(name: string, type: "number"): number;
		_attribute(name: string, type: "boolean"): boolean;
		_attribute(name: string, type: "string", canBeNull: true): string | null;
		_attribute(name: string, type: "number", canBeNull: true): number | null;
		_attribute(name: string, type: "boolean", canBeNull: true): boolean | null;
		_attribute(name: string, type: "string", canBeNull: false): string;
		_attribute(name: string, type: "number", canBeNull: false): number;
		_attribute(name: string, type: "boolean", canBeNull: false): boolean;

		// Implementation of _attribute
		_attribute(
			name: string,
			type: "string" | "number" | "boolean" = "string",
			canBeNull?: boolean,
		): string | number | boolean | null {
			const value = this.getAttribute(name);

			if (value === null) {
				if (canBeNull === true) return null;
				throw new Error(`Attribute "${name}" is required but not present`);
			}

			switch (type) {
				case "string": {
					return value;
				}
				case "number": {
					const num = Number.parseFloat(value);
					if (Number.isNaN(num)) {
						throw new Error(`Attribute "${name}" is not a valid number`);
					}
					return num;
				}
				case "boolean": {
					return value.toLowerCase() === "true";
				}
				default: {
					throw new Error(`Invalid attribute type: ${type}`);
				}
			}
		}

		logger(...args: unknown[]) {
			console.info(`[${this.tagName}]`, ...args);
		}
	};
}
