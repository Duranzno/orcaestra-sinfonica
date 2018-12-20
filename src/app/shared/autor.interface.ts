export enum IPersonaTipo{
	AUTOR,
	ARREGLISTA,
	ADAPTADOR,
	ORQUESTADOR,
	EDITOR,
	TRANSCRIPTOR,
	UPLOADER,
}
export interface IPersona {
    first_name:string,
    last_name?:string,
    tipo:IPersonaTipo,
    _id?:any,
}
