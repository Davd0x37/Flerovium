import { PiniaPluginContext, PiniaStorePlugin } from 'pinia';

const update = (key: string, store: PiniaPluginContext['store']) => {
  localStorage.setItem(key, JSON.stringify(store.$state));
};

const persistStore: PiniaStorePlugin = ({ store, options }) => {
  const { key } = options.persists;
  const storage = localStorage.getItem(key);

  if (storage) {
    store.$patch(JSON.parse(storage));
    update(key, store);
  }

  store.$subscribe(() => {
    update(key, store);
  });
};

export default persistStore;
