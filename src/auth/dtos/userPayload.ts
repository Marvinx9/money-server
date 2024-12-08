export interface UserPayload {
    sub: string;
    id: string;
    email: string;
    nome: string;
    iat?: number;
    exp?: number;
}
