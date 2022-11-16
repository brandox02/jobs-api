import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { GeneralParameterWhereInput } from './dto/general-paremeter-where.input';
import { GeneralParameter } from './entities/general-parameter.entity';

@Injectable()
export class GeneralParameterService {
  constructor(
    @InjectRepository(GeneralParameter)
    private readonly repo: Repository<GeneralParameter>,
    private readonly utils: UtilsProvider, // @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findOne(
    where: FindOptionsWhere<GeneralParameterWhereInput>,
  ): Promise<GeneralParameter> {
    const withoutNull = this.utils.removeNullFields(where);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('General Parameter');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
    });

    if (!item) {
      throw NotFoundException('General Parameter');
    }
    return item;
  }

  async findAll(
    where: FindOptionsWhere<GeneralParameterWhereInput> = {},
  ): Promise<GeneralParameter[]> {
    return this.repo.find({
      where: this.utils.removeNullFields(where),
      order: { createdAt: 'DESC' },
    });
  }
}
