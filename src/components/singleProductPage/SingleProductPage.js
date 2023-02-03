import { useParams, Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useGetSingleProductQuery } from '../../api/apiSlice'
import Spinner from "../spinner/Spinner"
import './singleProductPage.scss'

const SingleProductPage = () => {

    const { productId } = useParams();
    const {token} = useSelector(state => state.regInfo)
    const argsArr = [productId, token]
    const {
        data: product = {},
        isLoading
    } = useGetSingleProductQuery(argsArr);

    const raitingCounter = (item) => {
		let raiting = 0;
		raiting = item.reviews.map(item => raiting + item.rating)
		return raiting.length>0? raiting.reduce((a, b) => a + b) / raiting.length: 0
	}

    const {name, description, pictures, reviews, stock, wight, price, discount} = product;

    return (
        isLoading? <Spinner />:
        <div className="single-product">
            <img src={pictures} alt='food img' className="single-product__img"/>
            <div className="single-product__info">
                <h2 className="single-product__name">{name}</h2>
                <p className="single-product__descr">{description}</p>
                <p className="single-product__descr">{`рейтинг среди пользователей - ${!reviews? 'нет отзывов': raitingCounter(product).toFixed(1)}`}</p>
                <p className="single-product__descr">{`в наличии - ${stock}шт`} <br /> {`вес 1 шт - ${wight}`}</p>
                <div className="single-product__price">{`цена: ${Math.floor((price/100)*(100-discount))}руб`}</div>
                <p className="single-product__descr">{!discount? null: `скидка - ${discount}%`}</p>
            </div>
            <Link to='/catalog' className="single-product__back">обратно в каталог</Link>
        </div>
    )
}

export default SingleProductPage;