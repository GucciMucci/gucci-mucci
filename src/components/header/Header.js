import React, { Component } from 'react'
import './header.scss'


export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <span>GUCCI</span>
        <span className="bag-link">👜</span>
      </div>
    )
  }
}
