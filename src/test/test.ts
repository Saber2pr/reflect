/*
 * @Author: saber2pr
 * @Date: 2019-05-08 15:01:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-08 15:14:32
 */
import { Reflect } from '../core/saber-reflect'

@Reflect.metadata('inClass', 'A')
class Test {
  constructor(private test?: Test) {}
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world'
  }
}

console.log(Reflect.getMetadata('inClass', Test))
console.log(Reflect.getMetadata('design:paramtypes', Test))
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello'))
// console.log(Reflect.(new Test()))
console.log(Reflect.getMetadataKeys(new Test()))
/**
 * [ 'design:returntype',
 *   'design:paramtypes',
 *   'design:type',
 *   'inMethod' ]
 */
