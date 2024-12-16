import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';
import { CreateTransactionInputDto } from '../dto/createTransactionInput.dto';

@Injectable()
export class CreateTransactionRepository {
    constructor(private readonly dataBaseService: DataBaseService) {}

    async findUserById(user_id: number): Promise<number> {
        const sql = `
            SELECT
                ID
            FROM USERS
            WHERE ID = $1
        `;

        const binds = [user_id];

        const result = await this.dataBaseService.query<{ id: number }>(
            sql,
            binds,
        );

        return result[0]?.id ?? undefined;
    }

    async addTransaction(data: CreateTransactionInputDto): Promise<void> {
        const sql = `
        INSERT INTO TRANSACTIONS (
            USER_ID,
            TITLE,
            AMOUNT,
            CATEGORY,
            TYPE
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        `;

        const binds = [
            data.user_id,
            data.title.toUpperCase(),
            data.amount,
            data.category.toUpperCase(),
            data.type,
        ];

        await this.dataBaseService.query(sql, binds);
    }
}
