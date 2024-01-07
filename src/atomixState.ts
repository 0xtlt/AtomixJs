// Define possible storage types
export type StorageType = "local" | "session" | "ram";

/**
 * Creates a state management system with optional persistence.
 * @param initialValue - The initial value of the state.
 * @param key - Optional key for storing the state in localStorage or sessionStorage.
 * @param storageType - Defines where the state is stored: in RAM, localStorage, or sessionStorage.
 * @returns An object containing functions to get and set the state, and to subscribe to state changes.
 */
function createAtomixState<Type>(
  initialValue: Type,
  key?: string,
  storageType: StorageType = "ram"
) {
  const listeners: Record<
    string,
    (value: Type, oldValue: Type) => void | Promise<void>
  > = {};
  let value =
    storageType === "ram"
      ? initialValue
      : getStoredValue(key, initialValue, storageType);

  // Retrieves stored value from localStorage or sessionStorage.
  function getStoredValue(
    key: string | undefined,
    defaultValue: Type,
    type: StorageType
  ): Type {
    if (!key) return defaultValue;

    const item = (type === "local" ? localStorage : sessionStorage).getItem(
      key
    );
    return item ? JSON.parse(item) : defaultValue;
  }

  // Stores the value in localStorage or sessionStorage.
  function storeValue(
    key: string | undefined,
    newValue: Type,
    type: StorageType
  ) {
    if (type === "ram" || !key) return;

    const storage = type === "local" ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(newValue));
  }

  const getValue = () => value;
  const setValue = (newValue: Type) => {
    const oldValue = value;
    value = newValue;
    storeValue(key, newValue, storageType);
    Object.values(listeners).forEach((cb) => cb(value, oldValue));
  };

  // Subscribes a callback to state changes.
  const subscribe = (
    cb: (value: Type, oldValue: Type) => void | Promise<void>
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    listeners[id] = cb;
    cb(value, value);
    return () => {
      delete listeners[id];
    };
  };

  return { get: getValue, set: setValue, subscribe } as const;
}

/**
 * Hook for using state managed by createAtomixState in memory.
 * @param initialValue - The initial value of the state.
 * @returns An object containing functions to get and set the state, and to subscribe to state changes.
 */
export function useAtomixState<Type>(initialValue: Type) {
  return createAtomixState(initialValue);
}

/**
 * Hook for using state managed by createAtomixState with browser storage.
 * @param key - Key for storing the state in localStorage or sessionStorage.
 * @param initialValue - The initial value of the state.
 * @param storageType - Type of browser storage to use.
 * @returns A tuple containing functions to get and set the state, and to subscribe to state changes.
 */
export function useAtomixBrowserState<Type>(
  key: string,
  initialValue: Type,
  storageType: StorageType
) {
  return createAtomixState(initialValue, key, storageType);
}
