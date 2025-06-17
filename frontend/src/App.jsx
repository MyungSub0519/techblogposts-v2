import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QueryProvider from './providers/QueryProvider'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Blogs from './pages/Blogs/Blogs'
import NotFound from './pages/NotFound/NotFound'
import { routes } from './utils/constants'
import './styles/globals.css'

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.blogs} element={<Blogs />} />
            <Route path={routes.notFound} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App