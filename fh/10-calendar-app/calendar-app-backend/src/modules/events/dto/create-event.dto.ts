import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isEndDateGreaterThanStartDate', async: false })
export class IsEndDateGreaterThanStartDate implements ValidatorConstraintInterface {
  validate(end: Date, args: ValidationArguments) {
    const start = (args.object as any).start;  // Obtiene la fecha de inicio
    if (start && end) {
      return end >= start;  // Compara las fechass
    }
    return false;  // Si no se tiene una fecha de inicio o fin, retorna false
  }

  defaultMessage(args: ValidationArguments): string {
    return 'La fecha de fin debe ser mayor que la fecha de inicio.';
  }
}

export class CreateEventDto {

  @IsNotEmpty()
  @IsString()
  public readonly title: string;

  @IsNotEmpty()
  @IsString()
  public readonly bgColor: string;

  @IsNotEmpty()
  @IsString()
  public readonly notes: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  public readonly start: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Validate(IsEndDateGreaterThanStartDate) 
  public readonly end: Date;

}

