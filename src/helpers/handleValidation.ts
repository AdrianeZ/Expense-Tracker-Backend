import {ValidationError} from "class-validator";
import {ValidationError as ValidateError} from "../middlewares/errorMiddleware";

const handleValidation = (errors: ValidationError[]) => {

    if (errors.length > 0) {
        console.log(errors);
        const [error] = errors;
        throw new ValidateError(`value ${error.value} is invalid for ${error.property} ${error.constraints.uniqueConstraint ?? ""}`);

    }
}

export {handleValidation};