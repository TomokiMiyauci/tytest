type RequiredByKeys<T extends Record<PropertyKey, any>, P extends PropertyKey> =
  & {
    [K in keyof T as K extends P ? never : K]: T[K];
  }
  & {
    [K in keyof T as K extends P ? K : never]-?: Exclude<T[K], undefined>;
  };

export type { RequiredByKeys };
