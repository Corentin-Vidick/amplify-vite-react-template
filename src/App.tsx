// App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import HomePage from './pages/HomePage';
import ViewStock from './pages/ViewStock';

function App() {
  const { signOut } = useAuthenticator();

  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyle: 'none', padding: '1rem' }}>
            <li style={{ display: 'inline', marginRight: '1rem' }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ display: 'inline', marginRight: '1rem' }}>
              <Link to="/stock">View Stock</Link>
            </li>
            <li style={{ display: 'inline' }}>
              <button onClick={signOut}>Sign out</button>
            </li>
          </ul>
        </nav>

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stock" element={<ViewStock />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
