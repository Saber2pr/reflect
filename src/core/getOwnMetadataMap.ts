/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:36:45
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-09 12:37:27
 */
import { DEFAULTKAY } from './type'
import { Metadata } from './defineMetadata'

export function getOwnMetadataMap(
  target: Object,
  propertyKey: PropertyKey = DEFAULTKAY
) {
  if (typeof target !== 'object' && typeof target !== 'function') {
    throw new TypeError()
  }

  const targetMetadata = Metadata.get(target)
  if (!targetMetadata) return

  const metadataMap = targetMetadata.get(propertyKey)
  if (!metadataMap) return

  return metadataMap
}
