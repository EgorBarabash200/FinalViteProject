export interface IDataCatalog {
  categories: Array<ICategory>;
}

interface ICategory {
  category: string;
  items: IProduct[];
}

interface IProduct {
  image: string;
  inStock: boolean;
  name: string;
  price: number;
  quantity: number;
}
