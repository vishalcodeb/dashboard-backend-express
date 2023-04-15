import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ProductService } from "../services/productService";
import { generateUploadURL } from "../services/awsService";
import Template from "../global/response";
import { ServerException } from "../../lib/custom-errors";
import APIError from "../global/response/apierror";
const service = new ProductService();
class ProductController {
  public static listAll = (req: Request, res: Response, next: any) => {
    service
      .get()
      .then((products) => {
        if (products && products.length > 0) {
          res.json(Template.success(products, "Products Fetched succesfully"));
        } else {
          res.json(Template.success(products, "Products Fetched succesfully"));
        }
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };
  public static addNew = (req: Request, res: Response, next: any) => {
    service
      .add(req.body)
      .then((product) => {
        if (product) {
          res.json(Template.success(product, "Product saved succesfully"));
        }
      })
      .catch((err) => {
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };

  public static getById = (req: Request, res: Response, next: any) => {
    service
      .getById(req.params.id)
      .then((products) => {
        res.json(Template.success(products, "Products Fetched succesfully"));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  public static deleteById = (req: Request, res: Response, next: any) => {
    service
      .delete(req.params.id)
      .then((products) => {
        res.json(Template.success(products, "Product deleted"));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  public static update = (req: Request, res: Response, next: any) => {
    service
      .updateProduct(req.params.id, req.body)
      .then((products) => {
        res.json(Template.success(products, "Product Updated"));
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  };

  public static getS3Url = (req: Request, res: Response, next: any) => {
    generateUploadURL()
      .then((url) => {
        res.json(Template.success(url, "Url fetched"));
      })
      .catch((err) => {
        next(new ServerException("Error occured while getting url"));
      });
  };
}

export default ProductController;
