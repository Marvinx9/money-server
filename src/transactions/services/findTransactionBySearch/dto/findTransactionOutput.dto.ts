import { ApiProperty } from '@nestjs/swagger';

export class FindTransactionOutputDto {
    @ApiProperty({ description: 'identificador da transação' })
    id: number;

    @ApiProperty({ description: 'descrição da transação' })
    descricao: string;

    @ApiProperty({ description: 'valor da transação' })
    preco: number;

    @ApiProperty({ description: 'categoria da transação' })
    categoria: string;

    @ApiProperty({ description: 'data dew criação da transação' })
    created_at: number;
}
