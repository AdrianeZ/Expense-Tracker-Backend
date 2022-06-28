import {pbkdf2, randomBytes} from "crypto";
import {promisify} from "util";
import {sign} from "jsonwebtoken";
import {CreateUserDto} from "../types/dto/auth/CreateUserDto";
import {User} from "../entities/User";
import {CreateUserResponse} from "../types/responses/auth/CreateUserResponse";
import {BaseResponse} from "../types/responses/BaseResponse";
import {AuthError, ValidationError} from "../middlewares/errorMiddleware";
import {LoginUserDto} from "../types/dto/auth/LoginUserDto";
import {LoginUserResponse} from "../types/responses/auth/LoginUserResponse";


interface GeneratedCredentials {
    encryptedPassword: string,
    salt: string
}

class AuthService {
    async register(createUserDto: CreateUserDto): Promise<BaseResponse<"user", CreateUserResponse>> {

        const {name, password, passwordConfirm, email} = createUserDto

        if (password !== passwordConfirm) {
            throw new ValidationError("passwords must be the same");
        }
        const {encryptedPassword, salt} = await this.generatePassword(createUserDto.password);
        const user = User.create({name, email, password: encryptedPassword, salt});
        await user.save();

        const token = this.signToken(user.id);
        return {status: "success", user: {id: user.id, name: user.name, email: user.email, token}};
    }

    async login(loginUserDto: LoginUserDto): Promise<BaseResponse<"user", LoginUserResponse>> {
        const {email, password} = loginUserDto;
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new AuthError(`User with email: ${email} does not exists`);
        }
        const isValid = await this.comparePasswords(password, user.password, user.salt);
        if (!isValid) {
            throw new AuthError("Email or Password are incorrect");
        }
        const token = this.signToken(user.id);

        return {status: "success", user: {id: user.id, token}};
    }


    private async generatePassword(password: string): Promise<GeneratedCredentials> {
        const salt = randomBytes(32).toString("hex");
        const encryptedPassword = await this.hashPassword(password, salt);
        return {salt, encryptedPassword};
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        const pbkdf2promisified = promisify(pbkdf2);
        const hash = await pbkdf2promisified(password, salt, 10000, 64, "sha512");
        return hash.toString("hex");
    }

    private async comparePasswords(password: string, encryptedPassword: string, salt: string): Promise<boolean> {
        const candidatePassword = await this.hashPassword(password, salt);
        return candidatePassword === encryptedPassword;
    }

    private signToken(userId: string): string {
        return sign({sub: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
    }
}

export {AuthService};