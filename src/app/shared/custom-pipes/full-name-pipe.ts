import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNamePipe'
})
export class FullNamePipe implements PipeTransform {
  transform(value: string, other: string): string {
    return `${value} ${other}`;
  }
}