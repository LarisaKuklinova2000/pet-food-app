import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './appHeader.scss';

const AppHeader = (props) => {
    const {token, myInfo} = useSelector(state => state.regInfo)
    const {basketItems} = useSelector(state => state.basket)
    const {favoriteItems} = useSelector(state => state.favorite)

    return (
        <div className='header__wrapper'>
            <header className='app__header'>
                <h1>
                    <NavLink end to='/catalog' >Еда для собакенов</NavLink>
                </h1>
                <nav className='app__menu'>
                    <ul>
                        <li className='favorite-li'>
                            <NavLink end to='/favorite' ><i className="fa-solid fa-star"></i></NavLink>
                            {favoriteItems.length?<div className='count-circle'><div className='count'>{favoriteItems.length}</div></div>: null}
                        </li>
                        <li className='basket-li'>
                            <NavLink end to='/basket' ><i className="fa-solid fa-basket-shopping"></i></NavLink>
                            {basketItems.length?<div className='count-circle'><div className='count'>{basketItems.length}</div></div>: null}
                        </li>
                        <li>{!token? <NavLink end to='/sign' >{'регистрация'}</NavLink>: <NavLink end to='/me' >{myInfo.name}</NavLink>}</li>
                    </ul>
                </nav>
            </header>
        </div>
        
    )
}

export default AppHeader;