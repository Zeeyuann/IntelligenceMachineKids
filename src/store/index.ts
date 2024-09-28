import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { resetSetupStore } from './plugins';

const store = createPinia();
/** Setup Vue store plugin pinia */
export function setupStore(app: App) {
  store.use(resetSetupStore);
  store.use(piniaPersist);

  app.use(store);
}
export { store };
