import { useState, useEffect, useRef } from "react";
import Product from "../product/Product";
import './FoodItemList.scss';
import ApiService from "../../services/ApiService";

const FoodItemList = (props) => {

    const [productList, setProductList] = useState([]);
    const [myId, setMyId] = useState(localStorage.getItem('id'))

    const apiService = new ApiService();

    const onUpdateMyId = () => {
		apiService.getMyId(props.token)
            .then(res => {
                setMyId(res._id); 
                localStorage.setItem('id', res._id)
            }) 
	}

    const onRequest = () => {
        apiService.getAllProducts(props.token)
            .then(res => onProductListLoaded(res.products))
    }

    useEffect(() => {
        onRequest();
        onUpdateMyId();
    }, [props.token])

    useEffect(() => {
        props.onUpdateFavorite(productList.filter(item => item.likes.includes(myId)).length)
    }, [productList])

    const onProductListLoaded = (productList) => {
        setProductList(productList);
    }

    function renderProductItems(arr) {
        let array = arr;
        if (props.term.length !== 0) {
            array = array.filter(item => item.name.toLowerCase().indexOf(props.term.toLowerCase()) > -1)
        }
        props.filterProducts(array, props.filter)
        const items = array.map((item) => <Product
                                            key={item._id}
                                            id={item._id} 
                                            discount={item.discount} 
                                            price={item.price} 
                                            pictures={item.pictures}
                                            name={item.name}
                                            description={item.description}
                                            token={props.token}
                                            userId={myId}
                                            likes={item.likes}
                                            onUpdateFavorite={props.onUpdateFavorite}
                                            favorite={props.favorite}/>)
        return items;
    }

    const items = renderProductItems(productList)
    
    return (
        <div className="container">
            <div>{props.term.length > 0 && items.length !== 0 ?`по вашему запросу: "${props.term}" найдено ${items.length} позиции`: null}</div>
            <div className="products__wrapper">{items.length === 0? 'извините, по Вашему запросу ничего не найдено =(': items}</div>
        </div>
    )
}

// const Product = (props) => {

//     const [likesArr, setLikesArr] = useState(props.likes)
//     const [likes, setLikes] = useState(props.likes.length)
//     const [heartClass, setHeartClass] = useState(props.likes.includes(props.userId)? "fa-solid fa-heart": "fa-regular fa-heart")

//     const apiService = new ApiService()

//     return (
//         <div 
//             className="card"
//             key={props.id}>
//             <div className="box">
//                 <div className="content">
//                     <div 
//                         className="prodPrice">
//                             цена: {props.discount > 0? 
//                                 <div>
//                                     <span className="oldPrice">{props.price}</span>
//                                     <br />
//                                     <span className="newPrice">
//                                         {Math.floor((props.price/100)*(100-props.discount))}
//                                         <br />
//                                         скидка {props.discount}%!
//                                     </span>
//                                 </div>:
//                                 <span>{props.price}</span>}
//                     </div>
//                     <div className="inStock">в наличии: <br /> <span>{props.stock}</span> шт</div>
//                     <img src={props.pictures} alt="картинка товара"/>
//                     <h3>{props.name}</h3>
//                     <p>{props.description}</p>
//                     <a href="#">в корзину</a>
//                     <i 
//                         className={heartClass}
//                         onClick={() => likesArr.includes(props.userId)?
//                                             apiService.deleteLike(props.id, props.token)
//                                                 .then(res => {
//                                                     setLikes(res.likes.length);
//                                                     setHeartClass("fa-regular fa-heart")
//                                                     setLikesArr(likesArr.filter(item => item !== props.userId))
//                                                     props.onUpdateFavorite(props.favorite - 1)
//                                                 }):
//                                             apiService.like(props.id, props.token)
//                                                 .then(res => {
//                                                     setLikes(res.likes.length); 
//                                                     setHeartClass("fa-solid fa-heart")
//                                                     setLikesArr(likesArr.concat([props.userId]))
//                                                     props.onUpdateFavorite(props.favorite + 1)
//                                                 })}>
//                     </i>
//                     <div className="likesCount">товар понравился <br /> {likes} пользователям</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default FoodItemList