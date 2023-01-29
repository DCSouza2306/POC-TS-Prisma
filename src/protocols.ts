export type ErrorModel = {
 name: string;
 message: string;
};

export type vehicles = [
 {
  model: string;
  carMaker: string;
  year: number;
  color: string;
  licensePlate: string;
  pricePerDay: number;
 }
];
export type vehicle = {
 id: number;
 model: string;
 carMaker: string;
 year: number;
 color: string;
 licensePlate: string;
 status: string;
 pricePerDay: number;
};

export type model = {
 name: string;
 carMaker: string;
 year: number;
};

export type carMaker = {
 name: string;
};
