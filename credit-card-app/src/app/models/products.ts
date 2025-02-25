// export interface Products {
//   name: string;
//   description: string;
//   price: number;
//   // number: number;
//   // image: string;
//   // category: string;
// }

export class Products {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public price: number = 0,
    public image: string = '',
    public imageUrl: string = ''
  ) {}
}
