import React , {Component} from 'react';

export default class MessageForm extends Component {
   
    render() {
      return (
        <form onSubmit={this.props.submit}>
          <label>
            Message:
          </label>
          <textarea rows="5" cols="30" type="text" value={this.props.value} onChange={this.props.onChange} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }