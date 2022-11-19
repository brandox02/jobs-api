import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateMenuInput } from './dto/index.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly repo: Repository<Menu>,
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
    return await this.repo.find({ where });
  }

  async update(orderInput: UpdateMenuInput): Promise<Menu> {
    await this.repo.save(this.repo.create(orderInput));
    return this.findOne({ id: orderInput.id });
  }
}
