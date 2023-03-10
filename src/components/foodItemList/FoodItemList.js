import { useState } from "react"
import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import moment from "moment/moment";
import { useGetAllProductsQuery } from '../../api/apiSlice'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Product from "../product/Product"
import './FoodItemList.scss'
import Spinner from "../spinner/Spinner"

const FoodItemList = () => {

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
        const items = array.map((item) => <CSSTransition
                                            key={item._id}
                                            timeout={300}
                                            classNames="item"
                                            unmountOnExit
                                            ><Product
                                                key={item._id}
                                                authorId={item.author._id}
                                                id={item._id} 
                                                discount={item.discount} 
                                                price={item.price} 
                                                pictures={item.pictures}
                                                name={item.name}
                                                description={item.description}
                                                stock={item.stock}
                                                token={token}
                                                userId={myId}
                                                likes={item.likes}/>
                                        </CSSTransition>)
        return items;
    }

    const items = renderProductItems(filterProducts(products, activeFilter))

    const foundResult = (number) => {
        if (number === 1) {
            return '??????????????'
        } else if (number === 2 || number === 3 || number === 4) {
            return '??????????????'
        } else {
            return '??????????????'
        }
    }
    
    return (
        <div className="container__products">
            {!token? <Navigate to='/sign' />: null}
            <div>{term.length > 0 && items.length !== 0 ?`???? ???????????? ??????????????: "${term}" ?????????????? ${items.length} ${foundResult(items.length)}`: null}</div>
            <TransitionGroup className="products__wrapper">
                {
                    items.length === 0 && term.length !== 0 ?
                    <CSSTransition key={'12345'} unmountOnExit timeout={300}>
                        <div>???? ???????????? ?????????????? ???????????? ???? ??????????????</div>
                    </CSSTransition>:
                    items
                }
            </TransitionGroup>
            <div>{isLoading? <Spinner />: null}</div>
        </div>
    )
}

export default FoodItemList