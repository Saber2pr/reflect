/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:38:00
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:38:00
 */
import { MetadataKey } from './type'
import { getMetadataMap } from './getMetadataMap'
import { getOwnMetadataMap } from './getOwnMetadataMap'

export function getMetadata<T>(
  metadataKey: MetadataKey,
  target: Object,
  propertyKey?: PropertyKey
): T {
  const metadataMap = getMetadataMap(target, propertyKey)
  if (!metadataMap) return

  return metadataMap.get(metadataKey)
}

export function getOwnMetadata<T>(
  metadataKey: MetadataKey,
  target: Object,
  propertyKey?: PropertyKey
): T {
  const metadataMap = getOwnMetadataMap(target, propertyKey)
  if (!metadataMap) return

  return metadataMap.get(metadataKey)
}
