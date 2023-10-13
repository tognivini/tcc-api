import { inject, injectable } from 'inversify'
import { IUserRepository } from '../../../domain/interfaces/repositories/database/_index'
import { ICreateUserUseCase } from '../../../domain/interfaces/useCases/user/_index'
import { UserModel } from '../../../models/_index'
import { TYPES_USER } from '../../../main/inversify/types'
import { CreateUserDto } from '../../dto/userDto/_index'
import { HttpResponse } from './../../../utils/commons/protocols/Http';
import { ok } from '../../../utils/commons/http/HttpHelper'
@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository,
  ) {}

  async execute(
    payload: CreateUserDto
  ): Promise<HttpResponse<UserModel[]>> {

    let allUsers = []
    for(var i = 0; i < 1000; i++) {
      const user = new UserModel()
      user.email = payload.email
      user.phoneNumber = payload.phoneNumber
      user.name = payload.name
      
      await this._repositoryUser.add(user)
      allUsers.push(user)
    }
    return ok(allUsers)
  }
}
