export interface AuthResponse {
    "status": boolean
    "message": string
    "uid": string
    "email": string
    "nombre": string
    "apellido": string
    "JWtoken": string
}

export interface Usuario {
    uid: string
    nombre: string
    apellido: string
}