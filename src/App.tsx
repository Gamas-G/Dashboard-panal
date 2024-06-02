import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MapaPage } from './pages/MapaPage/MapaPage';
import { DashboardPage } from './pages/DashboardPage/Dashboard';

import { Page404 } from './404';
import './App.css';
import { MapaNew } from './Components/Mapa/MapaNew';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/FrontMonit/map/' element={ <MapaNew />}/>
        {/* <Route path='/FrontMonit/map/' element={<MapaPage />}/> */}
        <Route path='*' element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
