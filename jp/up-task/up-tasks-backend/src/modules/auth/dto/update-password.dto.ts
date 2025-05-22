import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class PasswordsMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as { password: string };
    return confirmPassword === object.password;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Las contrasenas no coinciden!';
  }
}

export class UpdatePasswordDto {

  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(PasswordsMatchConstraint)
  public confirmPassword: string;
}
