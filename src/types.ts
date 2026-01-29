export type CoffeeType = {
  count: number;
  id: string;
  name: string;
  price: number[];
  ristretto: string[];
  volume: number[];
  where: string[];
};

export type CartType = {
  count: number;
  id: string;
  name: string;
  price: number;
  ristretto: string;
  volume: number;
  where: string;
};
export type OrdersListType = {
  date:string,
  items:CartType[]

}
export type UserType = {
  name: string;
  password: string;
  email: string;
  phone: string;
};

export type UserAuthFBType = {
  name: string;
  email: string;
  uid: string;
};
