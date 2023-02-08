import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { changeToken, changeMyInfo } from "../signUp/signSlice";

import AppHeader from '../appHeader/AppHeader'
import FoodItemList from '../foodItemList/FoodItemList'
import FilterPanel from "../filterPanel/FilterPanel"
import SignUp from "../signUp/SignUp"
import SignIn from "../signUp/SignIn";
import SingleProductPage from '../singleProductPage/SingleProductPage'
import AboutMe from "../aboutMe/AboutMe"
import Basket from '../basket/Basket'
import Favorite from "../favorite/Favorite"
import CreateProductModal from "../addProductForm/CreateProductModal";

const App = () => {


	const [myName, setMyName] = useState(localStorage.getItem('myName'));

	const dispatch = useDispatch()
	const {token, myInfo} = useSelector(state => state.regInfo)
	useEffect(() => {
		if (!token && !myInfo) {
			dispatch(changeToken(localStorage.getItem('token')))
			dispatch(changeMyInfo(JSON.parse(localStorage.getItem('myInfo'))))
		}
	}, [])

	const onUpdateMyName = (myName) => {
		localStorage.setItem('myName', myName)
		setMyName(myName)
	}

	return (
		<Router>
			<div className="app">
			<AppHeader 
				myName={myName}/>
			<CreateProductModal />
				<main>
					<Routes>
						<Route path='/' element={token? <Navigate to='/catalog' />: <Navigate to='/sign' />}/>
						<Route path='/sign' element={<SignUp onUpdateMyName={onUpdateMyName}/>} />
						<Route path='/signin' element={<SignIn />} />
						<Route path='/catalog' element={
													<>
														<FilterPanel />
														<FoodItemList />
													</>
												} />
						<Route path='/catalog/:productId' element={<SingleProductPage/>} />
						<Route path='/me' element={<AboutMe/>} />
						<Route path='/basket' element={<Basket/>} />
						<Route path='/favorite' element={<Favorite/>} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
