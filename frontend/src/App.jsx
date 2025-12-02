import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import HeroSection from './components/herosection'
import Login from './components/login'
import { UserProvider } from './contexts/UserContext'


function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header onLoginClick={() => setIsLoginOpen(true)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="/products" element={
                <div className="page-content">
                  <h1>Products</h1>
                  <p>Browse our amazing collection</p>
                </div>
              } />
              <Route path="/categories" element={
                <div className="page-content">
                  <h1>Categories</h1>
                  <p>Shop by category</p>
                </div>
              } />
              <Route path="/deals" element={
                <div className="page-content">
                  <h1>Hot Deals</h1>
                  <p>Check out our latest offers</p>
                </div>
              } />
              <Route path="/about" element={
                <div className="page-content">
                  <h1>About Us</h1>
                  <p>Learn more about ShopHub</p>
                </div>
              } />
            </Routes>
          </main>
          {/* Login Modal rendered at root level */}
          <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
