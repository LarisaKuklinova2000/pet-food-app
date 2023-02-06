import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addProductToBasket, deleteProductFromBasket} from "../basket/basketSlice"
import { addProductToFavorite, deleteProductFromFavorite } from '../favorite/favoriteSlice'
import ApiService from "../../services/ApiService";
import './product.scss';

const Product = (props) => {

    const dispatch = useDispatch()
    const {basketItems} = useSelector(state => state.basket)
    const {favoriteItems} = useSelector(state => state.favorite)

    const [likesArr, setLikesArr] = useState(props.likes)
    const [likes, setLikes] = useState(props.likes.length)
    const [heartClass, setHeartClass] = useState(props.likes.includes(props.userId)? "fa-solid fa-heart": "fa-regular fa-heart")

    const {id, name, discount, price, stock, pictures, description } = props

    const apiService = new ApiService()
    
    const likeOrDislike = () => {
        likesArr.includes(props.userId)?
            apiService.deleteLike(props.id, localStorage.getItem('token'))
                .then(res => {
                    setLikes(res.likes.length);
                    setHeartClass("fa-regular fa-heart")
                    setLikesArr(likesArr.filter(item => item !== props.userId))
                }):
            apiService.like(props.id, localStorage.getItem('token'))
                .then(res => {
                    setLikes(res.likes.length); 
                    setHeartClass("fa-solid fa-heart")
                    setLikesArr(likesArr.concat([props.userId]))
                })
    }
 
    return (
        <div 
            className="card"
            key={props.id}>
            <div className="box">
                <div className="content">
                    <div 
                        className="prodPrice">
                            цена: {props.discount > 0? 
                                <div>
                                    <span className="oldPrice">{props.price}</span>
                                    <br />
                                    <span className="newPrice">
                                        - {props.discount}%!
                                        <br />
                                        {Math.floor((props.price/100)*(100-props.discount))}
                                    </span>
                                </div>:
                                <span>{props.price}</span>}
                    </div>
                    <div className="inStock">в наличии: <br /> {props.stock} шт</div>
                    <img src={props.pictures} alt="картинка товара"/>
                    <h3 className="cardTitle" style={props.name.length > 20?{fontSize: '16px'}: {fontSize: '25px'}}>
                        <Link to={`/catalog/${props.id}`}>
                            {
                                props.name
                            }
                        </Link>
                    </h3>
                    <p>{props.description.length > 250? props.description.slice(0, 150) + '...': props.description}</p>
                    <button
                        style={
                            basketItems.filter(item => item.id === id).length?
                            {'backgroundColor': 'red'}:
                            {'backgroundColor': 'green'}
                        }
                        onClick={() => {
                            basketItems.filter(item => item.id === id).length?
                            dispatch(deleteProductFromBasket({id})):
                            dispatch(addProductToBasket({id, name, discount, price, stock, pictures, description, amount: 1, checked: false}))
                        }}>
                        {
                        basketItems.filter(item => item.id === id).length?
                        'убрать из корзины':
                        'в корзину'
                        }
                    </button>
                    {
                        favoriteItems.includes(id)? 
                        <i 
                            className="fa-solid fa-star"
                            onClick={() => {dispatch(deleteProductFromFavorite(id))}}
                        ></i>:
                        <i 
                            className="fa-regular fa-star"
                            onClick={() => {dispatch(addProductToFavorite(id))}}
                        ></i>
                    }
                    <i 
                        className={heartClass}
                        onClick={() => likeOrDislike()}>
                    </i>
                    <div className="likesCount">{likes}</div>
                </div>
            </div>
        </div>
    )
}

export default Product;