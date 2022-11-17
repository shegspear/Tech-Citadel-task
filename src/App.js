import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import SignInPage from './Pages/SignIn';
import DashboardPage from './Pages/Dashboard';
import AuxPage from './Pages/AuxPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/aux-page/:id' element={<AuxPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/' element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
