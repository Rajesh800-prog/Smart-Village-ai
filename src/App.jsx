import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import WeatherAlerts from './pages/WeatherAlerts';
import CropRecommendation from './pages/CropRecommendation';
import Marketplace from './pages/Marketplace';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="weather" element={<WeatherAlerts />} />
          <Route path="recommendation" element={<CropRecommendation />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
