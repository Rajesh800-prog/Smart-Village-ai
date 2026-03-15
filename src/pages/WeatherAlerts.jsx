import { CloudRain, Sun, Wind, CloudLightning } from 'lucide-react';

const WeatherAlerts = () => {
  return (
    <div className="weather-alerts">
      <h2 className="mb-4">Local Weather & Forecast</h2>

      <div className="card text-center mb-4" style={{ backgroundColor: '#e3f2fd', border: '1px solid #bbdefb' }}>
        <h3 className="text-muted">Current Weather in Your Village</h3>
        <div className="flex justify-center items-center gap-4 mt-2">
          <Sun size={64} color="#f57f17" />
          <div>
            <h1 style={{ fontSize: '3rem', margin: 0, color: '#1565c0' }}>28°C</h1>
            <p className="text-muted" style={{ fontSize: '1.2rem', margin: 0 }}>Clear Sky</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <span style={{ backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}>Humidity: 45%</span>
          <span style={{ backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}>Wind: 10 km/h</span>
        </div>
      </div>

      <h3 className="mb-2">Important Alerts</h3>
      <div className="card mb-4" style={{ backgroundColor: '#ffebee', borderLeft: '4px solid var(--danger)' }}>
        <div className="flex items-center gap-2 text-danger mb-2">
          <CloudLightning size={24} />
          <h4 style={{ margin: 0 }}>Heavy Rainfall Expected</h4>
        </div>
        <p>A severe thunderstorm is expected tomorrow evening. Please assure that your harvested crops are properly covered and sheltered.</p>
        <p className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>Issued: 2 hours ago</p>
      </div>

      <h3 className="mb-2">7-Day Forecast</h3>
      <div className="grid grid-4 text-center">
        <div className="card">
          <h4>Mon</h4>
          <Sun size={32} color="#fbc02d" style={{ margin: '1rem auto' }} />
          <p>30°C / 20°C</p>
        </div>
        <div className="card">
          <h4>Tue</h4>
          <CloudLightning size={32} color="#1565c0" style={{ margin: '1rem auto' }} />
          <p className="text-danger font-bold">25°C / 18°C</p>
        </div>
        <div className="card">
          <h4>Wed</h4>
          <CloudRain size={32} color="#4fc3f7" style={{ margin: '1rem auto' }} />
          <p>26°C / 19°C</p>
        </div>
        <div className="card">
          <h4>Thu</h4>
          <Wind size={32} color="#78909c" style={{ margin: '1rem auto' }} />
          <p>28°C / 21°C</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;
