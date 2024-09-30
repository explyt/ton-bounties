import {Blockchain} from '@ton/sandbox'
import {Address, beginCell, Builder, Cell, Dictionary, DictionaryValue, Slice} from '@ton/core'
import '@ton/test-utils'
import {compileFunc} from "@ton-community/func-js"
import * as fs from "node:fs"
import {BridgeCode} from "../wrappers/BridgeCode"

async function compileContract(): Promise<Cell> {
    let compileResult = await compileFunc({
        targets: ['contracts/bridge_code.fc'],
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
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 173).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 270).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 299,
        })
    })

    it('test-3', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 849).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 849).endCell()).storeUint(BigInt("0b0"), 849).endCell()).storeUint(BigInt("0b0"), 849).endCell()).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 306,
        })
    })

    it('test-5', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b1000000000000000000000000000000000000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 128).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 8).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b000000001000"), 12).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 12).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 16).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000000000000100000"), 20).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 20).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000001000"), 86).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 32).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 339,
        })
    })

    it('test-17', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000001100010010000000000001100000000000000000000000000000001001111111111111111111111111111111111111111110000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 92233720368545175040n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            92233720368545175040n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 400,
        })
    })

    it('test-18', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 5,
        })
    })

    it('test-19', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 505).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 505).endCell()).storeUint(BigInt("0b0"), 505).endCell()).storeUint(BigInt("0b0"), 505).endCell()).storeUint(BigInt("0b0"), 505).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 328,
        })
    })

    it('test-21', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-23', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000"), 104).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-24', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-25', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-26', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 305,
        })
    })

    it('test-27', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 8).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-29', async () => {
        const data = beginCell().storeUint(BigInt("0b000000001000"), 12).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 12).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 16).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000000000000100000"), 20).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 20).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000001000"), 86).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 32).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100"), 32).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 391,
        })
    })

    it('test-38', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000010000000111"), 40).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 391,
        })
    })

    it('test-40', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000010000000110"), 40).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001101000"), 44).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001100000"), 44).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-43', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000011000001000"), 48).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-44', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000011000000000"), 48).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-45', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001100000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 391,
        })
    })

    it('test-46', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 8,
        })
    })

    it('test-47', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 391,
        })
    })

    it('test-48', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 391,
        })
    })

    it('test-49', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000010000000011"), 40).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-50', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000000000100000000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 391,
        })
    })

    it('test-51', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-52', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 304).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-53', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 312).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-54', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-55', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 576).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-56', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 2).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 2).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 2).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 400,
        })
    })

    it('test-57', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 315,
        })
    })

    it('test-58', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000100010000000000000010000000000000000000000000000000000000000000000000100100010000000000000000000000000000000000000010100000000000000000000000000000011000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 5,
        })
    })

    it('test-59', async () => {
        const data = beginCell().storeUint(BigInt("0b00000000100011000000000000000000000010000000000000000000000000010000000000000111100010100000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000001100000010000000000000000000000010000000111000001110001110001000010011100000111111101100000000001000100000111011111000100010000000011010110000000000110111011110110000010000010100000100000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 896).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000101010100001100000111000100111111110100001111111100111111100101100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("-1:3b9bbfd0ad5338b9700f0833380ee17d463e51c1ae671ee6f08901bde899b202")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 5,
        })
    })

    it('test-60', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-61', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-62', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-63', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-64', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-65', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-66', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-67', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-68', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-69', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-70', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-71', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-72', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-73', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-74', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-75', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-76', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-77', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-78', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-79', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000011000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-80', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-81', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-82', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-83', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000001100001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-84', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-85', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000011000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-86', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-87', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-88', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-89', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000010000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-90', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-91', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000011000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-92', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-93', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000110000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-94', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-95', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000011000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-96', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-97', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-98', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-99', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-100', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-101', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-102', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-103', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-104', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-105', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-106', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-107', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-108', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-109', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-110', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-111', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-112', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-113', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001100000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-114', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-115', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000010000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-116', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-117', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-118', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-119', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000001100001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-120', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-121', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000010000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-122', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-123', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-124', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-125', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000010000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-126', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-127', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000010000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-128', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-129', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000100000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-130', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-131', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000011000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-132', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-133', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-134', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-135', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-136', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-137', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-138', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-139', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-140', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-141', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-142', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-143', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-144', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-145', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-146', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-147', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-148', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-149', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100001000000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-150', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-151', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000001100000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-152', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-153', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000000110000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-154', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000001100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-155', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000001100001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-156', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-157', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000001100000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-158', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-159', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001000000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-160', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-161', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000010000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-162', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-163', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00000000000000000000000000000000011100110111011101100001011100000101010001101111001000110011000001111000001100000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-164', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-165', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111001101110111011000010111000001010100011011110010001100110000011110000011000001100000"), 120).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-166', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-167', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000011000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 616).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-168', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-169', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-170', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-171', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-172', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-173', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b00110000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-174', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-175', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-176', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-177', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-178', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-179', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-180', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 1).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-181', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 512).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-182', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().storeUint(BigInt("0b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-183', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000"), 8).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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

    it('test-184', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })

    it('test-185', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b01100000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()).storeUint(BigInt("0b0000000000000000000000000000000001110011011101110110000101110000010101000110111100100011001100000111100000110000"), 112).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new BridgeCode(contractAddress, { code, data }))
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
            exitCode: 329,
        })
    })
})