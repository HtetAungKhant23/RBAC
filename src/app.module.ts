import { Global, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma.service";
import { JwtService } from "@nestjs/jwt";

@Global()
@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService],
  exports: [PrismaService, JwtService],
})
export class AppModule {}
