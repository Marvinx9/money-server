import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';
import { FindTransactionInputDto } from '../dto/findTransactionInput.dto';
import { FindTransactionOutputDto } from '../dto/findTransactionOutput.dto';

@Injectable()
export class FindTransactionRepository {
    constructor(private readonly dataBaseService: DataBaseService) {}

    async findTransaction(
        data: FindTransactionInputDto,
    ): Promise<FindTransactionOutputDto[]> {
        const sql = `
            SELECT
                ID,
                USER_ID,
                TITLE,
                AMOUNT,
                CATEGORY,
                TYPE,
                CREATED_AT
            FROM TRANSACTIONS
            WHERE USER_ID = $1
             AND (
              UPPER(CATEGORY) LIKE '%' || UPPER($2) || '%' 
              OR UPPER(TITLE) LIKE '%' || UPPER($2) || '%'
            )
        `;

        const binds = [data.usuario_id, data.search?.toUpperCase() ?? ''];
        return await this.dataBaseService.query(sql, binds);
    }
}
