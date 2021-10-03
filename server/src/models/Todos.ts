import { AbsEntity } from "./AbsEntity";
import { Users } from "./Users";
import { Column, Entity, JoinColumn, ManyToOne, 
    PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "todos"})
export class Todos extends AbsEntity {
    @PrimaryGeneratedColumn("uuid") todoID: string;
    @Column() todo: string;
    @ManyToOne(() => Users, (user) => user.todo)
    @JoinColumn({
        name: "email",
        referencedColumnName: "email"
    }) user: Users;
};



