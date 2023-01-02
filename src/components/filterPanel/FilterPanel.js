import { useState, useEffect } from 'react';
import './filterPanel.scss';

const FilterPanel = (props) => {

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
        <div className='btn__wrapper'>
            <div className='btn-group'>{buttons}</div>
        </div>
    )


}

export default FilterPanel;
