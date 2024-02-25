import React from 'react'
import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom"
import Signup from "./Signup"
import Dashboard from "./Dashboard"
import Signin from "./Signin"
import SendMoney from "./SendMoney"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/signup' />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App