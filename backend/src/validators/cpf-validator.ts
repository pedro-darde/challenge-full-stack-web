import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "cpf", async: false })
export class CpfConstraintValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!value) {
      return false;
    }

    value = value.replace(/\D/g, "");

    if (value.length != 11 || new RegExp(/^([0-9])\\1+$/).test(value)) {
      return false;
    }

    let digit = value.substring(0, 9);

    for (let j = 10; j <= 11; j++) {
      let sum = 0;

      for (let i = 0; i < j - 1; i++) {
        sum += (j - i) * parseInt(digit[i]);
      }

      const summod11 = sum % 11;
      const replacement = (summod11 < 2 ? 0 : 11 - summod11).toString();

      digit = CpfConstraintValidator.replaceAt(digit, replacement, j - 1);
    }

    return (
      digit.charAt(9) === value.charAt(9) &&
      digit.charAt(10) === value.charAt(10)
    );
  }

  private static replaceAt(
    value: string,
    replacement: string,
    position: number
  ): string {
    return (
      value.substr(0, position) +
      replacement +
      value.substr(position + replacement.length)
    );
  }
}

export function CpfValidator(
  entity: Function,
  validationOptions?: ValidationOptions
) {
  validationOptions = {
    ...{ message: "O CPF informado não é válido." },
    ...validationOptions,
  };
  return function (object: Object, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CpfConstraintValidator,
    });
  };
}
