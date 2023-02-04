import { useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import BasketItem from "../basketItem/BasketItem"

import './Basket.scss'

const Basket = () => {

    const {basketItems} = useSelector(state => state.basket)

    const basketItemsList = basketItems.map(item => {

        const {id, name, discount, price, stock, pictures, description, amount} = item

        return <BasketItem 
            key={id}
            id={id}
            name={name}
            discount={discount}
            price={price}
            stock={stock}
            pictures={pictures}
            description={description}
            amount={amount}
            />
    })

    return (
        <div className="container">
            {!localStorage.getItem('token')? <Navigate to='/sign' />: null}
            <div className="basket__wrapper">
                {
                    !basketItems.length?
                    <p>Ваша корзина пуста, вернуться <Link to='/catalog'>обратно в каталог?</Link></p>:
                    basketItemsList  
                }
            </div>
            {
                basketItems.length?
                <div className='total'>общая цена заказа {basketItems.reduce((a, b) => a + (b.amount * b.price), 0)}</div>:
                null
            }
        </div>
    )
}

export default Basket