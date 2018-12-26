export enum PersonaTipo{
	AUTOR,
	ARREGLISTA,
	ADAPTADOR,
	ORQUESTADOR,
	EDITOR,
	TRANSCRIPTOR,
	UPLOADER,
}
export interface Persona {
		nombre:string;
    apellido?:string;
    tipo:PersonaTipo;
    _id?:any;
}
