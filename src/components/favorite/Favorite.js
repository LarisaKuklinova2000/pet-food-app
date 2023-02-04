import { useState } from "react"
import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import { useGetAllProductsQuery } from '../../api/apiSlice'

import Product from "../product/Product"
import Spinner from "../spinner/Spinner"

const Favorite = (props) => {

    const {favoriteItems} = useSelector(state => state.favorite)
    const {token} = useSelector(state => state.regInfo)
    const {
        data: products = [],
        isLoading
    } = useGetAllProductsQuery(token? token: localStorage.getItem('token'));

    const [myId] = useState(localStorage.getItem('id'))

    const items = products.filter(item => favoriteItems.includes(item._id)).map(item => {
        
        const {_id, discount, price, pictures, name, description, stock, likes} = item

        return <Product 
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

    })
    
    return (
        <div className="container">
            {!token? <Navigate to='/sign' />: null}
            <div className="products__wrapper">{favoriteItems.length === 0? 'у вас нет избранного': items}</div>
            <div>{isLoading? <Spinner />: null}</div>
        </div>
    )
}

export default Favorite