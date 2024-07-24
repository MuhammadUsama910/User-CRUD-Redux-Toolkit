import './App.css'
import Users from './components/Users'
import UpdateUser from './components/UpdateUser'
import CreateUser from './components/CreateUser'
import UserDetail from './components/UserDetail'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Users/>} />
        <Route path='/update/:id' element={<UpdateUser/>} />
        <Route path='/create' element={<CreateUser/>} />
        <Route path='/userDetail/:id' element={<UserDetail/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
