import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IAuthRequest } from "src/libs/authRequest";
import { CreateProductDto } from "./dto/create-product-dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RoleGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/auth/decorators/role.decorator";
import { Role } from "@prisma/client";

@Controller("product")
@ApiTags("Product")
@ApiBearerAuth()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Post("create")
  @ApiOperation({ summary: "Create Product" })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Request() req: IAuthRequest, @Body() dto: CreateProductDto) {
    console.log("ha", req.user.role);
    return this.productService.createProduct(req.user.id, dto);
  }
}
