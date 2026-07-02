import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div className="row g-4 align-items-center">
      <div className="col-lg-7">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="lead text-muted">
          A modern multi-tier fitness platform for logging activity, building teams,
          and competing on a live leaderboard.
        </p>
        <div className="d-flex gap-3">
          <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
            Check API
          </a>
          <a className="btn btn-outline-secondary btn-lg" href="http://localhost:5173">
            Open Vite App
          </a>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h2 className="h5">Platform highlights</h2>
            <ul className="list-unstyled mb-0">
              <li>• Activity logging</li>
              <li>• Team management</li>
              <li>• Leaderboard insights</li>
              <li>• Personalized recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Leaderboard() {
  return <div className="card shadow-sm border-0 p-4"><h2 className="h4">Leaderboard</h2><p className="text-muted">Live rankings will appear here as the app grows.</p></div>
}

function Workouts() {
  return <div className="card shadow-sm border-0 p-4"><h2 className="h4">Workouts</h2><p className="text-muted">Workout plans and suggestions will be served from the backend API.</p></div>
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit</span>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
