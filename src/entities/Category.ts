import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {MinLength} from "class-validator";
import {Expense} from "./Expense";


@Entity('categories')
class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @MinLength(3)
    @Column({length: 50})
    name: string;

    @Column({type: "char", length: 7})
    color: string;

    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[];

}
export {Category};