import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css' // 使用了antd/dist/reset.css
import App from './App'
// import reportWebVitals from './reportWebVitals'
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
