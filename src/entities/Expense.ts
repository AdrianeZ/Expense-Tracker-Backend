import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {MinLength} from "class-validator";
import {User} from "./User";
import {Category} from "./Category";


@Entity('expenses')
class Expense extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @MinLength(3)
    @Column({length: 100})
    name: string;

    @Column({type: "decimal", precision: 8, scale: 2})
    value: number;

    @Column({type: "datetime"})
    expenseDate: Date;

    @ManyToOne(() => Category, category => category.expenses, {onDelete:"RESTRICT"})
    category: Category;

    @ManyToOne(() => User, user => user.expenses, {onDelete: "CASCADE"})
    user: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

}


export {Expense};