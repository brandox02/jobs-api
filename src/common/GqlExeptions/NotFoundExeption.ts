import { GraphQLError } from 'graphql';
import { HttpStatus } from '@nestjs/common';

export const NotFoundException = (resource = 'Resource') =>
  new GraphQLError(`${resource} not found`, {
    extensions: {
      exception: {
        code: HttpStatus.NOT_FOUND.toString(),
      },
    },
  });
