import React, {useState} from 'react';
import Order from '../components/Order';
import MenuNav from '../components/MenuNav';

const Menu = props => {
  const name = props.navigation.getParam('name');
  const image = props.navigation.getParam('image');
  const rating = props.navigation.getParam('rating');
  const [menuItem, setMenuItem] = useState(null);
  if (menuItem !== null) {
    return (
      <Order
        setMenuItem={setMenuItem}
        selected_menu_item={menuItem}
        {...props}
      />
    );
  }

  return (
    <MenuNav
      setMenuItem={setMenuItem}
      name={name}
      image={image}
      rating={rating}
      navigation={props.navigation}
    />
  );
};

export default Menu;
