import { useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../services/ApiService";
import './product.scss';

const Product = (props) => {

    const [likesArr, setLikesArr] = useState(props.likes)
    const [likes, setLikes] = useState(props.likes.length)
    const [heartClass, setHeartClass] = useState(props.likes.includes(props.userId)? "fa-solid fa-heart": "fa-regular fa-heart")

    const apiService = new ApiService()
    
    const likeOrDislike = () => {
        likesArr.includes(props.userId)?
            apiService.deleteLike(props.id, props.token)
                .then(res => {
                    setLikes(res.likes.length);
                    setHeartClass("fa-regular fa-heart")
                    setLikesArr(likesArr.filter(item => item !== props.userId))
                    props.onUpdateFavorite(props.favorite - 1)
                }):
            apiService.like(props.id, props.token)
                .then(res => {
                    setLikes(res.likes.length); 
                    setHeartClass("fa-solid fa-heart")
                    setLikesArr(likesArr.concat([props.userId]))
                    props.onUpdateFavorite(props.favorite + 1)
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
                                        {Math.floor((props.price/100)*(100-props.discount))}
                                        <br />
                                        скидка {props.discount}%!
                                    </span>
                                </div>:
                                <span>{props.price}</span>}
                    </div>
                    <div className="inStock">в наличии: <br /> {props.stock} шт</div>
                    <img src={props.pictures} alt="картинка товара"/>
                    <h3 className="cardTitle"><Link to={`/catalog/${props.id}`}>{props.name}</Link></h3>
                    <p>{props.description.length > 250? props.description.slice(0, 250) + '...': props.description}</p>
                    <button href="#">в корзину</button>
                    <i 
                        className={heartClass}
                        onClick={() => likeOrDislike()}>
                    </i>
                    <div className="likesCount">товар понравился <br /> {likes} пользователям</div>
                </div>
            </div>
        </div>
    )
}

export default Product;