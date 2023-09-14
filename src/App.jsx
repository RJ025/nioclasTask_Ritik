import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import { Provider } from 'react-redux'
import store from './utils/store'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import TestPage from './components/TestPage'
import { MathJaxContext } from 'better-react-mathjax'
import SubmitPage from './components/SubmitPage'

const appRouter = createBrowserRouter([
  {
    path : "/" ,
    element : <App/>,
    children : [
      {
        path : "/" ,
        element : <LandingPage/>
      } ,

      {
        path : "/test" ,
        element : <TestPage/>
      } ,

      {
        path : "/submit" ,
        element : <SubmitPage/>
      }
    ]
  }

])

function App() {
  const config = {
    tex : {
      inlineMath : [['$' , '$'] , ['\\(' , '//)']]
    }
};

  return (
    <MathJaxContext config={config}>
      <Provider store={store}>
        <Outlet/>
      </Provider>
    </MathJaxContext>
  )
}

export default appRouter
