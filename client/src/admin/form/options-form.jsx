import { React } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'

export const Menu = () => {
  return (
    <Navbar fixed="top" bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#home">Administration Panel</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/admin/categories"> Categories </Nav.Link>
          <Nav.Link href="/admin/subcategories"> Subcategories </Nav.Link>
          <Nav.Link href="/admin/brands"> Brands </Nav.Link>
          <Nav.Link href="/admin/products"> Products </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

