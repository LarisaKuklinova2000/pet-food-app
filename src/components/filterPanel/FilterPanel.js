import {useSelector, useDispatch} from 'react-redux'
import {changeFilter, changeTerm} from './filtersSlice'
import './filterPanel.scss'

const FilterPanel = () => {

    const {activeFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch()

    const buttonsData = [
        {id: 1, name: 'all', label: 'все товары'},
        {id: 2, name: 'new', label: 'новинки'},
        {id: 3, name: 'cheapFirst', label: 'сначала дешёвые'},
        {id: 4, name: 'expensiveFirst', label: 'сначала дорогие'},
        {id: 5, name: 'raiting', label: 'по рейтингу'},
        {id: 6, name: 'discount', label: 'по скидке'}
    ]

    const buttons = buttonsData.map((item) => {
        const active = activeFilter === item.name;
        const clazz = active? 'btn-light' : 'btn-outline-light'

        return (
            <button type='button'
                    className={`btn ${clazz}`}
                    key={item.name}
                    onClick={() => dispatch(changeFilter(item.name))}>
                {item.label}
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
                onChange={(e) => dispatch(changeTerm(e.target.value))} />
        </>
    )


}

export default FilterPanel;
