import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = (props) => {

    const [term, setTerm] = useState('');

    useEffect(() => {
        props.onUpdateSearch(term)
    }, [term])

    const onUpdateSearch = (e) => {
        setTerm(e.target.value);
    }

    return (
        <header className='app__header'>
            <h1>
                <NavLink end to='/sign' >регистрация</NavLink>
            </h1>
            <input type="text"
                className="form-control search-input"
                placeholder="Найти товар"
                value={term}
                onChange={onUpdateSearch} />
            <nav className='app__menu'>
                <ul>
                    <li><a href="#">{props.favorite} в избранном</a></li>
                    <NavLink end to='/catalog' >Каталог</NavLink>
                    <li><a href="#">корзина</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;