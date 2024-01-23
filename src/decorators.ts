export function dataset(selector?: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        // Return the value of the data attribute if available
        return this.dataset ? this.dataset[selector || propertyKey] : null;
      },
      set: function (newValue) {
        // Set values in connectedCallback to avoid errors
        const initDatasetValue = () => {
          if (this.isConnected && this.dataset) {
            this.dataset[selector || propertyKey] = newValue;
          } else {
            setTimeout(initDatasetValue, 0); // Retry after a short delay
          }
        };
        initDatasetValue();
      },
    });
  };
}

export function query(selector: string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this.querySelector(selector);
      },
      set: function () {},
    });
  };
}
