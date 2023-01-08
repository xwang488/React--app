// import Layout from './pages/Layout'

// import Login from './pages/Login'

import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom"
import { AuthComponent } from '@/components/AuthCompoent'
import './App.css'
import { history } from './utils'
import { lazy, Suspense } from 'react'
const Login = lazy(() => import('./pages/Login'))
const GeekLayout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

// import { Observer } from 'mobx-react-lite'
// import { Button } from 'antd'
function App () {
  return (
    //router
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        <div className="App">
          <Routes>
            {/* layout need authorization */}
            <Route path='/' element={
              <AuthComponent>
                <GeekLayout />
              </AuthComponent>
            }>
              <Route index element={<Home />}></Route>
              <Route path='article' element={<Article />}></Route>
              <Route path='publish' element={<Publish />}></Route>
            </Route>
            <Route path='/login' element={<Login></Login>}></Route>
          </Routes>
        </div>
      </Suspense>
    </HistoryRouter>
  )
}

export default App
