import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { ServiceProvider } from './services/context'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
