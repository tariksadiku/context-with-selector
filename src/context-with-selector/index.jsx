/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useSyncExternalStore,
} from "react";

const contextWithSelectors = (initialState, storeActions) => {
  if (Object.values(initialState || {}).length === 0)
    throw new Error("No initial state");

  function useStoreData() {
    let store = initialState;

    const get = () => store;

    const set = (value) => {
      store = { ...store, ...value };
      subscribers.forEach((callback) => callback());
    }

    const subscribers = new Set();

    const subscribe = (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    };

    const actions = Object.keys(storeActions).reduce((acc, key) => {
      acc[key] = (...params) => storeActions[key]({ set, get }, params);
      return acc;
    }, {});

    return {
      get,
      subscribe,
      actions,
    };
  }

  const StoreContext = createContext(null);

  function Provider({ children }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStore(selector) {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );

    return [state, store.actions];
  }

  return { Provider, useStore };
};

export default contextWithSelectors;
