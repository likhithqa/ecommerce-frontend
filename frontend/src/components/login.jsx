import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import { useUser } from '../contexts/UserContext'

const Login = ({ isOpen, onClose }) => {
  const { login } = useUser()
  const navigate = useNavigate()
  const [step, setStep] = useState('credentials') // 'credentials' or 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRegistration, setShowRegistration] = useState(false)
  const [fullName, setFullName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [regOtp, setRegOtp] = useState(['', '', '', ''])
  const [regError, setRegError] = useState('')
  const [regLoading, setRegLoading] = useState(false)
  const [showRegOtp, setShowRegOtp] = useState(false)
  const [currentOtp, setCurrentOtp] = useState('') // Store generated OTP
  const otpRefs = useRef([])

  useEffect(() => {
    if (step === 'otp' && otpRefs.current[0]) {
      otpRefs.current[0].focus()
    }
  }, [step])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  
  const validateCredentials = () => {
    if (!email.trim()) {
      setError('Please enter your email')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleLogin = async () => {
    if (!validateCredentials()) return

    setLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/send-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setCurrentOtp(data.otp_code) // Store OTP from backend
        setStep('otp')
        setError('')
        console.log('OTP sent to email:', email)
        console.log('Test OTP from backend:', data.otp_code)
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleRegOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newRegOtp = [...regOtp]
    newRegOtp[index] = value.slice(-1)
    setRegOtp(newRegOtp)

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleRegOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !regOtp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('')
    if (otpCode.length !== 4) {
      setError('Please enter all 4 digits')
      return
    }

    setLoading(true)
    try {
      // For testing, verify against the stored OTP
      if (otpCode === currentOtp) {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp_code: otpCode
          })
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setError('')
          console.log('Login successful:', data)
          // Store user data in context
          login(data.user)
          
          // Store user role in localStorage for role-based access
          localStorage.setItem('userRole', data.user.role)
          localStorage.setItem('userToken', 'dummy-token') // You can store actual token here
          
          onClose()
          // Reset form
          setStep('credentials')
          setEmail('')
          setOtp(['', '', '', ''])
          setCurrentOtp('')
          
          // Role-based redirection
          if (data.user.role === 'admin' || data.user.role === 'manager') {
            navigate('/admin/dashboard')
          } else {
            // For team_member and client users, redirect to landing page
            navigate('/client/landing')
          }
        } else {
          setError(data.message || 'Login failed. Please try again.')
          if (data.errors) {
            console.log('Login errors:', data.errors)
          }
        }
      } else {
        setError('Invalid OTP. Please try again.')
        console.log('Expected OTP:', currentOtp, 'Got:', otpCode)
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('OTP verification error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    setStep('credentials')
    setOtp(['', '', '', ''])
    setCurrentOtp('')
    setError('')
  }

  const validateRegistrationFields = () => {
    if (!fullName.trim()) {
      setRegError('Please enter your full name')
      return false
    }

    if (!regEmail.trim()) {
      setRegError('Please enter your email')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(regEmail)) {
      setRegError('Please enter a valid email address with @ symbol')
      return false
    }

    if (!phone.trim()) {
      setRegError('Please enter your phone number')
      return false
    }

    if (phone.length !== 10) {
      setRegError('Phone number must be exactly 10 digits')
      return false
    }

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone)) {
      setRegError('Phone number must contain only digits and be exactly 10 digits')
      return false
    }

    return true
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value)
      setRegError('')
    }
  }

  const handleRegEmailChange = (e) => {
    setRegEmail(e.target.value)
    setRegError('')
  }

  const validateOtp = () => {
    const otpCode = regOtp.join('')
    if (otpCode.length !== 4) {
      setRegError('Please enter all 4 digits')
      return false
    }

    return true
  }

  const handleRegister = async () => {
    if (!showRegOtp) {
      // First step: validate fields and call registration API with generated OTP
      if (!validateRegistrationFields()) return

      setRegLoading(true)
      try {
        // Generate a random 4-digit OTP
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString()
        console.log('Generated OTP for testing:', generatedOtp)

        const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: fullName,
            email: regEmail,
            phone: phone,
            otp_code: generatedOtp
          })
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setRegError('')
          setShowRegOtp(true)
          console.log('Registration initiated:', data)
          console.log('Use this OTP for verification:', generatedOtp)
        } else {
          setRegError(data.message || 'Registration failed. Please try again.')
          if (data.errors) {
            console.log('Validation errors:', data.errors)
          }
        }
      } catch (err) {
        setRegError('Network error. Please check your connection and try again.')
        console.error('Registration error:', err)
      } finally {
        setRegLoading(false)
      }
    } else {
      // Second step: validate OTP and complete registration
      if (!validateOtp()) return

      setRegLoading(true)
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: fullName,
            email: regEmail,
            phone: phone,
            otp_code: regOtp.join('')
          })
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setRegError('')
          console.log('Registration successful:', data)
          // Store user data in context
          login(data.user)
          
          // Store user role in localStorage for role-based access
          localStorage.setItem('userRole', data.user.role)
          localStorage.setItem('userToken', 'dummy-token') // You can store actual token here
          
          // Reset registration form
          setShowRegistration(false)
          setShowRegOtp(false)
          setFullName('')
          setRegEmail('')
          setPhone('')
          setRegOtp(['', '', '', ''])
          // Optionally close the modal
          onClose()
          
          // Role-based redirection
          if (data.user.role === 'admin' || data.user.role === 'manager') {
            navigate('/admin/dashboard')
          } else {
            // For team_member and client users, redirect to landing page
            navigate('/client/landing')
          }
        } else {
          setRegError(data.message || 'Invalid OTP. Please try again.')
        }
      } catch (err) {
        setRegError('Network error. Please check your connection and try again.')
        console.error('OTP verification error:', err)
      } finally {
        setRegLoading(false)
      }
    }
  }

  const handleSignupClick = () => {
    setShowRegistration(true)
    setRegError('')
  }

  const handleBackToLoginFromReg = () => {
    setShowRegistration(false)
    setShowRegOtp(false)
    setFullName('')
    setRegEmail('')
    setPhone('')
    setRegOtp(['', '', '', ''])
    setRegError('')
  }

  if (!isOpen) return null

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={`login-content ${showRegistration ? 'show-registration' : ''}`}>
          <div className="login-left">
            <div className="login-form-wrapper">
              {step === 'credentials' ? (
                <>
                  <h2 className="login-title">Login</h2>

                  <div className="form-group">
                    <label>Email or Username</label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className={error && !email ? 'error' : ''}
                      />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                  </div>

                

                  {error && <span className="error-message">{error}</span>}

                  <button
                    className="login-btn"
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>

                  <p className="login-footer">
                    Don't have an account? <button className="signup-link" onClick={handleSignupClick}>Sign up</button>
                  </p>
                </>
              ) : (
                <>
                  <button className="back-btn" onClick={handleBackToLogin}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </button>

                  <h2 className="login-title">Enter OTP</h2>
                  <p className="otp-subtitle">We've sent a 4-digit code to {email}</p>

                  <div className="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="otp-input"
                        inputMode="numeric"
                      />
                    ))}
                  </div>

                  {error && <span className="error-message">{error}</span>}

                  <button
                    className="login-btn"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>

                  <p className="resend-text">
                    Didn't receive the code? <a href="#resend">Resend OTP</a>
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="login-right">
            <div className="welcome-content">
              <h3>WELCOME BACK!</h3>
              <p>Login to your account and continue shopping</p>
            </div>
            
            <div className={`registration-form ${showRegistration ? 'show' : ''}`}>
              <div className="registration-wrapper">
                <h2 className="login-title">Register</h2>

                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={regError && !fullName ? 'error' : ''}
                    />
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={regEmail}
                      onChange={handleRegEmailChange}
                      className={regError && !regEmail ? 'error' : ''}
                    />
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength="10"
                      inputMode="numeric"
                      className={regError && !phone ? 'error' : ''}
                    />
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                </div>

                {showRegOtp && (
                  <div className="form-group">
                    <label>OTP Code</label>
                    <div className="reg-otp-container">
                      {regOtp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleRegOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleRegOtpKeyDown(index, e)}
                          className="reg-otp-input"
                          inputMode="numeric"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {regError && <span className="error-message">{regError}</span>}

                <button
                  className="login-btn"
                  onClick={handleRegister}
                  disabled={regLoading}
                >
                  {regLoading ? (
                    <>
                      <span className="spinner"></span>
                      {showRegOtp ? 'Verifying...' : 'Sending OTP...'}
                    </>
                  ) : (
                    showRegOtp ? 'Verify & Register' : 'Register'
                  )}
                </button>

                <p className="login-footer">
                  Already have an account? <button className="signup-link" onClick={handleBackToLoginFromReg}>Login</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
