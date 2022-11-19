import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { MenuWhereInput, UpdateMenuInput } from './dto/index.input';

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

  @Query(() => Menu)
  async menu(@Args('where') where: MenuWhereInput): Promise<Menu> {
    return this.menuService.findOne(where);
  }
}
