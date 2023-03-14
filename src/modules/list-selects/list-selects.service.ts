import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { isNil, omitBy } from 'lodash';
import { Category } from 'src/entities/Category.entity';

import { DataSource } from 'typeorm';
import { Job } from '../job/entities/job.entity';

interface FindAll {
  entity: any;
  relations?: string[];
  where?: any;
}

@Injectable()
export class ListSelectsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findAll<T>({ entity, relations, where = {} }: FindAll): Promise<T[]> {
    const repo = this.dataSource.getRepository(entity);
    const items = await repo.find({
      order: { id: 'ASC' },
      relations,
      where: omitBy(where, isNil),
    });

    return items as T[];
  }

  async getCategories(): Promise<Array<Category>> {
    const categories = await this.dataSource.getRepository(Category).find();
    const jobRepo = this.dataSource.getRepository(Job);
    return Promise.all(
      categories.map(async (category) => {
        const count = await jobRepo.count({
          where: { categoryId: category.id },
        });
        return { ...category, count };
      }),
    );
  }
}
