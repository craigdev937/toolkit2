import bcrypt from "bcrypt";
import { IsEmail, Length } from "class-validator";
import { Exclude } from "class-transformer";
import { AbsEntity } from "./AbsEntity";
import { Todos } from "./Todos";
import { BeforeInsert, Column, Entity, Index, 
    OneToOne } from "typeorm";

@Entity({name: "users"})
export class Users extends AbsEntity {
    @Index()
    @IsEmail()
    @Column({ unique: true }) email: string;

    @Exclude()
    @Length(6, 255)
    @Column() password: string;

    @OneToOne(() => Todos) todo: Todos;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 12);
    };
};





