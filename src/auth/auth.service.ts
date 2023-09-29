import { HttpException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Responser } from "src/libs/responser";

type ReturnToken = { accessToken: string; refreshToken: string };
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          phone: dto.phone,
        },
      });
      if (existingUser) throw new Error("User Already Exist!");
      const newUser = await this.prisma.user.create({
        data: {
          phone: dto.phone,
          password: dto.password,
          profile: {
            create: {
              name: dto.name,
              role: dto.role,
            },
          },
        },
        include: {
          profile: true,
        },
      });

      const token = await this.generateToken(newUser.id, newUser.profile.role);

      return Responser({
        statusCode: 201,
        message: "Registration Success",
        devMessage: "register-success",
        body: { accessToken: token.accessToken },
      });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || "Failed to register!",
          devMessage: err.message || "",
        },
        401,
      );
    }
  }

  private generateToken = async (id: string, role: string): Promise<ReturnToken> => {
    const payload = { id, role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: "1d",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  };
}
