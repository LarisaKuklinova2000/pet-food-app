import { useState } from "react"
import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import moment from "moment/moment";
import { useGetAllProductsQuery } from '../../api/apiSlice'

import Product from "../product/Product"
import './FoodItemList.scss'
import Spinner from "../spinner/Spinner"

const FoodItemList = (props) => {

    const {token} = useSelector(state => state.regInfo)
    const {activeFilter, term} = useSelector(state => state.filters)
    const {
        data: products = [],
        isLoading
    } = useGetAllProductsQuery(token? token: localStorage.getItem('token'));

    const [myId] = useState(localStorage.getItem('id'))

    const raitingCounter = (item) => {
		let raiting = 0;
		raiting = item.reviews.map(item => raiting + item.rating)
		return raiting.length>0? raiting.reduce((a, b) => a + b) / raiting.length: 0
	}

    const filterProducts = (items, filter) => {

        const arrForSort = [...items]

		switch(filter) {
			case 'all':
				return arrForSort.sort((a, b) => moment(a.created_at) - moment(b.created_at))
			case 'new':
				return arrForSort.sort((a, b) => moment(b.created_at) - moment(a.created_at))
			case 'cheapFirst':
				return arrForSort.sort((a, b) => a.price - b.price);
			case 'expensiveFirst':
				return arrForSort.sort((a, b) => b.price - a.price);
			case 'raiting':
				return arrForSort.sort((a, b) => raitingCounter(b) - raitingCounter(a));
			case 'discount':
				return arrForSort.sort((a, b) => b.discount - a.discount);
			default:
				return arrForSort;
		}
	}

    function renderProductItems(arr) {
        let array = arr;
        if (term.length !== 0) {
            array = array.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
        }
        const items = array.map((item) => <Product
                                            key={item._id}
                                            id={item._id} 
                                            discount={item.discount} 
                                            price={item.price} 
                                            pictures={item.pictures}
                                            name={item.name}
                                            description={item.description}
                                            stock={item.stock}
                                            token={token}
                                            userId={myId}
                                            likes={item.likes}/>)
        return items;
    }

    const items = renderProductItems(filterProducts(products, activeFilter))

    const foundResult = (number) => {
        if (number === 1) {
            return 'позиция'
        } else if (number === 2 || number === 3 || number === 4) {
            return 'позиции'
        } else {
            return 'позиций'
        }
    }
    
    return (
        <div className="container__products">
            {!token? <Navigate to='/sign' />: null}
            <div>{term.length > 0 && items.length !== 0 ?`по вашему запросу: "${term}" найдено ${items.length} ${foundResult(items.length)}`: null}</div>
            <div className="products__wrapper">{term.length > 0 && items.length === 0? 'по Вашему запросу ничего не найдено =(': items}</div>
            <div>{isLoading? <Spinner />: null}</div>
        </div>
    )
}

export default FoodItemList