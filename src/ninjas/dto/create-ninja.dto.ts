import { IsEnum, MaxLength, } from "class-validator";

export class CreateNinjaDto {
  @MaxLength(10, {
    message: 'Name is too long'
  })
  name: string

  @IsEnum(["legs" , "hands" , "arms", "feet"], {message: "Use correct weapon"})
  weapon: string;
}

