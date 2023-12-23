export type StorageType = "ram" | "session" | "local";
export function atomixContext<Type>(
  initialValue: Type,
  storageType: StorageType = "ram"
) {
  const listeners: Record<string, (value: Type) => void | Promise<void>> = {};
  let value = getStoredValue(initialValue, storageType);

  function getStoredValue(defaultValue: Type, type: StorageType): Type {
    switch (type) {
      case "session":
        return JSON.parse(
          sessionStorage.getItem("hookContextValue") ||
            JSON.stringify(defaultValue)
        );
      case "local":
        return JSON.parse(
          localStorage.getItem("hookContextValue") ||
            JSON.stringify(defaultValue)
        );
      default:
        return defaultValue;
    }
  }

  function storeValue(newValue: Type, type: StorageType) {
    switch (type) {
      case "session":
        sessionStorage.setItem("hookContextValue", JSON.stringify(newValue));
        break;
      case "local":
        localStorage.setItem("hookContextValue", JSON.stringify(newValue));
        break;
    }
  }

  const getValue = () => value;
  const setValue = (newValue: Type) => {
    value = newValue;
    storeValue(newValue, storageType);
    Object.values(listeners).forEach((cb) => cb(value));
  };

  const subscribe = (cb: (value: Type) => void | Promise<void>) => {
    const id = Math.random().toString(36).substring(2, 9);
    listeners[id] = cb;

    // first call
    cb(value);

    return () => {
      delete listeners[id];
    };
  };

  return [getValue, setValue, subscribe] as const;
}
