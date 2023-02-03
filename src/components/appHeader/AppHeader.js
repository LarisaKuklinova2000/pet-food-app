import { Link, NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './appHeader.scss';

const AppHeader = (props) => {
    const {token, myInfo} = useSelector(state => state.regInfo)

    return (
        <header className='app__header'>
            <h1>
                <NavLink end to='/catalog' >Еда для собакенов</NavLink>
            </h1>
            <nav className='app__menu'>
                <ul>
                    <li><NavLink end to='/catalog' >{`избранное ${props.favorite}`}</NavLink></li>
                    <li><NavLink end to='/catalog' >корзина</NavLink></li>
                    <li>{!token? <NavLink end to='/sign' >{'регистрация'}</NavLink>: <NavLink end to='/me' >{myInfo.name}</NavLink>}</li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;