import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './NavMenu.css'

export default class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Item header>React</Menu.Item>
        <Menu.Item inverted
          as={NavLink} to="/customer"
          name='Customer'
          active={activeItem === 'customer'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/product"
          name='Product'
          active={activeItem === 'product'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/store"
          name='Store'
          active={activeItem === 'store'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink} to="/sale"
          name='Sales'
          active={activeItem === 'sale'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}