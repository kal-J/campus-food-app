const changeCampus = (value) => ({
  type: "CHANGE_CAMPUS",
  payload: value,
});

const changePickupPoint = (value) => ({
  type: "CHANGE_PICKUP_POINT",
  payload: value,
});

const newOrder = (value) => ({
  type: "NEWORDER",
  payload: value,
});

const setUser = (value) => ({
  type: "SETUSER",
  payload: value,
});
const updateCart = (value) => ({
  type: "UPDATECART",
  payload: value,
});
const placeOrder = (value) => ({
  type: "PLACEORDER",
  payload: value,
});

export {
  changeCampus,
  changePickupPoint,
  newOrder,
  setUser,
  updateCart,
  placeOrder,
};
