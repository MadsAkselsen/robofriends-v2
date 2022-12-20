import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { requestRobots, setSearchField } from '../actions';

//! gotcha:
// if there is only one reducer added to the store (in index.js),
// the prop is directly on the state (state.searchField).
// If multiple reducers are added to the store, the prop must
// be accessed by specifying which reducer: state.searchRobots.searchField
const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)), // returns an object
		requestRobots: () => dispatch(requestRobots()), // returns a function, which redux-thunk handles
	};
};

function App({
	onSearchChange,
	searchField,
	robots,
	isPending,
	requestRobots,
	error,
}) {
	useEffect(() => {
		console.log('useEffect');
		requestRobots();
	}, [requestRobots]);

	const filteredRobots = robots.filter((robot) => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase());
	});

	return isPending ? (
		<h1>Loading</h1>
	) : (
		<div className="tc">
			<h1 className="f1">RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<CardList robots={filteredRobots} />
			</Scroll>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
