import {Blockchain} from '@ton/sandbox'
import {Address, beginCell, Builder, Cell, Dictionary, DictionaryValue, Slice} from '@ton/core'
import '@ton/test-utils'
import {compileFunc} from "@ton-community/func-js"
import * as fs from "node:fs"
import {SingleNominator} from "../wrappers/SingleNominator"

async function compileContract(): Promise<Cell> {
    let compileResult = await compileFunc({
        targets: ['contracts/single-nominator.fc'],
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 267).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeUint(BigInt("0b0"), 16).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeUint(BigInt("0b0"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8195,
        })
    })

    it('test-9', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8192,
        })
    })

    it('test-10', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8193,
        })
    })

    it('test-11', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8197,
        })
    })

    it('test-12', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-13', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-14', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-15', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-16', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeUint(BigInt("0b01001110011100110111010001001011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-17', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0010"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-18', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-19', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-20', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 676).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-21', async () => {
        const data = beginCell().storeUint(BigInt("0b00100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 676).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
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
            exitCode: 8196,
        })
    })

    it('test-22', async () => {
        const data = beginCell().storeUint(BigInt("0b100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8195,
        })
    })

    it('test-23', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8192,
        })
    })

    it('test-24', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8193,
        })
    })

    it('test-25', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8197,
        })
    })

    it('test-26', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-27', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-28', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-29', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()).storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 384).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-30', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b10011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b10011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b10011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b10011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()).storeUint(BigInt("0b01001110011100110111010001001011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 416).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-31', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1001"), 4).endCell()).storeUint(BigInt("0b01001110011100110111010001001011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-32', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-33', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()).storeUint(BigInt("0b010011100111001101110100010010111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-34', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 676).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-35', async () => {
        const data = beginCell().storeUint(BigInt("0b100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 534).endCell()
        const msgBody = beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0100111001110011011101000100101110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 676).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
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
            exitCode: 8196,
        })
    })

    it('test-36', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00000000000000001001100100000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-37', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeUint(BigInt("0b000000000000000001110111000000100000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-38', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00000000000000000111011100000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-39', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeUint(BigInt("0b000000000000000000010000000000010000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-40', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeUint(BigInt("0b000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-41', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeUint(BigInt("0b0000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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

    it('test-42', async () => {
        const data = beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 269).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000"), 4).endCell()).storeUint(BigInt("0b00000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new SingleNominator(contractAddress, { code, data }))
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
            exitCode: 8196,
        })
    })
})