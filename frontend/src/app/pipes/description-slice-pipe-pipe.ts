import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionSlicePipe',
})
export class DescriptionSlicePipePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 10): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return `${value.slice(0, limit)}...`;
  }
}
