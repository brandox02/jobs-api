import { Args, Query, Resolver } from '@nestjs/graphql';
import { Category } from 'src/entities/Category.entity';
import { City } from 'src/entities/City.entity';
import { Country } from 'src/entities/Country.entity';
import { DailyWorkTime } from 'src/entities/DailyWorkTime.entity';
import { Education } from 'src/entities/Education.entity';
import { EmploymentContract } from 'src/entities/EmploymentContract.entity';
import { ExperienceTime } from 'src/entities/ExperienceTime.entity';
import { Gender } from 'src/entities/Gender.entity';
import { WorkingModality } from 'src/entities/WorkingModality.entity';
import { ListSelectsService } from './list-selects.service';

@Resolver()
export class ListSelectsResolver {
  constructor(private readonly service: ListSelectsService) {}

  @Query(() => [Gender])
  async genders(): Promise<Gender[]> {
    return this.service.findAll({ entity: Gender });
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.service.findAll({ entity: Category });
  }

  @Query(() => [City])
  async cities(
    @Args('countryId', { nullable: true }) countryId: number,
  ): Promise<City[]> {
    if (!countryId) {
      return [];
    }
    return this.service.findAll({
      entity: City,
      relations: ['country'],
      where: {
        countryId,
      },
    });
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return this.service.findAll({ entity: Country });
  }

  @Query(() => [DailyWorkTime])
  async dailyWorkTimes(): Promise<DailyWorkTime[]> {
    return this.service.findAll({ entity: DailyWorkTime });
  }

  @Query(() => [EmploymentContract])
  async employmentContracts(): Promise<EmploymentContract[]> {
    return this.service.findAll({ entity: EmploymentContract });
  }

  @Query(() => [ExperienceTime])
  async experienceTimes(): Promise<ExperienceTime[]> {
    return this.service.findAll({ entity: ExperienceTime });
  }

  @Query(() => [WorkingModality])
  async workingModalities(): Promise<WorkingModality[]> {
    return this.service.findAll({ entity: WorkingModality });
  }

  @Query(() => [Education])
  async educations(): Promise<Education[]> {
    return this.service.findAll({ entity: Education });
  }
}
