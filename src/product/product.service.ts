import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateProductDto } from "./dto/create-product-dto";
import { Responser } from "src/libs/responser";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(userId: string, dto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          name: dto.name,
          code: dto.code,
          createdBy: userId,
        },
      });
      return Responser({
        statusCode: 201,
        message: "Product Create success",
        devMessage: "product-create-success",
        body: product,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
