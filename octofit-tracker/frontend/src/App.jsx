import { Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking application.</p>
      <div className="list-group mt-4">
        <Link to="/users" className="list-group-item list-group-item-action">Users</Link>
        <Link to="/teams" className="list-group-item list-group-item-action">Teams</Link>
        <Link to="/activities" className="list-group-item list-group-item-action">Activities</Link>
        <Link to="/workouts" className="list-group-item list-group-item-action">Workouts</Link>
        <Link to="/leaderboard" className="list-group-item list-group-item-action">Leaderboard</Link>
      </div>
    </div>
  );
}

export default function App({ apiBase }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
        </Routes>
      </div>
    </div>
  );
}
