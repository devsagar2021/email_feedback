import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import store from './config/store'

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
