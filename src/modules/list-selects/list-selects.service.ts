import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { isNil, omitBy } from 'lodash';

import { DataSource } from 'typeorm';

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
}
