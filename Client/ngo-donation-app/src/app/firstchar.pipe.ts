import { Pipe,PipeTransform  } from '@angular/core';

@Pipe({ name: 'firstchar' })
export class FirstCharPipe {
    transform(inputData) {
        if(inputData){
            return '\xa0\xa0' + inputData.toUpperCase().charAt() + '\xa0\xa0'; //Return first character. And space character in typescript
        }
        else {
            return '';
        }
    }
}