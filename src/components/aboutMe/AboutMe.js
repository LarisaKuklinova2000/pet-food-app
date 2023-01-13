import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import './aboutMe.scss';

const AboutMe = (props) => {

    const [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        const apiService = new ApiService();
        apiService.getMyInfo(props.token)
            .then(res => setMyInfo(res))

    }, [])

    const {avatar, email, name, group, about} = myInfo;

    return (
        <div className="single-product">
            <img src={avatar} alt='food img' className="single-product__img"/>
            <div className="single-product__info">
                <h2 className="single-product__name">{name}</h2>
                <p className="single-product__descr">{about}</p>
                <p className="single-product__descr">{group}</p>
                <p className="single-product__descr">{email}</p>
            </div>
            <div>
                <Link to='/catalog' className="single-product__back">обратно в каталог</Link>
                <Link to='/' className="single-product__back" onClick={() => {localStorage.clear(); window.location.reload()}}>выйти из профиля</Link>
            </div>
        </div>
    )
}

export default AboutMe;