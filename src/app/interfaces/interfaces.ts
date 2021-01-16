export interface DatosConJwt {
    jwt: string;
}

export interface Mensaje {
    id: number;
    remitente: UsuarioMinimo,  // Sólo me interesa nombre e id
    destinatarios: UsuarioMinimo[], // Sólo nombre de usuario e id
    fecha: Date;
    asunto: string;
    cuerpo: string;
    leido: boolean;
    archivado: boolean;
    fechaEliminacion: Date;
    spam: boolean;
}
export interface UsuarioMinimo {
    id: number;
    nombre: string;
}
export interface Usuario {
    id: number;
    nombre: string;
    usuario: string;
    password: string;
    email: string;
    fechaNacimiento: Date;
    fechaEliminacion: Date;
    nacionalidad: number;
    sexo: number;
    imagen: string;
}

export interface Nacionalidad {
    id: number;
    descripcion: string;
}

export interface TipoSexo {
    id: number;
    descripcion: string;
}

export interface ListadoMensajes {
    mensajes: Mensaje[];
    totalMensajes: number;

}