/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:39:11
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:39:11
 */
import { MetadataKey } from './type'
import { getOwnMetadataKeys } from './getOwnMetadataKeys'

export function getMetadataKeys(
  target: Object,
  propertyKey?: PropertyKey
): MetadataKey[] {
  const ownKeys = getOwnMetadataKeys(target, propertyKey)

  const protoKeys = getOwnMetadataKeys(
    Object.getPrototypeOf(target),
    propertyKey
  )

  return [].concat(...ownKeys, ...protoKeys)
}
