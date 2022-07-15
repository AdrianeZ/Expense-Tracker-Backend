import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany
} from "typeorm";
import {IsEmail, MinLength, Validate} from "class-validator";
import {UniqueValidator} from "../config/validation/EmailValidation";
import {Expense} from "./Expense";


@Entity('users')
class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column({unique: true, length: 320})
    @Validate(UniqueValidator)
    @IsEmail()
    email: string;

    @MinLength(3)
    @Column({length: 100})
    name: string;


    @Column({length: 150})
    @MinLength(8)
    password: string;

    @Column({length: 64})
    salt: string;

    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}


export {User};