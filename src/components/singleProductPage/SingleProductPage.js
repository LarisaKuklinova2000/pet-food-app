import { useParams, Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useGetSingleProductQuery, useAddCommentMutation } from '../../api/apiSlice'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import moment from "moment/moment"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Comment from '../commentItem/Comment'
import Spinner from "../spinner/Spinner"
import './singleProductPage.scss'

const SingleProductPage = () => {

    const { productId } = useParams();
    const {token, myInfo} = useSelector(state => state.regInfo)
    const {
        data: product = {},
        isLoading,
        isSuccess
    } = useGetSingleProductQuery({
        productId,
        token
    })
    const [addComment] = useAddCommentMutation()

    const raitingCounter = (item) => {
		let raiting = 0;
		raiting = item.reviews.map(item => raiting + item.rating)
		return raiting.length>0? raiting.reduce((a, b) => a + b) / raiting.length: 0
	}

    const {name, description, pictures, reviews = [], stock, wight, price, discount, author, _id} = product;

    const sortedRewiews = [...reviews].sort((a, b) => moment(b.created_at) - moment(a.created_at))

    const comments = sortedRewiews.map(item => {
        return <CSSTransition
                    key={item._id}
                    timeout={300}
                    classNames="comment-item">
                    <Comment
                        key={item._id}
                        authorId={item.author} 
                        rating={item.rating} 
                        text={item.text} 
                        commentId={item._id}
                        productId={_id} />
                </CSSTransition>
        
    })

    return (
        isLoading? <Spinner />:
        <div className="single-product">
            <img src={pictures} alt='food img' className="single-product__img"/>
            <div className="single-product__info">
                <div className='single-product__author'>
                    <div><img src={author.avatar} alt="" /></div>
                    <div className='single-product__author-name'>{author.name}</div>
                </div>
                <h2 className="single-product__name">{name}</h2>
                <p className="single-product__descr">{description}</p>
                <p className="single-product__descr">{`?????????????? ?????????? ?????????????????????????? - ${!reviews? '?????? ??????????????': raitingCounter(product).toFixed(1)}`}</p>
                <p className="single-product__descr">{`?? ?????????????? - ${stock}????`} <br /> {`?????? 1 ???? - ${wight}`}</p>
                <div className="single-product__price">{`????????: ${Math.floor((price/100)*(100-discount))}??????`}</div>
                <p className="single-product__descr">{!discount? null: `???????????? - ${discount}%`}</p>
            </div>
            <Link to='/catalog' className="single-product__back">?????????????? ?? ??????????????</Link>
            <div className='comments__wrapper'>
                <Formik
                    initialValues={{
                        text: '',
                        rating: 1
                    }}
                    onSubmit = {(values, {resetForm}) => {
                        addComment({
                            _id,
                            token,
                            values
                        }).unwrap()
                        resetForm()
                    }}
                    >
                    <Form className='addComment__wrapper'>
                        <div className='addComment__wrapper-item'>
                            <label htmlFor="text">?????? ??????????????????????</label>
                            <Field
                                className="commentInput"
                                placeholder="?????????????? ?????? ??????????????????????"
                                name="text"
                                id='text'
                                as='textarea'
                            /> 
                        </div>
                        <div className='addComment__wrapper-item'>
                            <label htmlFor="myrating">??????????????</label>
                            <Field
                                id="rating"
                                name="rating"
                                as='select'
                                >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Field>
                            <button type="submit">??????????????????</button>
                        </div>   
                    </Form>
                </Formik>
                {isSuccess && reviews.length> 0?
                <TransitionGroup>
                    {comments}
                </TransitionGroup>:
                <div key={'njnjnjnj'} className='comment__item'>???????????????????????? ???????? ??????, ???????????????? ?????????</div>}
            </div>
        </div>
    )
}

export default SingleProductPage;