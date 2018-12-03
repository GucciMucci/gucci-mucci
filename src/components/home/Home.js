import React, { Component } from 'react'
import './home.scss';
import firebase from '../firebase'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      currentItem: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  render() {
    return (
      <div>
        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
            <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
            <button>Add Item</button>
          </form>
        </section>
      </div>
    )
  }
}
