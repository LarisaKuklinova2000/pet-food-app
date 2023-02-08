import {useSelector} from 'react-redux'
import { useGetOtherUserInfoQuery, useDeleteCommentMutation } from '../../api/apiSlice'
import Spinner from "../spinner/Spinner"
import './comment.scss'

const Comment = (props) => {

    const {rating, text, authorId, commentId, productId} = props

    const {token, myInfo} = useSelector(state => state.regInfo)
    const {
        data: author = {},
        isLoading
    } = useGetOtherUserInfoQuery({
        authorId,
        token
    });
    const [delelteComent] = useDeleteCommentMutation()

    const {name, about, avatar, email} = author
    const fire = (num) => {
        let fireArr = []
        for (let i = 1; i <= num; i++) {
            fireArr.push(<i key={i} className="fa-solid fa-fire"></i>)
        }
        return fireArr
    }

    return (
        isLoading? <Spinner />:
        <div key={commentId} className='comment__item'>
            <div className="comment-header">
                <div className='comment__item-author'>
                    <img src={avatar} alt="#" />
                    <div className='author-info'>{name}<br />{about}<br />{email}</div>
                </div>
                {authorId === myInfo._id?
                    <div>
                        <i 
                            className="fa-solid fa-trash-can"
                            onClick={() => 
                                delelteComent({
                                    productId,
                                    commentId,
                                    token
                                })}
                            ></i>
                    </div>:null}
                <div className='comment__item-rating'>{fire(rating)}</div>
            </div>
            <div className='comment__item-text'>{text}</div>
        </div>
    )
}

export default Comment