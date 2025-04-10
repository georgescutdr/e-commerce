import React, { useState, useLayoutEffect, Component } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'
import Axios from 'axios'
import { Sidebar } from './sidebar'
import { Button } from 'primereact/button'
import { randomKey } from '../../utils'

import { adminCategories, config } from '../../admin/config.js'

export const ShopNavbar = () => {
  const serverUrl = 'http://localhost:3001'
  const getMenuUrl = serverUrl + '/api/get-menu'
  const getCategoriesUrl = serverUrl + '/api/get-categories'
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([])
  const [categoriesList, setCategoriesList] = useState([])

  const categoriesItems = categoriesList.map(category => (
    <NavDropdown.Item key={ category.id } href={`/${category.slug}/pd/${category.id}/?type=category`}>
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
        <Button type="button" label="Cart" onClick={() => navigate('/shopping-cart')} icon="pi pi-shopping-cart" outlined badge="2" badgeClassName="p-badge-danger" />
      </Container>
    </Navbar>
    </>
  )
}

export const AdminNavbar = () => {
  return (
    <Navbar expand="lg" className="admin-navbar">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {config.dashboard.active && (
              <Nav.Link  to="/admin/dashboard">
                Dashboard
              </Nav.Link>
          )}
          {adminCategories?.map((category) => (
            <>
            <NavDropdown title={category.label} id={category.name} key={category.name}>
              {config.items?.map((item, i) => {
                if (category.name === item.category) {
                  return (
                    <NavDropdown.Item
                      key={item.type + i}
                      href={'/admin/' + item.type}
                    >
                      {item.title}
                    </NavDropdown.Item>
                  );
                }
                return null; // Ensure we return null if no match
              })}
            </NavDropdown>
            </>
          ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  
  )
}


    