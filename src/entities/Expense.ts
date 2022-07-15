import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from "typeorm";
import {IsNotEmpty, IsString, Min, MinLength} from "class-validator";
import {User} from "./User";
import {Category} from "./Category";




@Entity('expenses')
class Expense extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    @Column({length: 100})
    name: string;


    @Column({type: "decimal", precision: 8, scale: 2})
    @Min(0.01)
    value: number;


    @Column({ type: "uuid"})
    categoryId: string;


    @ManyToOne(() => Category, category => category.expenses, {onDelete:"RESTRICT", eager:true})
    @JoinColumn({name:"categoryId", referencedColumnName:"id"})
    category: Category;



    @ManyToOne(() => User, user => user.expenses, {onDelete: "CASCADE"})
    user: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

}


export {Expense};