import React, { useState } from "react";

function Form() {
	const [queryResult, setQueryResult] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const query = formData.get('query');
		fetch(`/submit?query=${query}`)
			.then((response) => response.json())
			.then((data) => setQueryResult(data.result))
			.catch((error) => console.log(error));
	};

	return (
	      		<div>
				<h1>OpenAI Demo</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor="query">Enter a prompt:</label>
					<input type="text" name="query" id="query" />
					<button type="submit">Submit</button>
				</form>
				{queryResult && <p>{queryResult}</p>}
			</div>
	);
}

export default Form;

