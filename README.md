# @saber2pr/reflect

> Typescript Reflector.

> `PASS: 已通过所有官方测试用例`

```bash
# from npm
npm install @saber2pr/reflect

# from github
git clone https://github.com/Saber2pr/reflect.git
```

---

# Reflect-metadata

```ts
@Reflect.metadata('inClass', 'A')
class Test {
  constructor(private test?: Test) {}
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world'
  }
}

console.log(Reflect.getMetadata('inClass', Test)) // 'A'
console.log(Reflect.getMetadata('design:paramtypes', Test)) // [ [Function: Test] ]
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')) // 'B'
```

## What is Reflect-metadata?

Reflect Metadata 是 ES7 的一个提案，它主要用来在声明的时候添加和读取元数据。

[>> Reflect Metadata](https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#reflect-metadata)

---

## API

1. Reflect.defineMetadata

> 定义元数据

```ts
function defineMetadata(
  metadataKey: MetadataKey,
  metadataValue: MetadataValue,
  target: Object,
  propertyKey?: string
): void
```

2. Reflect.getMetadata

> 获取元数据

```ts
function getMetadata<T>(
  metadataKey: MetadataKey,
  target: Object,
  propertyKey?: string
): T
```

3. Reflect.getMetadataKeys

> 获取所有元数据键

```ts
function getMetadataKeys(target: Object, propertyKey?: string)
```

4. Reflect.metadata

> 元数据装饰器

```ts
function metadata(metadataKey: MetadataKey, metadataValue: MetadataValue)
```

`! tsconfig 需开启 experimentalDecorators: true`

## 元数据设计键

`! tsconfig 需开启 emitDecoratorMetadata: true`

1. design:type

2. design:paramtypes

3. design:returntype

[>> Reflect 反射规则](https://rbuckton.github.io/reflect-metadata/#syntax)

---

## start

```bash
npm install
```

```bash
npm start

npm test
```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
