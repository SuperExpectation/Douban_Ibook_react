import React from 'react';

class CustomMenu extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = { value: '' };
    this.onChange = e => this.setState({ value: e.target.value });
  }

  render() {
    let { className, ...props } = this.props;

    return (
      <div
        className={"dropdown-menu"}
        style={{ padding: ''}}
      >
        
        <ul className="list-unstyled">
          { this.filterChildren() }
        </ul>
      </div>
    );
  }

  filterChildren() {
    let { children } = this.props;
    let { value } = this.state;
    let filtered = [];

    let matches = child => child.props.children.indexOf(value) !== -1;

    React.Children.forEach(children, child => {
      if (!value.trim() || matches(child)) {
        filtered.push(child);
      }
    });

    return filtered;
  }

  focusNext() {
    let input = React.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }
}

export default CustomMenu;