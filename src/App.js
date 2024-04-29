import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tintuc from './View/Tintuc';
import TinTucView from './View/TinTucView';
import AdminNews from './View/AdminNews';

function App() {
  return (
    <BrowserRouter> {/* Bao bọc toàn bộ ứng dụng trong BrowserRouter */}
      <div className="App">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/trangchu">Web xem tin tức</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/trangchu">Trang chủ</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Tintuc />} />
            <Route path="trangchu" element={<Tintuc />} />
            <Route path="tintuc/:id" element={<TinTucView />} />
            <Route path="admin" element={<AdminNews />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
