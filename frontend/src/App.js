import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar
            style={{ backgroundColor: '#801001', height: '150px' }}
            variant="dark"
            className="custom-navbar"
          >
            <Container>
              <Link to="/" className="navbar-brand logo-container">
                <img src="/images/top_logo.png" alt="Logo" height="100" />
              </Link>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-5">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
