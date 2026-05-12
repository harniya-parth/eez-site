import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/home';

function App() {
  return (
    <HelmetProvider>
      <Home />
    </HelmetProvider>
  );
}

export default App;