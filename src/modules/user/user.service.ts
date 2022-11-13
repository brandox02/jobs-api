import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqueConstraint } from 'src/common/uniqueContraint';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsOrder, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
// import { FileUploadService } from "../file-upload/file-upload.provider";
import { UserInput, UserWhere } from './dto/index.input';
import { User } from './entities/user.entity';
import { LoginOutput } from '../auth/dto/index.output';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    //private readonly fileUploadService: FileUploadService,
    private readonly utils: UtilsProvider,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findAll(
    where: UserWhere,
    order: FindOptionsOrder<User> = { createdAt: 'ASC' },
  ): Promise<User[]> {
    const filteredWhere = this.utils.removeNullFields<User>(where);

    const users = await this.repo.find({
      where: filteredWhere,
      order,
    });
    return users;
  }

  async findOne(where: UserWhere): Promise<User | null> {
    const filteredWhere = this.utils.removeNullFields<User>(where);
    if (Object.keys(filteredWhere).length > 0) {
      const user = await this.repo.findOne({
        where: filteredWhere,
        order: {
          createdAt: 'ASC',
        },
        relations: {
          department: true,
          company: true,
        },
      });

      if (!user) {
        throw NotFoundException();
      }
      return user;
    }
    return null;
  }

  async save(user: UserInput): Promise<LoginOutput> {
    await uniqueConstraint(this.repo, user, ['cedula', 'email']);

    const userSaved = await this.repo.save(this.repo.create(user));
    if (!userSaved) throw new Error('User could not saved correctly');
    return this.authService.getToken(userSaved);
  }
}
