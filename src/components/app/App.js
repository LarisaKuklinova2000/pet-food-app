import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import moment from "moment/moment";
import AppHeader from '../appHeader/AppHeader';
import FoodItemList from '../foodItemList/FoodItemList';
import FilterPanel from "../filterPanel/FilterPanel";
import SignUp from "../signUp/SignUp";
import SingleProductPage from '../singleProductPage/SingleProductPage';
import AboutMe from "../aboutMe/AboutMe";

const App = () => {
	const [term, setTerm] = useState('');
	const [filter, setFilter] = useState('all');
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [myName, setMyName] = useState(localStorage.getItem('myName'));
	const [favorite, setFavorite] = useState(0)
	const raitingCounter = (item) => {
		let raiting = 0;
		raiting = item.reviews.map(item => raiting + item.rating)
		return raiting.length>0? raiting.reduce((a, b) => a + b) / raiting.length: 0
	}
	const filterProducts = (items, filter) => {
		switch(filter) {
			case 'all':
				return items.sort((a, b) => moment(a.created_at) - moment(b.created_at))
			case 'new':
				return items.sort((a, b) => moment(b.created_at) - moment(a.created_at))
			case 'cheapFirst':
				return items.sort((a, b) => a.price - b.price);
			case 'expensiveFirst':
				return items.sort((a, b) => b.price - a.price);
			case 'raiting':
				return items.sort((a, b) => raitingCounter(b) - raitingCounter(a));
			case 'discount':
				return items.sort((a, b) => b.discount - a.discount);
			default:
				return items;
		}
	}
	const onUpdateFavorite = (favorite) => {
		setFavorite(favorite)
	}
	const onUpdateMyName = (myName) => {
		localStorage.setItem('myName', myName)
		setMyName(myName)
	}
	const onUpdateToken = (token) => {
		if (token !== undefined) {
			localStorage.setItem('token', token)
			setToken(token)
		}
	}
	const onFilterSelect = (filter) => {
		setFilter(filter);
	}
	const onUpdateSearch = (term) => {
		setTerm(term);
	}
	const toSign = () => {
		if (token) {
			return <Navigate to='/catalog' />
		} else if(!token) {
			return <Navigate to='/' />
		}
	}
	return (
		<Router>
			<div className="app">
			<AppHeader 
				onUpdateSearch={onUpdateSearch}
				favorite={favorite}
				token={token}
				myName={myName}/>
				<main>
					<Routes>
						<Route path='/' element={token? <Navigate to='/catalog' />: <Navigate to='/sign' />}/>
						<Route path='/sign' element={<SignUp onUpdateToken={onUpdateToken} onUpdateMyName={onUpdateMyName}/>} />
						<Route path='/catalog' element={
													<>
														<FilterPanel 
															filter={filter} 
															onFilterSelect={onFilterSelect}
															onUpdateSearch={onUpdateSearch}
															favorite={favorite}/>
														<FoodItemList
															term={term} 
															filter={filter} 
															filterProducts={filterProducts} 
															raitingCounter={raitingCounter}
															token={token}
															onUpdateFavorite={onUpdateFavorite}
															favorite={favorite}
															toSign={toSign}/>
													</>
												} />
						<Route path='/catalog/:productId' element={<SingleProductPage token={token} raitingCounter={raitingCounter}/>}/>
						<Route path='/me' element={<AboutMe token={token}/>} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
