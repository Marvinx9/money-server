import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';

@Injectable()
export class ValidateUserRepository {
    constructor(private readonly dataBaseService: DataBaseService) {}

    async findByEmail(
        email: string,
    ): Promise<{ id: number; nome: string; email: string; password: string }> {
        const sql = `
            SELECT
                ID,
                NOME,
                EMAIL,
                PASSWORD
            FROM USUARIOS WHERE UPPER(EMAIL) = $1
        `;
        const binds = [email.toUpperCase()];

        const result = await this.dataBaseService.query<{
            id: number;
            nome: string;
            email: string;
            password: string;
        }>(sql, binds);

        return result[0] ?? undefined;
    }
}
