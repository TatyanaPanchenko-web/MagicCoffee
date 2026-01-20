import { CartType } from "@/types";

export const totalPrice = (getCartItems:CartType[]) => {
  let allTotalPrice = 0;
  getCartItems.forEach((item) => {
    allTotalPrice += item.price * item.count;
  });
  return allTotalPrice;
};
