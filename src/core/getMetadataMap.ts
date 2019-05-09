/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:37:17
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-05-09 12:37:17
 */
import { DEFAULTKAY } from './type'
import { getOwnMetadataMap } from './getOwnMetadataMap'
import { Metadata } from './defineMetadata'

export function getMetadataMap(
  target: Object,
  propertyKey: PropertyKey = DEFAULTKAY
) {
  if (Boolean(getOwnMetadataMap(target, propertyKey))) {
    return getOwnMetadataMap(target, propertyKey)
  }

  const targetMetadata = Metadata.get(Object.getPrototypeOf(target))
  if (!targetMetadata) return

  const metadataMap = targetMetadata.get(propertyKey)
  if (!metadataMap) return

  return metadataMap
}
