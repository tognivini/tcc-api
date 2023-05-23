import { injectable } from "inversify";
import { getRepository, SelectQueryBuilder } from "typeorm";
import { GetAllUsersDto } from "../../application/dto/userDto/_index";
import { IUserRepository } from "../../domain/interfaces/repositories/database/IUserRepository";
import { UserModel } from "../../models/_index";
import { getConnection } from "typeorm";
@injectable()
export class UserRepository implements IUserRepository {
  async add(model: UserModel): Promise<UserModel> {
    const repo = getRepository(UserModel);
    return await repo.save(model);
  }

  async findById(id: string): Promise<UserModel> {
    if (!id) return null;
    return await this.findUserCustom(<UserModel>{ id: id });
  }

  async findUserCustom(filter: UserModel): Promise<UserModel> {
    const query = getRepository(UserModel)
      .createQueryBuilder("user")
    query.where(filter);
    return await query.getOne();
  }

  async findByIdAll(id: string): Promise<UserModel> {
    if (!id) return null;
    return await this.findUserCustomAll(<UserModel>{ id: id });
  }

  async findUserCustomAll(filter: UserModel): Promise<UserModel> {
    const query = getRepository(UserModel)
      .createQueryBuilder("user")
    query.where(filter);
    return await query.getOne();
  }

  async findByEmail(email: string): Promise<UserModel> {
    const query = getRepository(UserModel)
      .createQueryBuilder("user")
    query.where("user.email = :email", {
      email: email,
    });
    return await query.getOne();
  }

  async update(id: string, data: UserModel): Promise<UserModel> {
    // data.updatedAt = DateUtils.now();
    await getRepository(UserModel).save({ id, ...data });
    return data;
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(UserModel);
    await repo.delete(id);
  }

  async getAllPagging(request: GetAllUsersDto): Promise<UserModel[]> {
    const repo = getRepository(UserModel);
    const query = repo
      .createQueryBuilder("user")
    this.setFilters(request, query);

    return query.getMany();
  }

  private setFilters(
    request: GetAllUsersDto,
    query: SelectQueryBuilder<UserModel>
  ): void {
    query.where("1 = 1");

    if (request.userId) {
      query.andWhere("user.id = :userId", {
        userId: request.userId,
      });
    }

    if (request.name) {
      query.andWhere("user.userName ILIKE :userName", {
        userName: "%" + request.name + "%",
      });
    }

    if (request.email) {
      query.andWhere("user.email = :email", {
        email: request.email,
      });
    }
  }
}
