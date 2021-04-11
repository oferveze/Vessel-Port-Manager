import './App.css';
import Layout from './components/Layout/Layout.js'

import VesselProvider from './contexts/VesselContext';

function App() {
  return (
    <VesselProvider>
      <Layout />
    </VesselProvider>
  );
}

export default App;