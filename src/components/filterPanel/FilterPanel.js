import { useState, useEffect } from 'react';
import './filterPanel.scss';

const FilterPanel = (props) => {

    const [term, setTerm] = useState('');

    useEffect(() => {
        props.onUpdateSearch(term)
    }, [term])

    const onUpdateSearch = (e) => {
        setTerm(e.target.value);
    }

    const buttonsData = [
        {name: 'all', label: 'все товары'},
        {name: 'new', label: 'новинки'},
        {name: 'cheapFirst', label: 'сначала дешёвые'},
        {name: 'expensiveFirst', label: 'сначала дорогие'},
        {name: 'raiting', label: 'по рейтингу'},
        {name: 'discount', label: 'по скидке'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active? 'btn-light' : 'btn-outline-light'

        return (
            <button type='button'
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onFilterSelect(name)}>
                {label}
            </button>
        )
    })

    return (
        <>
        <div className='btn__wrapper'>
            <div className='btn-group'>{buttons}</div>
        </div>
        <input type="text"
                className="form-control search-input"
                placeholder="Найти товар"
                value={term}
                onChange={onUpdateSearch} />
        </>
    )


}

export default FilterPanel;
