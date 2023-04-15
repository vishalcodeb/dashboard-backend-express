import { IProductRepository } from "./productRepository";
import { Product } from "../models/entities/product";
import { getRepository } from "typeorm";
import { Request } from "express";
import { IProduct } from "../models/product";

export class ProductService implements IProductRepository {
  async get(): Promise<Product[] | null> {
    try {
      const productRepository = getRepository(Product);
      const products = await productRepository.find({});
      return products;
    } catch (error) {
      return null;
    }
  }
  async getById(id: string): Promise<Product | null> {
    const productRepository = getRepository(Product);
    try {
      const products = await productRepository.findOneOrFail(id);
      return products;
    } catch (error) {
      return null;
    }
  }
  async add(model: IProduct): Promise<Product | null> {
    const { name, price, imgUrl, sku } = model;
    const product = new Product();
    product.sku = sku
    product.name = name;
    product.price = price;
    product.imgUrl = imgUrl;
    const productRepository = getRepository(Product);
    try {
      const savedProduct = await productRepository.save(product);
      return savedProduct;
    } catch (err) {
      console.log(err);
      return Promise.reject(`Error => ${err}`);
    }
  }
  async delete(id: string): Promise<Product | null> {
    const productRepository = getRepository(Product);
    let product: Product;
    try {
      product = await productRepository.findOneOrFail(id);
      if (product) {
        productRepository.delete(id);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async updateProduct(id: string, body: any): Promise<Product | null> {
    const productRepository = getRepository(Product);
    try {
      const savedProduct = await productRepository.save({ id, ...body });
      return savedProduct;
    } catch (err) {
      console.log(err);
      return Promise.reject(new Error(`Error => ${err}`));
    }
  }
}
