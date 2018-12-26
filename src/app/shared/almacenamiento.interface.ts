export enum IStoredType {
    SCORE,
    COPIA,
    PO,
}
export interface IStored{
	cantidad:number;
	tipo:IStoredType;
}
