
import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import Products from './Products/Products'
import ProductCard from './ProductDetails/ProductCard'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/products/:id' element={<ProductCard/>}></Route>
    </Routes>
  )

  
}

export default App
