import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: { name: string, email: string, phoneNumber: string, address: string }) {
    return this.userService.addUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<{ name: string, email: string, phoneNumber: string, address: string }>) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Get()
  getAllUsers(): { users: User[] } {
    return { users: this.userService.getAllUsers() };
  }
}
