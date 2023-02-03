import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { changeToken, changeMyInfo } from "../signUp/signSlice";

import AppHeader from '../appHeader/AppHeader';
import FoodItemList from '../foodItemList/FoodItemList';
import FilterPanel from "../filterPanel/FilterPanel";
import SignUp from "../signUp/SignUp";
import SingleProductPage from '../singleProductPage/SingleProductPage';
import AboutMe from "../aboutMe/AboutMe";

const App = () => {


	const [myName, setMyName] = useState(localStorage.getItem('myName'));
	const [favorite, setFavorite] = useState(0)

	const dispatch = useDispatch()
	const {token, myInfo} = useSelector(state => state.regInfo)
	useEffect(() => {
		if (!token && !myInfo) {
			dispatch(changeToken(localStorage.getItem('token')))
			dispatch(changeMyInfo(JSON.parse(localStorage.getItem('myInfo'))))
		}
	}, [])

	const onUpdateFavorite = (favorite) => {
		setFavorite(favorite)
	}
	const onUpdateMyName = (myName) => {
		localStorage.setItem('myName', myName)
		setMyName(myName)
	}

	return (
		<Router>
			<div className="app">
			<AppHeader 
				favorite={favorite}
				myName={myName}/>
				<main>
					<Routes>
						<Route path='/' element={token? <Navigate to='/catalog' />: <Navigate to='/sign' />}/>
						<Route path='/sign' element={<SignUp onUpdateMyName={onUpdateMyName}/>} />
						<Route path='/catalog' element={
													<>
														<FilterPanel 
															favorite={favorite}/>
														<FoodItemList
															onUpdateFavorite={onUpdateFavorite}
															favorite={favorite} />
													</>
												} />
						<Route path='/catalog/:productId' element={<SingleProductPage/>}/>
						<Route path='/me' element={<AboutMe/>} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
