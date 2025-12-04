import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @Get()
    public getUsers() {
        return this.usersService.getAll();
    }

    @Get(':id')
    public getUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getById(id);
    }
    
    @Post()
    public addUser(@Body() user: User){
        return this.usersService.create(user);
    }
}
