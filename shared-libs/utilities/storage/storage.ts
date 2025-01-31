/**
 * An imperative wrapper around localStorage that allows
 *  TypeScript-enforced reading and writing of data to the device's disk.
 * @param key The Key you wish to store this data under, this must be unique to avoid collisions
 * @param defaultValue [Optional] A default value that will be returned if a value
 *    does not exist in storage for that key.
 *    Note: this will not set the default value in the store.
 * @param debugLogEnabled [Optional] A debug-only flag to determine if actions taken by
 *    StorageController should be logged to the console.
 */
export const StorageController = <T>(key: string, defaultValue?: T, debugLogEnabled?: boolean) => {
  const getItem = async () => {
    const data = localStorage.getItem(key);
    debugLog(`read data for key: ${key}`);
    if (!data) {
      return defaultValue || null;
    }
    const parsedData = JSON.parse(data as string) as T;
    return parsedData;
  };

  const setItem = async (data: T | undefined) => {
    if (data) {
      const formattedData = JSON.stringify(data);
      localStorage.setItem(key, formattedData);

      debugLog(`wrote data for key: ${key}`);
    } else {
      removeItem();
    }
  };

  const removeItem = async () => {
    localStorage.removeItem(key);
    debugLog(`removed data for key: ${key}`);
  };

  const debugLog = (log: string) => {
    if (debugLogEnabled && __DEV__) {
      console.log(`StorageController ${log}`);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

/**
 * An imperative wrapper around sessionStorage that allows
 *  TypeScript-enforced reading and writing of data to the device's disk.
 * @param key The Key you wish to store this data under, this must be unique to avoid collisions
 * @param defaultValue [Optional] A default value that will be returned if a value
 *    does not exist in storage for that key.
 *    Note: this will not set the default value in the store.
 * @param debugLogEnabled [Optional] A debug-only flag to determine if actions taken by
 *    StorageController should be logged to the console.
 */
export const SessionStorageController = <T>(key: string, defaultValue?: T, debugLogEnabled?: boolean) => {
  const getItem = async () => {
    const data = sessionStorage.getItem(key);

    debugLog(`read data for key: ${key}`);

    if (!data) {
      return defaultValue || null;
    }
    const parsedData = JSON.parse(data as string) as T;
    return parsedData;
  };

  const setItem = async (data: T | undefined) => {
    if (data) {
      const formattedData = JSON.stringify(data);
      sessionStorage.setItem(key, formattedData);

      debugLog(`wrote data for key: ${key}`);
    } else {
      removeItem();
    }
  };

  const removeItem = async () => {
    sessionStorage.removeItem(key);
    debugLog(`removed data for key: ${key}`);
  };

  const debugLog = (log: string) => {
    if (debugLogEnabled && __DEV__) {
      console.log(`StorageController ${log}`);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
