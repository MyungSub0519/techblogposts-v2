import { Outlet } from 'react-router-dom'
import Header from '../common/Header/Header'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}