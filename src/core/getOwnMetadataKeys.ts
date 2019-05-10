/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:38:59
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:38:59
 */
import { MetadataKey } from './type'
import { getOwnMetadataMap } from './getOwnMetadataMap'

export function getOwnMetadataKeys(
  target: Object,
  propertyKey?: PropertyKey
): MetadataKey[] {
  const metadataMap = getOwnMetadataMap(target, propertyKey)
  if (!metadataMap) return []

  return Array.from(metadataMap.keys())
}
