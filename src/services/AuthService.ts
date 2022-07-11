import {pbkdf2, randomBytes} from "crypto";
import {promisify} from "util";
import {sign} from "async-jsonwebtoken";
import {CreateUserDto} from "../types";
import {User} from "../entities/User";
import {CreateUserResponse} from "../types";
import {AuthError, ValidationError} from "../middlewares/errorMiddleware";
import {LoginUserDto} from "../types";
import {LoginUserResponse} from "../types";
import {validate} from "class-validator";
import {validationConfig} from "../config/validation/validationConfig";


interface GeneratedCredentials {
    encryptedPassword: string,
    salt: string
}

class AuthService {

    async register(createUserDto: CreateUserDto): Promise<CreateUserResponse> {

        const {name, password, passwordConfirm, email} = createUserDto

        if (password !== passwordConfirm) {
            throw new ValidationError("passwords must be the same");
        }
        const {encryptedPassword, salt} = await this.generatePassword(createUserDto.password);

        const user = User.create({name, email, password: encryptedPassword, salt});

        const validationErrors = await validate(user, validationConfig);

        if (validationErrors.length > 0) {
            const [error] = validationErrors;
            throw new ValidationError(`value ${error.value} is invalid for ${error.property}`);
        }

        await user.save();

        const token = await this.signToken(user.id);
        return {
            status: "success",
            user: {id: user.id, name: user.name, email: user.email, token}

        };
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
        const {email, password} = loginUserDto;

        console.log(email,password);

        if (!email || !password) {
            throw new ValidationError("make sure you're sending email and password in request body");
        }

        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new AuthError(`user with email: ${email} does not exists`);
        }
        const isValid = await this.comparePasswords(password, user.password, user.salt);
        if (!isValid) {
            throw new AuthError("email or password are incorrect");
        }
        const token = await this.signToken(user.id);

        return {
            status: "success",
            user: {id: user.id, token: token}
        }
    }


    private async generatePassword(password: string): Promise<GeneratedCredentials> {
        const salt = randomBytes(32).toString("hex");
        const encryptedPassword = await this.hashPassword(password, salt);
        return {salt, encryptedPassword};
    }

    private async hashPassword(password: string, salt: string): Promise<string> {

        const hash = await promisify(pbkdf2)(password, salt, 10000, 64, "sha512");
        return hash.toString("hex");
    }

    private async comparePasswords(password: string, encryptedPassword: string, salt: string): Promise<boolean> {
        const candidatePassword = await this.hashPassword(password, salt);
        return candidatePassword === encryptedPassword;
    }

    private async signToken(userId: string): Promise<string> {
        const [token, err] = await sign({sub: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
        if (err) {
            throw new AuthError("Something went wrong with authentication process");
        }

        return token;

    }
}

export {AuthService};