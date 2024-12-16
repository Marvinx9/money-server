export interface UserPayload {
    sub: string;
    id: string;
    e_mail: string;
    name: string;
    iat?: number;
    exp?: number;
}
