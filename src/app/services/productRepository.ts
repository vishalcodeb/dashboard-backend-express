import { Product } from "../models/entities/product";

export interface IProductRepository {
     get(): Promise<Product[] | null>;
     getById(id: string): Promise<Product | null>;
     add(product: Product): Promise<Product | null>;
     delete(id: string): Promise<Product | null>;
     updateProduct(id: string, body: any): Promise<Product | null>;
}