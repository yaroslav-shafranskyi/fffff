export type IFCPropsWithReadonly<T = Record<string, unknown>> = T & {
    readonly?: boolean;
};
