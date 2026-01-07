
import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import Products from './Products/Products'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
    </Routes>
  )

  
}

export default App
