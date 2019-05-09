/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:40:26
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:40:26
 */
import { MetadataKey } from './type'
import { getOwnMetadataKeys } from './getOwnMetadataKeys'

export function hasOwnMetadata(
  metadataKey: MetadataKey,
  target: Object,
  propertyKey?: PropertyKey
) {
  const metadataKeys = getOwnMetadataKeys(target, propertyKey)
  return metadataKeys.includes(metadataKey)
}
