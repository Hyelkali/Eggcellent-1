import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import AuthForm from './AuthForm'
import Dashboard from './Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App