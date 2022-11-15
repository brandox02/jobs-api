import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MenuWhereInput } from './dto/index.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly repo: Repository<Menu>,
    private readonly utils: UtilsProvider,
  ) {}
  // create(createMenuInput: CreateMenuInput) {
  //   return 'This action adds a new menu';
  // }

  async findAll(where: FindOptionsWhere<Menu> = {}): Promise<Menu[]> {
    return await this.repo.find({ where });
  }

  // async find({
  //   skip,
  //   take,
  //   where,
  // }: FindAllInput<MenuWhereInput>): Promise<Menu[]> {
  //   return await this.repo.find({
  //     where: this.utils.removeNullFields(where),
  //     skip,
  //     take,
  //   });
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} menu`;
  // }

  // update(id: number, updateMenuInput: UpdateMenuInput) {
  //   return `This action updates a #${id} menu`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} menu`;
  // }
}
