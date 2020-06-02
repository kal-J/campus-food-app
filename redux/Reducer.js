import {combineReducers} from 'redux';

const INITIAL_STATE = {
  user: {
    isLoggedin: false,
    auth0_credentials: null,
  },
  vendors: [],
  campus: 'Lira University',
  pickupPoint: 'Blackroof',
  delivery_fee: 2000,
  // holds cart items
  orders: [],
  // holds cart on checkout
  ordersPlaced: [],
};

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_CAMPUS': {
      let new_campus = action.payload;
      let newState = {...state, campus: new_campus};
      return newState;
    }
    case 'CHANGE_PICKUP_POINT': {
      let new_pickupPoint = action.payload;
      let newState = {...state, pickupPoint: new_pickupPoint};
      return newState;
    }
    case 'NEWORDER': {
      let new_order = action.payload;
      let orders = state.orders;
      orders.push(new_order);
      let newState = {...state, orders: orders};
      return newState;
    }
    case 'PLACEORDER': {
      const order = action.payload;
      let ordersPlaced = state.ordersPlaced;
      ordersPlaced.push(order);
      let newState = {...state, ordersPlaced: ordersPlaced};
      return newState;
    }
    case 'FETCHVENDORS': {
      const vendors = action.payload;
      const newState = {...state, vendors: vendors};
      return newState;
    }

    case 'UPDATECART': {
      const orders = action.payload;
      if (orders.length === 0) {
        const newState = {
          ...state,
          orders: orders,
          vendors: [],
        };
        return newState;
      }
      const newState = {...state, orders: orders};
      return newState;
    }

    case 'SETUSER': {
      const auth0_credentials = action.payload;
      let isLoggedin = null;
      if (auth0_credentials.accessToken) {
        isLoggedin = true;
      } else {
        isLoggedin = false;
      }
      const newState = {
        ...state,
        user: {isLoggedin: isLoggedin, auth0_credentials: auth0_credentials},
      };
      return newState;
    }

    default:
      return state;
  }
};

export default combineReducers({
  reducer: mainReducer,
});
