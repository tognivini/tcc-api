import { UpdateUserDto } from "./../../../../application/dto/userDto/UpdateUserDto";
import { UserModel } from "./../../../../models/UserModel";
import { GetAllUsersDto } from "./../../../../application/dto/userDto/_index";
import { IBaseRepository } from "./base/IBaseRepository";

export interface IUserRepository extends IBaseRepository<UserModel> {
  getAllPagging(request: GetAllUsersDto): Promise<UserModel[]>;
  
  delete(id: string): Promise<void>;

  findById(id: string): Promise<UserModel>;

  findByIdAll(id: string): Promise<UserModel>;

  findByEmail(email: string): Promise<UserModel>;
}
