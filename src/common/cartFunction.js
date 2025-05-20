export const totalPrice = (getCartItems) => {
  let allTotalPrice = 0;
  getCartItems.forEach((item) => {
    allTotalPrice += item.price * item.count;
  });
  return allTotalPrice;
};
