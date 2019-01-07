export enum IStoredType {
    SCORE="Score",
    COPIA="Copia",
    PO="PO",
    NINGUNO="Ninguno",
}
export interface IStored{
	cantidad:number;
	tipo:IStoredType;
}
