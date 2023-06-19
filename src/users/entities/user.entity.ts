import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { truncate } from "fs";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column({unique:true})
    password:string;

    @Column({default:false})
    isverified:boolean

    @Column()
    token:string

    @Column({default:true})
    isactive:boolean 

    @CreateDateColumn()
    createdAt:Date;

    @Column( {nullable:true})
    iscreatedBy:number;

    @UpdateDateColumn()
    updatedAt:Date;
    @Column({nullable:true})
    isupdatedBy:number;

    @DeleteDateColumn()
    DeletedAt:Date;
    @Column({nullable:true})
    isDeletedBy:number;

 

   



}

