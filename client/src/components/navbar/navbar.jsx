import React, { useState, useLayoutEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'
import Axios from 'axios'
import { Sidebar } from './sidebar'
import { Button } from 'primereact/button'

export const ShopNavbar = () => {
  const serverUrl = 'http://localhost:3001'
  const getMenuUrl = serverUrl + '/api/get-menu'
  const getCategoriesUrl = serverUrl + '/api/get-categories'


  const [menuItems, setMenuItems] = useState([])
  const [categoriesList, setCategoriesList] = useState([])

  const categoriesItems = categoriesList.map(category => (
    <NavDropdown.Item key={ category.id } href={"/browse/" + category.slug}>
      { category.name }
    </NavDropdown.Item>
  ))

  //get categories
  useLayoutEffect(() => {
        Axios.get(getCategoriesUrl, {params: {type: 'parents'}}).then((result) => {
            setCategoriesList(result.data)
        })
  }, [])

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary navbar-fixed-top">
      <Container>
        <Navbar.Brand href="#home">Virtual Shop</Navbar.Brand>
        <Sidebar />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              { categoriesItems }
            </NavDropdown>
            <Nav.Link href="#home">Brands</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button type="button" label="Cart" icon="pi pi-shopping-cart" outlined badge="2" badgeClassName="p-badge-danger" />
      </Container>
    </Navbar>
    </>
  )
}

export const AdminNavbar = () => {
  return (
    <Navbar className="bg-body-tertiary navbar-fixed-top">
      <Container>
        <Navbar.Brand href="#home">Administration Panel</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/admin/categories"> Categories </Nav.Link>
          <Nav.Link href="/admin/product-options"> Product Options </Nav.Link>
          <Nav.Link href="/admin/brands"> Brands </Nav.Link>
          <Nav.Link href="/admin/products"> Products </Nav.Link>
          <Nav.Link href="/admin/promotions"> Promotions </Nav.Link>
          <Nav.Link href="/admin/vouchers"> Vouchers </Nav.Link>
          <Nav.Link href="/admin/orders"> Orders </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
