import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = (props) => {

    return (
        <header className='app__header'>
            <h1>
                <NavLink end to='/catalog' >Еда для собакенов</NavLink>
            </h1>
            <nav className='app__menu'>
                <ul>
                    <li><NavLink end to='/catalog' >{`избранное ${props.favorite}`}</NavLink></li>
                    <li><NavLink end to='/catalog' >корзина</NavLink></li>
                    <li>{!props.token? <NavLink end to='/sign' >регистрация</NavLink>: <NavLink end to='/me' >{localStorage.getItem('myName')}</NavLink>}</li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;