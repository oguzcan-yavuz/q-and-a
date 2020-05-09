import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ServiceProvider } from './services/context'

ReactDOM.render(
  <React.StrictMode>
    <ServiceProvider>
      <App />
    </ServiceProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
