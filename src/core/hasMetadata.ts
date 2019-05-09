/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:40:03
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:40:03
 */
import { MetadataKey } from './type'
import { getMetadataKeys } from './getMetadataKeys'

export function hasMetadata(
  metadataKey: MetadataKey,
  target: Object,
  propertyKey?: PropertyKey
) {
  const metadataKeys = getMetadataKeys(target, propertyKey)
  return metadataKeys.includes(metadataKey)
}
