import React, { Component } from "react";
import { Link } from "react-router-dom";

class Bottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: this.props.cat,
      subCat: this.props.subCat
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        cat: this.props.cat,
        subCat: this.props.subCat
      });
    }
  }
  render() {
    return (
      <div
        className="bottom"
        onMouseEnter={() => {
          this.props.clear();
        }}
        onMouseLeave={() => {
          this.props.hide();
        }}>
        {this.state.subCat.map(subCat => {
          return (
            <Link
              key={subCat}
              to={`/${this.props.cat}/${subCat}`}
              onMouseEnter={() => {
                this.props.clear();
              }}>
              {subCat}
            </Link>
          );
        })}
      </div>
    );
  }
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      cat: "",
      subCat: []
    };
    this.categories = {
      women: ["dresses", "coats"],
      men: ["sneakers", "bags"]
    };
  }

  clear = () => {
    this.state.timeout && clearTimeout(this.state.timeout);
  };

  showBottom = (cat, subCat) => {
    this.setState({
      show: true,
      cat,
      subCat
    });
    this.clear();
  };

  hide = () => {
    this.setState({ show: false });
  };

  hideBottom = () => {
    let timeout = setTimeout(() => {
      this.setState({ show: false });
    }, 500);
    this.setState({
      timeout
    });
  };

  render() {
    return (
      <nav className="middle">
        <a
          href="#"
          onMouseEnter={e => {
            this.showBottom("women", this.categories.women);
          }}
          onMouseLeave={() => {
            this.hideBottom();
          }}>
          WOMEN
        </a>
        <a
          href="#"
          onMouseEnter={e => {
            this.showBottom("men", this.categories.men);
          }}
          onMouseLeave={() => {
            this.hideBottom();
          }}>
          MEN
        </a>
        {this.state.show && (
          <Bottom cat={this.state.cat} subCat={this.state.subCat} clear={this.clear} hide={this.hide} />
        )}
      </nav>
    );
  }
}

export default Nav;
