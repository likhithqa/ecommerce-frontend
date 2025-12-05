import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/header'
import HeroSection from './components/herosection'
import Login from './components/login'
import AdminDashboard from './pages/admin_dashboard'
import Clients from './pages/clients'
import Projects from './pages/projects'
import ProjectDetails from './pages/project_details'
import Tasks from './pages/tasks'
import Invoices from './pages/invoices'
import TeamManagement from './pages/team'
import { UserProvider } from './contexts/UserContext'

// Error Component
const ErrorPage = () => {
  const navigate = useNavigate()
  
  return (
    <div className="app">
      <Header onLoginClick={() => {}} />
      <main className="main-content">
        <div className="page-content">
          <h1>Error Page</h1>
          <p>Something went wrong. Please try again later.</p>
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => window.history.back()} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
              Go Back
            </button>
            <button onClick={() => navigate('/')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Home
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}


function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="app">
              <Header onLoginClick={() => setIsLoginOpen(true)} />
              <main className="main-content">
                <HeroSection />
              </main>
              <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
          } />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/team" element={<TeamManagement />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/projects/:id" element={<ProjectDetails />} />
          <Route path="/admin/tasks" element={<Tasks />} />
          <Route path="/admin/invoices" element={<Invoices />} />
          <Route path="/client/landing" element={
            <div className="app">
              <Header onLoginClick={() => setIsLoginOpen(true)} />
              <main className="main-content">
                <div className="page-content">
                  <h1>Welcome to Client Landing Page</h1>
                  <p>Browse our amazing products and start shopping!</p>
                  <div style={{ marginTop: '20px' }}>
                    <button onClick={() => setIsLoginOpen(true)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      Back to Login
                    </button>
                  </div>
                </div>
              </main>
              <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
          } />
          <Route path="/products" element={
            <div className="app">
              <Header onLoginClick={() => setIsLoginOpen(true)} />
              <main className="main-content">
                <div className="page-content">
                  <h1>Products</h1>
                  <p>Browse our amazing collection</p>
                </div>
              </main>
              <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
          } />
          <Route path="/categories" element={
            <div className="app">
              <Header onLoginClick={() => setIsLoginOpen(true)} />
              <main className="main-content">
                <div className="page-content">
                  <h1>Categories</h1>
                  <p>Shop by category</p>
                </div>
              </main>
              <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
          } />
          <Route path="/deals" element={
            <div className="app">
              <Header onLoginClick={() => setIsLoginOpen(true)} />
              <main className="main-content">
                <div className="page-content">
                  <h1>Hot Deals</h1>
                  <p>Check out our latest offers</p>
                </div>
              </main>
              <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
          } />
          <Route path="/about" element={
            <div className="app">
              <Header onLoginClick={() => setIsLoginOpen(true)} />
              <main className="main-content">
                <div className="page-content">
                  <h1>About Us</h1>
                  <p>Learn more about ShopHub</p>
                </div>
              </main>
              <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>
          } />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
