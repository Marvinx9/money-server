import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';

@Injectable()
export class ValidateUserRepository {
    constructor(private readonly dataBaseService: DataBaseService) {}

    async findByUsername(
        username: string,
    ): Promise<{ id: number; name: string; e_mail: string; password: string }> {
        const sql = `
            SELECT
                ID,
                NAME,
                E_MAIL,
                PASSWORD
            FROM USERS
            WHERE (
              UPPER(E_MAIL) = $1 
              OR UPPER(NAME) = $1
            )
        `;
        const binds = [username.toUpperCase()];
        const result = await this.dataBaseService.query<{
            id: number;
            name: string;
            e_mail: string;
            password: string;
        }>(sql, binds);

        return result[0] ?? undefined;
    }
}
