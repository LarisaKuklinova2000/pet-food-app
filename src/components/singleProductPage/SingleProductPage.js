import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import './singleProductPage.scss';

const SingleProductPage = (props) => {

    const {productId} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const apiService = new ApiService();
        const updateProduct = () => {
            apiService.getProduct(productId, props.token)
                .then(res => setProduct(res));
        };
        updateProduct();
    },[productId, props.token])

    const {name, description, pictures, reviews, stock, wight, price, discount} = product;

    return (
        <div className="single-product">
            <img src={pictures} alt='food img' className="single-product__img"/>
            <div className="single-product__info">
                <h2 className="single-product__name">{name}</h2>
                <p className="single-product__descr">{description}</p>
                <p className="single-product__descr">{`рейтинг среди пользователей - ${!reviews? 'нет отзывов': props.raitingCounter(product).toFixed(1)}`}</p>
                <p className="single-product__descr">{`в наличии - ${stock}шт`} <br /> {`вес 1 шт - ${wight}`}</p>
                <div className="single-product__price">{`цена: ${Math.floor((price/100)*(100-discount))}руб`}</div>
                <p className="single-product__descr">{!discount? null: `скидка - ${discount}%`}</p>
            </div>
            <Link to='/catalog' className="single-product__back">обратно в каталог</Link>
        </div>
    )
}

export default SingleProductPage;