import { Resolver, Query, Args } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { MenuWhereInput } from './dto/index.input';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  // @Mutation(() => Menu)
  // createMenu(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
  //   return this.menuService.create(createMenuInput);
  // }

  @Query(() => [Menu], { name: 'menusAll' })
  findAll(
    @Args('where', { nullable: true }) where: MenuWhereInput,
  ): Promise<Menu[]> {
    return this.menuService.findAll(where);
  }

  // @Query(() => Menu, { name: 'menu' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.menuService.findOne(id);
  // }

  // @Mutation(() => Menu)
  // updateMenu(@Args('updateMenuInput') updateMenuInput: UpdateMenuInput) {
  //   return this.menuService.update(updateMenuInput.id, updateMenuInput);
  // }

  // @Mutation(() => Menu)
  // removeMenu(@Args('id', { type: () => Int }) id: number) {
  //   return this.menuService.remove(id);
  // }
}
