import React from "react";
import { Helmet } from "react-helmet";
import logo from "./logo.svg";
import "./App.css";
import CitySearcher from "./components/city-searcher/city-searcher";

function App() {
	return (
		<div className="App">
			<Helmet>
				<meta charSet="utf-8" />
				<title>City Searcher - US</title>
				<link rel="canonical" href="../icons/search.png" />
			</Helmet>
			<CitySearcher />
		</div>
	);
}

export default App;
