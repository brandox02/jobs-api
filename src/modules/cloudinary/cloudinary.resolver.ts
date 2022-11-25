import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { CloudinaryService } from './cloudinary.service';

@Resolver()
export class CloudinaryResolver {
  constructor(private readonly service: CloudinaryService) {}

  @Mutation(() => Boolean)
  async destroyImage(@Args('publicId') publicId: string): Promise<boolean> {
    return this.service.destroyImage(publicId);
  }
}
