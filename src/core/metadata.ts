/*
 * @Author: saber2pr
 * @Date: 2019-05-09 12:39:39
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-09 12:53:57
 */
import { MetadataKey, MetadataValue } from './type'
import { defineMetadata } from './defineMetadata'

export function metadata(
  metadataKey: MetadataKey,
  metadataValue: MetadataValue
) {
  return (target: Object, propertyKey?: string) =>
    defineMetadata(metadataKey, metadataValue, target, propertyKey)
}
