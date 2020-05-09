import React, { FC } from 'react'
import './index.scss'
import Header from '../Header'

const MainLayout: FC = ({ children }) => (
  <div className="main">
    <div className="main__header">
      <Header />
    </div>
    <div className="main__body">{children}</div>
  </div>
)

export default MainLayout
