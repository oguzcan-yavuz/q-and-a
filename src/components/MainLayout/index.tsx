import React, { FC } from 'react'
import './index.scss'
import Navbar from '../Navbar'

const MainLayout: FC = ({ children }) => (
  <div className="main">
    <div className="main__navbar">
      <Navbar />
    </div>
    <div className="main__body">{children}</div>
  </div>
)

export default MainLayout
