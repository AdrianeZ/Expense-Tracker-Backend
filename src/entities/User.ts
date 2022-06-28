import {Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BaseEntity} from "typeorm";


@Entity('users')
class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true, length: 320})
    email: string;

    @Column({length: 100})
    name: string;

    @Column({length: 150})
    password: string;

    @Column({length: 64})
    salt:string

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date
}


export {User};