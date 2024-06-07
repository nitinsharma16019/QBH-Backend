import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public users: User[] = [];
  private idCounter = 1;

  addUser(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.idCounter++ };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: Partial<Omit<User, 'id'>>): User {
    const userIndex = this.users.findIndex(user => user.id == id);
    if (userIndex === -1) 
      return null;
    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id == id);
    if (userIndex === -1) 
      return false;
    this.users.splice(userIndex, 1);
    return true;
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
