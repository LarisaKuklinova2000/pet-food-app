import { useState, useEffect, useRef } from "react";
import './FoodItemList.scss';
import ApiService from "../../services/ApiService";

const FoodItemList = (props) => {

    const [productList, setProductList] = useState([]);

    const apiService = new ApiService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        apiService.getAllProducts()
            .then(res => onProductListLoaded(res.products))
    }

    const onProductListLoaded = (productList) => {
        setProductList(productList);
    }

    function renderProductItems(arr) {

        let array = arr;

        if (props.term.length !== 0) {
            array = array.filter(item => item.name.toLowerCase().indexOf(props.term.toLowerCase()) > -1)
        }

        props.filterProducts(array, props.filter)

        const items = array.map((item) => {
            return (
                <div 
                    className="card"
                    key={item._id}>
                    <div className="box">
                        <div className="content">
                            <div 
                                className="prodPrice">
                                    цена: {item.discount > 0? 
                                        <div>
                                            <span className="oldPrice">{item.price}</span>
                                            <br />
                                            <span className="newPrice">
                                                {Math.floor((item.price/100)*(100-item.discount))}
                                                <br />
                                                скидка {item.discount}%!
                                            </span>
                                        </div>:
                                        <span>{item.price}</span>}
                            </div>
                            <div className="inStock">в наличии: <br /> <span>{item.stock}</span> шт</div>
                            <img src={item.pictures} alt="картинка товара"/>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <a href="#">в корзину</a>
                        </div>
                    </div>
                </div>
            )
        })
        return items;
    }

    const items = renderProductItems(productList)
    console.log(productList)
    
    return (
        <div className="container">
            <div>{props.term.length > 0 && items.length !== 0 ?`по вашему запросу: "${props.term}" найдено ${items.length} позиции`: null}</div>
            <div className="products__wrapper">{items.length === 0? 'извините, по Вашему запросу ничего не найдено =(': items}</div>
        </div>
    )
}

export default FoodItemList