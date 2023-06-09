import { UserModel } from "./../../../models/_index";
import { inject, injectable } from "inversify";

import { UpdateUserDto } from "../../../application/dto/userDto/_index";
import { IUserRepository } from "../../../domain/interfaces/repositories/database/_index";
import { IUpdateUserUseCase } from "../../../domain/interfaces/useCases/user/IUpdateUserUseCase";
import { TYPES_USER } from "../../../main/inversify/types";
import { ok, badRequest } from "../../../utils/commons/http/HttpHelper";
import { UserMessages } from "../../../utils/commons/messages/UserMessagesResources";
import { HttpResponse } from "../../../utils/commons/protocols/Http";
@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly _repositoryUser: IUserRepository
  ) {}

  async execute(
    id: string,
    dto: UpdateUserDto
  ): Promise<HttpResponse<UserModel>> {
    // const userFinded = await this._repositoryUser.findByIdAll(id);
    // if (!userFinded?.id) {
    //   return badRequest(UserMessages.ERROR_USER_NOT_FOUND);
    // }

    // userFinded.email = dto.email;
    // userFinded.phoneNumber = dto.phoneNumber;
    // userFinded.name = dto.name;
    
    // await this._repositoryUser.update(id, userFinded);

    const usersFinded = await this._repositoryUser.getAllPagging({});
     if (!usersFinded[0]?.id) {
      return badRequest(UserMessages.ERROR_USER_NOT_FOUND);
    }
    for(const user of usersFinded) {
      user.email = dto.email;
      user.phoneNumber = dto.phoneNumber;
      user.name = dto.name;
      await this._repositoryUser.update(id, user)
    }
    
    return ok(usersFinded[0]);
  }
}
