import {Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from "typeorm";



@Entity('users')
class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({unique: true, length: 320 })
    email: string;

    @Column({length: 100})
    username: string;

    @Column({length:100})
    password: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date
}


export {User}