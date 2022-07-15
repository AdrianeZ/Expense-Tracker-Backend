import {ValidatorOptions} from "class-validator";

const validationConfig: ValidatorOptions = {
    forbidUnknownValues: true,
    validationError: {target: false}
}

export {validationConfig};