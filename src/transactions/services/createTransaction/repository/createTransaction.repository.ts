import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/shared/database/postgres/database.service';
import { CreateTransactionInputDto } from '../dto/createTransactionInput.dto';

@Injectable()
export class CreateTransactionRepository {
    constructor(private readonly dataBaseService: DataBaseService) {}

    async addTransaction(data: CreateTransactionInputDto): Promise<void> {
        const sql = `
        INSERT INTO TRANSACTIONS (
            ID_USUARIO,
            DESCRICAO,
            PRECO,
            CATEGORIA
        ) VALUES (
            $1,
            $2,
            $3,
            $4
        )
        `;

        const binds = [
            data.usuario_id,
            data.descricao.toUpperCase(),
            data.preco,
            data.categoria.toUpperCase(),
        ];

        await this.dataBaseService.query(sql, binds);
    }
}
