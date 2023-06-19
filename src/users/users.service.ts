import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync ,compareSync } from "bcrypt";
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from "jsonwebtoken"
import { idText } from 'typescript';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)private user_repository:Repository<User>){}
  async create(createUserDto: CreateUserDto) {
    await this.user_repository.save(createUserDto)

   
  }
  async login(email:string,password:string){
   const check= await this.user_repository.find({where:{email:email}})
   



  }
  async getE(email:string){
    return await this.user_repository.findOne({where:{email:email},select:["id","name","email","isverified","token"]})

  }
  async updateIsVerify(id:number,isverified:boolean){
    return await this.user_repository.update({id:id},{isverified:isverified})

  }


 



  async chechEmail(email:string){
    return await this.user_repository.findOne({where:{email:email}});
  }

   async findAll() {
    return this.user_repository.find()
  }

   async findOne(id: number) {
    return this.user_repository.findOne({where:{id:id}});
  }

   update(id: number, updateUserDto: UpdateUserDto) {
    return this.user_repository.update({id:id},updateUserDto);
  }

 async remove(id:any)
 {
  return await this.user_repository.softDelete(id);
  
  
 }
}
