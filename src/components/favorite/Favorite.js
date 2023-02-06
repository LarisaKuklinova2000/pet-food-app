import { useState } from "react"
import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import { useGetAllProductsQuery } from '../../api/apiSlice'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Product from "../product/Product"
import Spinner from "../spinner/Spinner"
import './favorite.scss'

const Favorite = () => {

    const {favoriteItems} = useSelector(state => state.favorite)
    const {token} = useSelector(state => state.regInfo)
    const {
        data: products = [],
        isLoading
    } = useGetAllProductsQuery(token? token: localStorage.getItem('token'));

    const [myId] = useState(localStorage.getItem('id'))

    const items = products.filter(item => favoriteItems.includes(item._id)).map(item => {
        
        const {_id, discount, price, pictures, name, description, stock, likes} = item

        return <CSSTransition
                key={_id}
                timeout={300}
                classNames="item">
                    <Product 
                        key={_id}
                        id={_id} 
                        discount={discount} 
                        price={price} 
                        pictures={pictures}
                        name={name}
                        description={description}
                        stock={stock}
                        token={token}
                        userId={myId}
                        likes={likes}
                    />
                </CSSTransition>

    })
    
    return (
        <div className="container">
            {!token? <Navigate to='/sign' />: null}
            <TransitionGroup className="favorite-products__wrapper">
                {
                    favoriteItems.length === 0?
                    <CSSTransition key={'123'} timeout={300} classNames="item" unmountOnExit>
                        <div className="favorite-empty">список избранного пуст</div>
                    </CSSTransition>:
                    items
                }
            </TransitionGroup>
            <div>{isLoading? <Spinner />: null}</div>
        </div>
    )
}

export default Favorite