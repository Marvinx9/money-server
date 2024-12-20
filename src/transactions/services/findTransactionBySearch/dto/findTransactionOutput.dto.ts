import { ApiProperty } from '@nestjs/swagger';

export class FindTransactionOutputDto {
    @ApiProperty({ description: 'identificador da transação' })
    id: number;

    @ApiProperty({ description: 'identificador do usuário' })
    user_id: number;

    @ApiProperty({ description: 'título da transação' })
    title: string;

    @ApiProperty({ description: 'valor da transação' })
    amount: number;

    @ApiProperty({ description: 'categoria da transação' })
    category: string;

    @ApiProperty({ description: 'tipo de transação' })
    type: string;

    @ApiProperty({ description: 'data de criação da transação' })
    created_at: Date;
}
