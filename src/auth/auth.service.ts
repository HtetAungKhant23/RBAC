import { HttpException, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Responser } from "src/libs/responser";
import { hash } from "argon2";

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
      if (existingUser) return new HttpException({ message: "User already exist", devMessage: "user-already-exist" }, 404);
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

      return Responser({
        statusCode: 201,
        message: "Registration Success",
        devMessage: "register-success",
        body: newUser,
      });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || "Failed to register!",
          devMessage: err.message || "",
        },
        500,
      );
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          AND: [{ phone: dto.phone }, { password: dto.password }],
        },
        include: {
          profile: true,
        },
      });
      if (!user) return new HttpException({ message: "User not found!", devMessage: "user-not-found" }, 404);

      const token = await this.generateToken(user.id, user.profile.role);

      await this.prisma.user.update({
        where: {
          phone: user.phone,
        },
        data: {
          refreshToken: await hash(token.refreshToken),
        },
      });

      return Responser({
        statusCode: 201,
        message: "Registration Success",
        devMessage: "register-success",
        body: token,
      });
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || "Failed to login!",
          devMessage: err.message || "",
        },
        500,
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
