'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store } from './store/store';
import { persistStore } from 'redux-persist';

const ReduxProvider = ({ children }) => {

  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider