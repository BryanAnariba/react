import { IsEnum, IsNotEmpty } from "class-validator";
import { Publisher } from "../enums"

export class SearchHeroByDto {

  @IsNotEmpty()
  @IsEnum(Publisher)
  public readonly publisher: Publisher;
  
}