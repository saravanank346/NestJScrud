import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, Res, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync,compareSync } from "bcrypt";
import { Request, Response } from 'express';
import { node_Mailer } from 'src/utils/nodeMailer';
import * as jwt from "jsonwebtoken"

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService ,private helper:node_Mailer) {}

  @Post("create")
   async create(@Body() createUserDto: CreateUserDto,@Req() req:Request, @Res() res:Response) {
   try {
    const checkEmail= await this.usersService.chechEmail(createUserDto.email);
    if (!checkEmail ) {
      console.log("inside checkmail");
      
      const hashpassword=hashSync(createUserDto.password,10);
      createUserDto.password=hashpassword;
      console.log("hash");
      

     const payload={
      id:createUserDto.id,
      email:createUserDto.email
     }
      const create_token=jwt.sign(payload,"secretkey")
      createUserDto.token=create_token
      console.log("token",create_token);

     
      await this.usersService.create(createUserDto);
      res.status(HttpStatus.CREATED).json({"message":"user created successfully"})
      console.log("create");
      const getbyemail=await this.usersService.getE(createUserDto.email)
      if (create_token==getbyemail.token) {
        console.log("inside verify");
        const isverified=true
        const id=(await getbyemail).id
        const send_mail=await this.helper.sendEmail(create_token)
        console.log("after sendmail");
        await this.usersService.updateIsVerify(id,isverified)
        console.log("Account Verified");
      
       
     
        
        
      } else {
        console.log("Account not Verified");
      }


   


    
      
      

   
    
      // await this.usersService.verifyTokens(isverified,payload)
      

       
      
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({"message":"email already exist"})
    }
     
    
   } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({"message":"error"})
  
    
   

    
   }
  }
  @Get("getAll")
   async findAll(CreateUserDto:CreateUserDto,@Req() req:Request,@Res() res:Response){
    try {
     const all_Info= await this.usersService.findAll()
      res.status(HttpStatus.OK).json({message:"getAll user successfull",
      data:all_Info
      });
      // console.log(res.json);
      
      
     } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({"message":"error"})
  
      
     }

   }



   @Get("getbyid/:id")
   async findOne( @Param('id') id:number,@Req() req:Request,@Res() res:Response,){
    try {
     const getid= await this.usersService.findOne(id)
      res.status(HttpStatus.OK).json({message:"getbyid user successfull",
      data:getid
      });
      // console.log(res.json);
      
      
     } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({"message":"error"})
  
      
     }

   }

   @Put("update/:id")
   async update(@Param('id')  id:number ,@Body()  UpdateUserDto:UpdateUserDto,@Req() req:Request ,@Res() res:Response){
    try {
      const update=await this.usersService.update(id,UpdateUserDto)
      res.status(HttpStatus.OK).json({
        message:"updated successfully",
      })
      
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({"message":"error"})
    }
    
   }

   @Delete("delete/:id")
   async remove(@Param('id')  id:number ,@Req() req:Request ,@Res() res:Response){
    try {
      const update=await this.usersService.remove(id)

      res.status(HttpStatus.OK).json({
        message:"deleted successfully",
      })
      
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({"message":"error"})
    }
    
   }
   

 
  

  
  
  

}