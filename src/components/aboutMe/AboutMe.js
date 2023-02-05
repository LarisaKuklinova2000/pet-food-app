import { Link, Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { changeToken, changeMyInfo } from "../signUp/signSlice"
import { clearBasket } from "../basket/basketSlice"
import { clearFavorite } from '../favorite/favoriteSlice'
import './aboutMe.scss';

const AboutMe = () => {

    const {token, myInfo} = useSelector(state => state.regInfo)
    const dispatch = useDispatch();


    const aboutMeInfo = 
        <div className="about-me">
            <img src={myInfo.avatar} alt='food img' className="about-me__img"/>
            <div className="about-me__info">
                <h2 className="about-me__name">{myInfo.name}</h2>
                <p className="about-me__descr">{myInfo.about}</p>
                <p className="about-me__descr">{myInfo.group}</p>
                <p className="about-me__descr">{myInfo.email}</p>
            </div>
            <div className='links'>
                <Link to='/catalog' className="about-me__back"><i class="fa-solid fa-arrow-left"></i>{' '}в каталог</Link>
                <br />
                <br />
                <Link 
                    to='/' 
                    className="about-me__back" 
                    onClick={() => {
                        localStorage.clear()
                        dispatch(changeToken(''))
			            dispatch(changeMyInfo(''))
                        dispatch(clearBasket())
                        dispatch(clearFavorite())
                    }}>выйти из профиля</Link>
            </div>
        </div>

    return (
        <div className='container'>
            {token && myInfo? aboutMeInfo: <Navigate to='/sign' />}
        </div>
    )
}

export default AboutMe;