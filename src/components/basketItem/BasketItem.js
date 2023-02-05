import { useDispatch } from "react-redux"
import { incAmount, decAmount, changeChecked } from "../basket/basketSlice"
import {deleteProductFromBasket} from "../basket/basketSlice"
import './basketItem.scss'

const BasketItem = (props) => {

    const dispatch = useDispatch()

    const {id, name, price, stock, pictures, description, amount, checked} = props

    return (
        <div className='basket__item'>
            <input 
                type='checkbox' 
                defaultChecked={checked}
                onClick={() => dispatch(changeChecked(id))}
            />
            <img className='basket__item-img' src={pictures} alt="" />
            <div className='basket__item-name'>{name}</div>
            <button
                onClick={() => {
                    dispatch(deleteProductFromBasket({id}))
                }}
            >удалить из корзины</button>
            <div className='basket__item-icons'>
                <i className="fa-solid fa-minus"
                    onClick={() => dispatch(decAmount(id))}
                ></i>
                <i className="fa-solid fa-plus"
                    onClick={() => dispatch(incAmount(id))}
                ></i>
            </div>
            <div className='basket__item-amount'>{amount + '/' + stock}</div>
            <div className='basket__item-price'>{amount * price + ' р.'}</div>
        </div>
    )
}

export default BasketItem