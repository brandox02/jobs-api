import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { CreateMenuInput, UpdateMenuInput } from './dto/index.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly repo: Repository<Menu>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly utils: UtilsProvider,
  ) {}

  async findOne(where: FindOptionsWhere<Menu>): Promise<Menu> {
    const withoutNull = this.utils.removeNullFields(where);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('Menu');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
    });

    if (!item) {
      throw NotFoundException('Menu');
    }
    return item;
  }

  async findAll(where: FindOptionsWhere<Menu> = {}): Promise<Menu[]> {
    return this.repo.find({ where, order: { id: 'ASC' } });
  }

  async update(input: UpdateMenuInput): Promise<Menu> {
    await this.repo.save(this.repo.create(input));
    return this.findOne({ id: input.id });
  }

  async create(input: CreateMenuInput): Promise<Menu> {
    return this.dataSource.transaction(async (transaction) => {
      const repo = transaction.getRepository(Menu);
      const menu = await repo.save(this.repo.create(input));
      const newJson = { ...menu.json, typeId: menu.id };
      await repo.update({ id: menu.id }, { json: newJson });
      return repo.findOne({ where: { id: menu.id } });
    });
  }

  async delete(id: number): Promise<Menu> {
    const item = await this.repo.findOne({ where: { id } });
    await this.repo.delete({ id });

    return item;
  }
}
