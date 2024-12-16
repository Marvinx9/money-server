import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';
import { CreateUserInputDto } from '../dto/createUserInput.dto';

@Injectable()
export class CreateUserRepository {
    constructor(private dataBaseService: DataBaseService) {}

    async verifyDuplicity(e_mail: string): Promise<number> {
        const sql = `
        SELECT
            ID
        FROM USERS
        WHERE UPPER(E_MAIL) = $1
        `;

        const binds = [e_mail.toUpperCase()];

        const result = await this.dataBaseService.query<{ id: number }>(
            sql,
            binds,
        );

        return result[0]?.id ?? undefined;
    }

    async createUser(id: string, data: CreateUserInputDto): Promise<void> {
        const sql = `
        INSERT INTO USERS
        (
            NAME,
            SURNAME,
            E_MAIL,
            PASSWORD
        ) VALUES (
            $1,
            $2,
            $3,
            $4
        )
            `;

        const binds = [
            data.name.toUpperCase(),
            data.surname.toUpperCase(),
            data.e_mail,
            data.password,
        ];

        await this.dataBaseService.query(sql, binds);
    }
}
