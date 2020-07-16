import React, { Component } from "react";
import "./city-searcher.css";

class CitySearcher extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	componentDidMount() {
		const endpoint =
			"https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

		let search = document.querySelector(".search");
		search.addEventListener("input", this.display_match);

		fetch(endpoint)
			.then((res) => res.json())
			.then((json) => this.setState({ data: [...json] }))
			.catch((err) => "This failed");
	};

	filter_city = (cities, word_to_search) => {
		let regex = new RegExp(word_to_search, "gi");
		return cities.filter(
			(location) =>
				location.city.match(regex) || location.state.match(regex)
		);
	};

	display_match = (e) => {
		let ul = document.querySelector("ul");
		let filtered = this.filter_city(this.state.data, e.target.value);
		let defaultHTML = `				
		<ul class="suggestions">
		<li>Filter for a city</li>
		<li>or a state</li>
		</ul>
		`;

		if (e.target.value === "") return (ul.innerHTML = defaultHTML);

		let html = filtered
			.map((location) => {
				let regex = new RegExp(e.target.value, "gi");

				let city_name = location.city.replace(
					regex,
					`<span class="hl">${e.target.value}</span>`
				);

				let state_name = location.city.replace(
					regex,
					`<span class="hl">${e.target.value}</span>`
				);

				return `
                    <li>
					<span>${city_name}, ${state_name}</span>
					<span>${location.population}</span>
					</li>
					`;
			})
			.join("");

		ul.innerHTML = html;
	};

	render() {
		return (
			<form class="search-form">
				<input type="text" class="search" placeholder="City or State" />
				<ul class="suggestions">
					<li>Filter for a city</li>
					<li>or a state</li>
				</ul>
			</form>
		);
	}
}

export default CitySearcher;
