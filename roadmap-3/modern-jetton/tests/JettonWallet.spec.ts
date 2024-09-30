import {Blockchain} from '@ton/sandbox'
import {Address, beginCell, Builder, Cell, Dictionary, DictionaryValue, Slice} from '@ton/core'
import '@ton/test-utils'
import {compileFunc} from "@ton-community/func-js"
import * as fs from "node:fs"
import {JettonWallet} from "../wrappers/JettonWallet"

async function compileContract(): Promise<Cell> {
    let compileResult = await compileFunc({
        targets: ['contracts/jetton-wallet.func'],
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
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 281).endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 281).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 281).endCell()).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 744).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 744).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 744).endCell()).endCell()
        const from = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 16).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b1000000000000000000000000000000000000000000000000000000000000000"), 64).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 6).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-17', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0111"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01110110100010100101000010110010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 705,
        })
    })

    it('test-18', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0111011010001010010100001011001000000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-19', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b011101101000101001010000101100100000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0111011010001010010100001011001000000000000000000000000000000000000000000000000000000000000000000000"), 100).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-21', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 102).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b011101101000101001010000101100100000000000000000000000000000000000000000000000000000000000000000001000"), 102).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 102).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b011101101000101001010000101100100000000000000000000000000000000000000000000000000000000000000000000000"), 102).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-23', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01110110100010100101000010110010000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0110"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01101101100011100101111000111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 705,
        })
    })

    it('test-25', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0110110110001110010111100011110000000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b1000000000000000000000000000000000000000000000000000000000000000"), 64).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 6).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101100101011111000001111011110000000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b010110010101111100000111101111000000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101100101011111000001111011110000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101100101011111000001111011110000000000000000000000000000000000000000000000000000000000000000000000"), 100).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0101"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 705,
        })
    })

    it('test-36', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000101100101011111000001111011110010001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 706,
        })
    })

    it('test-37', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01011001010111110000011110111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 707,
        })
    })

    it('test-38', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010111100011010100010100011001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b1000000000000000000000000000000000000000000000000000000000000000"), 64).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010111100011010100010100011001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010111100011010100010100011001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 6).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010111100011010100010100011001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010111100011010100010100011001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001011110001101010001010001100100000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000101111000110101000101000110010000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001011110001101010001010001100100000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-46', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001011110001101010001010001100100000000000000000000000000000000000000000000000000000000000000000000"), 100).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-47', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000101111000110101000101000110010000000000000000000000000000000000000000000000000000000000000000000000"), 102).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-48', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000001111101011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0001"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000101111000110101000101000110010000000000000000000000000000000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 768).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-49', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000111110001010011111101010010100000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000011111000101001111110101001010000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-51', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000111110001010011111101010010100000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 160).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000111110001010011111101010010100000000000000000000000000000000000000000000000000000000000000000000"), 100).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001001111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 333,
        })
    })

    it('test-54', async () => {
        const data = beginCell().endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b1000000000000000000000000000000000000000000000000000000000000000"), 64).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 256).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-57', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 6).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-58', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-59', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 705,
        })
    })

    it('test-60', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00001111100010100111111010100101000000000000000000000000000000000000111110001010011111101010010110001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 706,
        })
    })

    it('test-61', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 867).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 867).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 867).endCell()).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = true
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-62', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 3).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 3).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 32).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-63', async () => {
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010000000"), 11).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00010000000"), 11).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b00010000000000000000000000000000"), 32).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = true
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeUint(BigInt("0b0"), 4).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-65', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 6).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-66', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 163).endCell()).storeUint(BigInt("0b0"), 163).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0"), 32).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("-1:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-68', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
            exitCode: 65520,
        })
    })

    it('test-69', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0000000000000000000000000000000001111011110111011001011111011110"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011110111101110110010111110111100000000000000000000000000000000000000000000000000000000000000000"), 128).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-71', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000000000000000000000000000000000111101111011101100101111101111000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000"), 192).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-72', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b10000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b1000"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000011110111101110110010111110111100000000000000000000000000000000000000000000000000000000000000000111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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

    it('test-73', async () => {
        const data = beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b000001111111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111110011111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001101101111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 960).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeUint(BigInt("0b0"), 4).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b00000000000000000000000000000000000101111000110101000101000110011001011111011110000000000000000000000000000000000000000000000000111000000000100000001000000011011001011111011110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = true

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new JettonWallet(contractAddress, { code, data }))
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
})