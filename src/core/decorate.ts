/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:41:13
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:41:13
 */
export function decorate(
  decorators: (PropertyDecorator | MethodDecorator)[],
  target: Object | Function,
  propertyKey?: string | symbol,
  attributes?: PropertyDescriptor
): PropertyDescriptor {
  if (0 === decorators.length) {
    throw new TypeError()
  }

  return decorators.reduceRight(
    (target, decorator) => decorator(target, propertyKey, attributes) || target,
    <any>target
  )
}
