import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { clone } from 'lodash';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateMenuInput, UpdateMenuInput } from './dto/index.input';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly repo: Repository<Menu>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly utils: UtilsProvider,
    private readonly cloudinary: CloudinaryService,
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
    const items = await Promise.all(
      ((input.json as any).items as Array<any>).map(async (item) => {
        const itemCopy = clone(item);
        if (itemCopy.header?.image) {
          const { public_id, url } = await this.cloudinary.uploadImage(
            itemCopy.header?.image,
            itemCopy.header?.imageId,
          );
          itemCopy.header.imageUrl = url;
          itemCopy.header.imageId = public_id;
          delete itemCopy.header?.image;
        }

        if (item.fieldsetTypeId === 1) {
          itemCopy.items = await Promise.all(
            itemCopy.items.map(async (item: any) => {
              const itemCopy = clone(item);
              if (itemCopy?.image) {
                const { public_id, url } = await this.cloudinary.uploadImage(
                  itemCopy?.image,
                  itemCopy?.imageId,
                );
                itemCopy.imageUrl = url;
                itemCopy.imageId = public_id;
                delete itemCopy.image;
              }
              return itemCopy;
            }),
          );
        }

        return itemCopy;
      }),
    );

    const json = { ...input.json, items };

    await this.repo.save(this.repo.create({ ...input, json }));
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
    // await Promise.all((item.json as any).items.map(async item => {
    //   this.cloudinary.destroyImage(item.)
    //   return item;
    // }));
    await this.repo.delete({ id });

    return item;
  }
}
