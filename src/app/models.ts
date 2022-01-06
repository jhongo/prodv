

export interface User{
    uid: string,
    email: string,
    displayName:string;
    emailVerified: boolean;
}

export interface DataUser{
    uid: string,
    email: string,
    name:string;
    password:string;
    referencia:string;
}


export interface Equipos{
    uid:string,
    nombre:string,
    escudo:string,
    grupo:string,
    puntos:number,
    p_j:number,
    p_g:number,
    p_e:number,
    p_p:number,
    g_g:number,
    g_c:number,
    d_g:number
}

export interface Encuentro{

    uid:string,
    tipo:string,
    fecha:Date,
    grupo:string,
    uid_e1:string,
    uid_e2:string,
    estado:string,
    res_e1:number,
    res_e2:number,
    escudo_e1:string,
    escudo_e2:string,
    nombre_e1:string,
    nombre_e2:string,

}