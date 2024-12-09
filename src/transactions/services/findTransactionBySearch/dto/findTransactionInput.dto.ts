import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTransactionInputDto {
    @ApiProperty({
        description: 'busca de histórico de transação por nome ou categoria',
    })
    @IsString()
    @IsOptional()
    search?: string;

    usuario_id?: number;
}
