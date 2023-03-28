import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("/api/openai", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => this.setState({ response: data.message }))
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <div>
	<h1>OpenAI Demo</h1>
	<form onSubmit={this.handleSubmit}>
		<label htmlFor="text-input">Enter a prompt:</label>
		<br />
		<textarea name="text-input" id="text-input" cols="30" rows="10"></textarea>
		<br />
		<button type="submit">Submit</button>
	</form>
	{this.state.response && <p>{this.state.response}</p>}
      </div>
    );
  }
}

export default Form;

