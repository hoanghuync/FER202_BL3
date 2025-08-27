import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="container py-5" style={{ maxWidth: 1200 }}>
        <div className="rounded shadow-lg p-4 bg-white">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App