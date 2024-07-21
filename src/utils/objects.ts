export default function isPlainObject(value: unknown): value is object {
  if (typeof value !== 'object' || value === null) return false;

  const proto = Object.getPrototypeOf(value);
  if (proto === null) return true;

  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null)
    baseProto = Object.getPrototypeOf(baseProto);

  return proto === baseProto;
}

export const mapEntries = <
  T extends object,
  K extends keyof T,
  V extends T[K],
  R,
>(
  obj: T,
  cb: (value: [K, V], index: number, array: [K, V][]) => R,
): R[] => (Object.entries(obj) as [K, V][]).map(cb);

export const stripUndefined = <T extends Record<PropertyKey, unknown>>(
  obj: T,
) => {
  if (!isPlainObject(obj)) return obj;

  const copy = { ...obj };
  mapEntries(copy, ([k, v]) => {
    if (v === undefined) delete copy[k];
  });
  return copy;
};
