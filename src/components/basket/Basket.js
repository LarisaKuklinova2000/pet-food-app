import { Link, Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import BasketItem from "../basketItem/BasketItem"
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './Basket.scss'

const Basket = () => {

    const {basketItems} = useSelector(state => state.basket)

    const basketItemsList = basketItems.map(item => {

        const {id, name, discount, price, stock, pictures, description, amount, checked} = item

        return (
            <CSSTransition
                key={id}
                timeout={300}
                classNames="item">
                    <BasketItem 
                        key={id}
                        id={id}
                        name={name}
                        discount={discount}
                        price={price}
                        stock={stock}
                        pictures={pictures}
                        description={description}
                        amount={amount}
                        checked={checked}
                        />
                </CSSTransition>
        )
    })

    return (
        <div className="container">
            {!localStorage.getItem('token')? <Navigate to='/sign' />: null}
            <TransitionGroup className="basket__wrapper">
                {
                    !basketItems.length?
                    <CSSTransition key={'321'} timeout={300} classNames="item"><p>Ваша корзина пуста, вернуться <Link to='/catalog'>обратно в каталог?</Link></p></CSSTransition>:
                    basketItemsList  
                }
            </TransitionGroup>
            {
                basketItems.length?
                <div className='total'>
                    общая цена заказа {basketItems.filter(item => item.checked).reduce((a, b) => a + (b.amount * b.price), 0)}{' '}р.,{' '}
                    всего {basketItems.filter(item => item.checked).reduce((a, b) => a + b.amount, 0)}{' '}шт.</div>:
                null
            }
        </div>
    )
}

export default Basket