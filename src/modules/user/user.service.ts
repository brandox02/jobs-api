import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqueConstraint } from 'src/common/uniqueContraint';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserWhereInput } from './dto/user-where.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateUser } from './dto/index.output';
import { Paginate } from 'src/common/paginate-types';
// import { Paginate } from '../job/job.service';

@Injectable()
export class UserService {
  private relations: string[] = [
    'companyProfile',
    'candidateProfile',
    'applications',
    'createdJobs',
    'createdJobs.applications',
  ];
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    //private readonly fileUploadService: FileUploadService,
    private readonly utils: UtilsProvider,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async find({
    page,
    perPage,
    where,
    order,
    context,
  }: FindAllInput<UserWhereInput>): Promise<Paginate<User>> {
    const copyWhere: any = { ...where };

    if (where.belongToCvBank) {
      copyWhere.candidateProfile = { belongToCvBank: where.belongToCvBank };
      delete copyWhere.belongToCvBank;
    }
    const totalItems = await this.repo.count({
      where: this.utils.removeNullFields(copyWhere),
    });

    return {
      items: await this.repo.find({
        where: this.utils.removeNullFields(copyWhere),
        skip: perPage * page,
        take: perPage,
        relations: this.relations,
        order,
      }),
      metadata: {
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
      },
    };
  }

  async findOne(where: UserWhereInput): Promise<User | null> {
    const filteredWhere = this.utils.removeNullFields(where);
    if (Object.keys(filteredWhere).length > 0) {
      const user = await this.repo.findOne({
        where: filteredWhere,
        order: {
          createdAt: 'ASC',
        },
        relations: this.relations,
      });

      if (!user) {
        throw NotFoundException();
      }
      return user;
    }
    return null;
  }

  async create(user: CreateUserInput): Promise<User> {
    await uniqueConstraint(this.repo, user, ['email']);

    const userSaved = await this.repo.save(this.repo.create(user));
    if (!userSaved) throw new Error('User could not saved correctly');
    return this.repo.findOne({ where: { id: userSaved.id } });
  }

  async update(user: UpdateUserInput): Promise<UpdateUser> {
    const userSaved: any = await this.repo.save(this.repo.create(user as any));
    const userFinded = await this.repo.findOne({
      where: { id: userSaved.id },
      relations: ['companyProfile', 'candidateProfile'],
    });
    const token = await this.authService.getToken(userFinded);

    return { accessToken: token, user: userFinded };
  }

  async updatePassword({
    userId,
    currentPassword,
    newPassword,
  }: {
    userId: number;
    currentPassword: string;
    newPassword: string;
  }): Promise<string> {
    const user = await this.findOne({ id: userId });
    const isEqual = await bcrypt.compare(currentPassword, user.password);

    if (!isEqual) {
      return 'UMMATCH_PASS_CURR';
    }
    if (currentPassword === newPassword) {
      return 'MATCH_NEW_PASS_AND_OLD';
    }

    const salt = await bcrypt.genSalt();

    await this.repo.save(
      this.repo.create({
        id: userId,
        password: await bcrypt.hash(newPassword, salt),
      }),
    );
    return '';
  }
}
