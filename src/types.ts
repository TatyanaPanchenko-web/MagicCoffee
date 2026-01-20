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

export type UserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
