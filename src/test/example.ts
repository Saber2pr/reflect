/*
 * @Author: saber2pr 
 * @Date: 2019-05-09 10:29:02 
 * @Last Modified by:   saber2pr 
 * @Last Modified time: 2019-05-09 10:29:02 
 */
import { Reflect } from '..'

@Reflect.metadata('inClass', 'A')
class Test {
  constructor(private test?: Test) {}
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world'
  }
}

console.log(Reflect.getMetadata('inClass', Test)) // 'A'
console.log(Reflect.getMetadata('design:paramtypes', Test)) // [ [Function: Test] ]
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')) // 'B'
