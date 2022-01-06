

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
    puntos:string,
    p_j:string,
    p_g:string,
    p_e:string,
    p_p:string,
    g_g:string,
    g_c:string,
    d_g:string
}