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
                DESCRICAO,
                PRECO,
                CATEGORIA,
                CREATED_AT
            FROM TRANSACTIONS
            WHERE DELETED_AT IS NULL
            AND ID_USUARIO = $1
            AND 
            (
            UPPER(DESCRICAO) LIKE '%$1%' OR UPPER(CATEGORIA) LIKE '%$1%'
            )
        `;

        const binds = [data.usuario_id, data.search?.toUpperCase() ?? ''];

        return await this.dataBaseService.query(sql, binds);
    }
}
