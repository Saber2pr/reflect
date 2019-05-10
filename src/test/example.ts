/*
 * @Author: saber2pr
 * @Date: 2019-05-09 10:29:02
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-10 11:28:22
 */
import { Reflect } from '..'

@Reflect.metadata('inClass', 'A')
class Hello {
  constructor(private Hello?: Hello) {}
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world'
  }
}

console.log(Reflect.getMetadata('inClass', Hello)) // 'A'
console.log(Reflect.getMetadata('design:paramtypes', Hello)) // [ [Function: Test] ]
console.log(Reflect.getMetadata('inMethod', new Hello(), 'hello')) // 'B'
console.log(Reflect.get)
