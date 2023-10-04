import { Global, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ProductModule } from "./product/product.module";
import { AccessControlService } from "./auth/access-control.service";

@Global()
@Module({
  imports: [AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService, AccessControlService],
  exports: [PrismaService, JwtService, AccessControlService],
})
export class AppModule {}
