import { useState, useEffect, useRef } from "react";
import Product from "../product/Product";
import './FoodItemList.scss';
import ApiService from "../../services/ApiService";

const FoodItemList = (props) => {

    const [productList, setProductList] = useState([]);
    const [myId, setMyId] = useState(localStorage.getItem('id'))

    const apiService = new ApiService();

    const onUpdateMyId = () => {
        if (props.token !== undefined) {
            apiService.getMyId(props.token)
            .then(res => {
                setMyId(res._id); 
                localStorage.setItem('id', res._id)
            }) 
        }
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

export default FoodItemList