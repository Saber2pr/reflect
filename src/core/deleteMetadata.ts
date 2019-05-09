/*
 * @Author: saber2pr 
 * @Date: 2019-05-09 12:40:54 
 * @Last Modified by:   saber2pr 
 * @Last Modified time: 2019-05-09 12:40:54 
 */
import { MetadataKey } from './type'
import { getOwnMetadataMap } from './getOwnMetadataMap'

export function deleteMetadata(
  metadataKey: MetadataKey,
  target: Object,
  propertyKey?: PropertyKey
) {
  const metadataMap = getOwnMetadataMap(target, propertyKey)
  if (!metadataMap) return false

  return metadataMap.delete(metadataKey)
}
