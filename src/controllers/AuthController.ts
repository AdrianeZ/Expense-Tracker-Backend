import {NextFunction, Request, Response} from "express";
import {CreateUserDto} from "../types/dto/auth/CreateUserDto";
import {AuthService} from "../services/AuthService";
import {BindController} from "../types/config/BindController";
import {LoginUserDto} from "../types/dto/auth/LoginUserDto";

class AuthController implements BindController {

    private authService: AuthService;

    constructor() {
        this.bind();
        this.authService = new AuthService();
    }

    bind(): void {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const response = await this.authService.register(req.body as CreateUserDto);
        res.status(201).json(response);
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const response = await this.authService.login(req.body as LoginUserDto);
        res.status(200).json(response);
    }
}

export {AuthController};