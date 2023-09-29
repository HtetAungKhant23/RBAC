import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    return "This action adds a new auth";
  }
}
