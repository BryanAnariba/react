import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Publisher } from "../enums";

export class CreateHeroDto {

  @IsNotEmpty()
  @IsString()
  public readonly hero_id: string;

  @IsNotEmpty()
  @IsString()
  public readonly superhero: string;

  @IsNotEmpty()
  @IsEnum(Publisher)
  public readonly publisher: Publisher;

  @IsNotEmpty()
  @IsString()
  public readonly alter_ego: string;

  @IsNotEmpty()
  @IsString()
  public readonly first_appearance: string;

  @IsNotEmpty()
  @IsString()
  public readonly characters: string;

}
