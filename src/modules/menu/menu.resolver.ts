import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import {
  CreateMenuInput,
  MenuWhereInput,
  UpdateMenuInput,
} from './dto/index.input';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => [Menu], { name: 'menuListl' })
  findAll(
    @Args('where', { nullable: true }) where: MenuWhereInput,
  ): Promise<Menu[]> {
    return this.menuService.findAll(where);
  }

  @Mutation(() => Menu)
  async updateMenu(@Args('input') input: UpdateMenuInput): Promise<Menu> {
    return this.menuService.update(input);
  }

  @Mutation(() => Menu)
  async createMenu(@Args('input') input: CreateMenuInput): Promise<Menu> {
    return this.menuService.create(input);
  }

  @Mutation(() => Menu)
  async deleteMenu(@Args('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }

  @Query(() => Menu)
  async menu(@Args('where') where: MenuWhereInput): Promise<Menu> {
    return this.menuService.findOne(where);
  }

  @Query(() => [Menu])
  async menuList(
    @Args('where', { defaultValue: {}, nullable: true }) where: MenuWhereInput,
  ): Promise<Menu[]> {
    return this.menuService.findAll(where);
  }
}
