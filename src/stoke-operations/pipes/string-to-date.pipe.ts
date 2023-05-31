import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class StringToDatePipe implements PipeTransform<any, any> {
  transform(value: any) {
    const propertyName = 'operationDate';

    if (!value[propertyName] || typeof value[propertyName] !== 'string') {
      throw new BadRequestException(
        'Invalid operationDate type. A string is expected',
      );
    }

    const transformedValue = {
      ...value,
      [propertyName]: new Date(value[propertyName]),
    };

    return transformedValue;
  }
}
