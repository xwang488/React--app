import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import ant-design css file
import 'antd/dist/reset.css'
//import index.scss file
import './index.scss'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

