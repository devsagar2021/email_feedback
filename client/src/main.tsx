import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
// import axios from 'axios'
// // @ts-expect-error todo: temp, remove after testing
// window.axios = axios

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
