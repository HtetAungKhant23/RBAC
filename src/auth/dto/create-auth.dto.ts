import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

enum RoleEnum {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
}

export class RegisterDto {
  @ApiProperty({example: '+95912345678'})
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({example: 'Htet Aung Khant'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example: '123456'})
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ enum: RoleEnum, default: "ADMIN" })
  @IsNotEmpty()
  role: RoleEnum;
}

export class LoginDto {
  @ApiProperty({ example: "+95912345678" })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: "123456" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
