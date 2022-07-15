import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import {User} from "../../entities/User";


@ValidatorConstraint({name:'uniqueConstraint', async:true})
class UniqueValidator implements ValidatorConstraintInterface
{

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean>{
        return await User.count({where:{email: value}}) === 0;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        if(validationArguments) return `${validationArguments?.value} already exists`;
        return "value already exists";
    }
}

export {UniqueValidator};