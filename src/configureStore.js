import { configureStore as configStore } from 'redux-starter-kit';
import rootReducer from './slices';

export default function configureStore() {
  return configStore({
    reducer: rootReducer,
  });
}
