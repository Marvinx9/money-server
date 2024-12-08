import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';
import { CreateUserInputDto } from '../dto/createUserInput.dto';

@Injectable()
export class CreateUserRepository {
    constructor(private dataBaseService: DataBaseService) {}

    async verifyDuplicity(email: string): Promise<number> {
        const sql = `
        SELECT
            ID
        FROM USUARIOS;
        WHERE UPPER(EMAIL) = $1
        `;

        const binds = [email.toUpperCase()];

        const result = await this.dataBaseService.query<{ id: number }>(
            sql,
            binds,
        );

        return result[0]?.id ?? undefined;
    }

    async createUser(id: string, data: CreateUserInputDto): Promise<void> {
        const sql = `
        INSERT INTO USUARIOS
        (
            NOME,
            SOBRENOME,
            EMAIL,
            PASSWORD
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        )
            `;

        const binds = [
            data.nome.toUpperCase(),
            data.sobrenome,
            data.email,
            data.password,
        ];

        await this.dataBaseService.query(sql, binds);
    }
}
