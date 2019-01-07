export enum PersonaTipo {
	AUTOR = 'Autor',
	ARREGLISTA = 'Arreglista',
	ADAPTADOR = 'Adaptador',
	ORQUESTADOR = 'Orquestador',
	EDITOR = 'Editor',
	TRANSCRIPTOR = 'Transcriptor',
	UPLOADER = 'Subidor',
}
export interface Persona {
	nombre: string;
	apellido?: string;
	tipo: PersonaTipo;
	_id?: any;
}
