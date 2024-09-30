import {Blockchain} from '@ton/sandbox'
import {Address, beginCell, Builder, Cell, Dictionary, DictionaryValue, Slice} from '@ton/core'
import '@ton/test-utils'
import {compileFunc} from "@ton-community/func-js"
import * as fs from "node:fs"
import {JettonMinter} from "../wrappers/JettonMinter"

async function compileContract(): Promise<Cell> {
    let compileResult = await compileFunc({
        targets: ['contracts/jetton-minter.func'],
        sources: (x) => fs.readFileSync(x).toString("utf8"),
    })

    if (compileResult.status === "error") {
        console.error("Compilation Error!")
        console.error(`\n${compileResult.message}`)
        process.exit(1)
    }

    return Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
}

const sliceValue: DictionaryValue<Slice> = {
    serialize: (src: Slice, builder: Builder) => {
        builder.storeSlice(src)
    },
    parse: (src: Slice) => {
        return src.clone();
    }
}

describe('TvmTest', () => {
    let code: Cell
    let blockchain: Blockchain

    beforeAll(async () => {
        code = await compileContract()
    })

    beforeEach(async () => {
        blockchain = await Blockchain.create()
    })

    it('test-0', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 57).endCell()).storeUint(BigInt("0b0"), 57).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 1).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-1', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 976).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 976).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 976).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 976).endCell()).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-2', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-3', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-4', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-5', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 32).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-6', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-7', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-8', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-9', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-10', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 16).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-11', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-12', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-13', async () => {
        const data = beginCell().storeUint(BigInt("0b1000000000000000000000000000000000000000000000000000000000000000"), 64).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-14', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-15', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 389).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 389).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-16', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-17', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 65535,
        })
    })

    it('test-18', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01010111011100111101000111110101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 77,
        })
    })

    it('test-19', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01010111011100111101000111110101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-20', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01001000010000000110011001001111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 76,
        })
    })

    it('test-21', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b010010000100000001100110010011110000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-22', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00101100011101101011100101110011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 75,
        })
    })

    it('test-23', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b001011000111011010111001011100110000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 73786976294848206464n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            73786976294848206464n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-24', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00101100011101101011100101110011000000000000000000000000000000000000000000000000000000000000000000"), 98).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 73786976294848206464n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            73786976294848206464n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-25', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b011110111101110110010111110111100000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-26', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0111101111011101100101111101111000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-27', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0111101111011101100101111101111000000000000000000000000000000000000000000000000000000000000000000000"), 100).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-28', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00010110011101001011000010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 73,
        })
    })

    it('test-29', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b000101100111010010110000101000000000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-30', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0001011001110100101100001010000000000000000000000000000000000000000000000000000000000000000000000000"), 100).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-31', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b000101100111010010110000101000000000000000000000000000000000000000000000000000000000000000000000001000"), 102).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-32', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00010110011101001011000010100000000000000000000000000000000000000000000000000000000000000000000000000000"), 104).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-33', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0001011001110100101100001010000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000100000"), 172).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-34', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b000101100111010010110000101000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 108).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-35', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00010110011101001011000010100000000000000000000000000000000000000000000000000000000000000000000000000000000100"), 110).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 9,
        })
    })

    it('test-36', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00010110011101001011000010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonMinter(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 75,
        })
    })
})