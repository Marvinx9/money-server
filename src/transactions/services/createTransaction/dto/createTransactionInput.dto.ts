import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionInputDto {
    @ApiProperty({ description: 'título da transação' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'valor da transação' })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    amount: number;

    @ApiProperty({ description: 'categoria da transação' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ description: 'tipo de transação' })
    @IsString()
    @IsNotEmpty()
    @IsIn(['deposit', 'withdraw'])
    type: string;

    user_id?: number;
}
