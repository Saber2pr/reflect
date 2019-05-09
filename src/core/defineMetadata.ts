/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:35:52
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-09 12:37:24
 */
import { MetadataKey, MetadataValue, DEFAULTKAY, MetadataMap } from './type'

export const Metadata = new WeakMap<Object, Map<PropertyKey, MetadataMap>>()

export function defineMetadata(
  metadataKey: MetadataKey,
  metadataValue: MetadataValue,
  target: Object,
  propertyKey: PropertyKey = DEFAULTKAY
) {
  if (typeof target !== 'object' && typeof target !== 'function') {
    throw new TypeError()
  }

  if (propertyKey && !['string', 'symbol'].includes(typeof propertyKey)) {
    throw new TypeError()
  }

  const targetMetadata =
    Metadata.get(target) || new Map<PropertyKey, MetadataMap>()
  Metadata.set(target, targetMetadata)

  const metadataMap: MetadataMap = targetMetadata.get(propertyKey) || new Map()
  targetMetadata.set(propertyKey, metadataMap)

  metadataMap.set(metadataKey, metadataValue)
}
