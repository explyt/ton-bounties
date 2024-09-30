import {Address, Cell, Contract, ContractProvider, TupleItem} from '@ton/core'
import {Blockchain, createShardAccount, internal} from "@ton/sandbox"

export class SingleNominator implements Contract {
    constructor(readonly address: Address, readonly init: { code: Cell; data: Cell }) {}

    async internal(
        blockchain: Blockchain,
        sender: Address,
        body: Cell,
        value: bigint,
        bounce: boolean,
        bounced: boolean
    ) {
        return await blockchain.sendMessage(internal({
            from: sender,
            to: this.address,
            body: body,
            value: value ,
            bounce: bounce,
            bounced: bounced,
        }))
    }

    async initializeContract(blockchain: Blockchain, balance: bigint) {
        const contr = await blockchain.getContract(this.address);
        contr.account = createShardAccount({
            address: this.address,
            code: this.init.code,
            data: this.init.data,
            balance: balance,
            workchain: 0
        })
    }

    async get(provider: ContractProvider, name: string, args: TupleItem[]) {
        return await provider.get(name, args)
    }
}