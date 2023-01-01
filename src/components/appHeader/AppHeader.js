import { useState, useEffect } from 'react';
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
                <a href="#">
                    Food for your pet
                </a>
            </h1>
            <input type="text"
                className="form-control search-input"
                placeholder="Найти товар"
                value={term}
                onChange={onUpdateSearch} />
            <nav className='app__menu'>
                <ul>
                    <li><a href="#">food</a></li>
                    <li><a href="#">to buy</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;