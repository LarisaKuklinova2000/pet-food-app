import { useState } from "react";
import AppHeader from '../appHeader/AppHeader';
import FoodItemList from '../foodItemList/FoodItemList';

const App = () => {

  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const searchProduct = (items, term) => {
    if (term.lemgth === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  const onUpdateSearch = (term) => {
    setTerm(term)
  }


  return (
    <div className="app">
      <AppHeader onUpdateSearch={onUpdateSearch}/>
      <main>
        <FoodItemList term={term}/>
      </main>
    </div>
  );
}

export default App;
