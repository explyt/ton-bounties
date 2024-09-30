import {Blockchain} from '@ton/sandbox'
import {Address, beginCell, Builder, Cell, Dictionary, DictionaryValue, Slice} from '@ton/core'
import '@ton/test-utils'
import {compileFunc} from "@ton-community/func-js"
import * as fs from "node:fs"
import {WalletV4Code} from "../wrappers/WalletV4Code"

async function compileContract(): Promise<Cell> {
    let compileResult = await compileFunc({
        targets: ['contracts/wallet-v4-code.fc'],
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
        const data = beginCell().storeUint(BigInt("0b0"), 173).endCell()
        const msgBody = beginCell().endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01100100011100110111010001110010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const msgBody = beginCell().storeUint(BigInt("0b01100100011100110111010001110010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b01100100011100110111010001110010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 320).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01100100011100110111010001110010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01100100011100110111010001110010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0110010001110011011101000111001000000000000000000000000000000000"), 64).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b011100000110110001110101011001110000000000000000000000000000000000000000000000000000000000000000"), 96).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01110000011011000111010101100111000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000"), 128).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b0111000001101100011101010110011100000000000000000000000000000000000000000000000000000000000000000011000000000000000000000000"), 124).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01110000011011000111010101100111000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
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
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeUint(BigInt("0b01110000011011000111010101100111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 80,
        })
    })

    it('test-11', async () => {
        const data = beginCell().storeUint(BigInt("0b0"), 320).storeDict(Dictionary.empty(Dictionary.Keys.BigInt(264), sliceValue).set(0n, beginCell().endCell().beginParse())).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b0"), 191).endCell()
        const msgBody = beginCell().storeRef(beginCell().storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeRef(beginCell().endCell()).storeUint(BigInt("0b01110000011011000111010101100111000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"), 512).endCell()
        const from = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const bounce = false
        const bounced = false

        const contractAddress = Address.parseRaw("0:0000000000000000000000000000000000000000000000000000000000000000")
        const contract = blockchain.openContract(new WalletV4Code(contractAddress, { code, data }))
        await contract.initializeContract(blockchain, 10000000n)
  
        const sentMessageResult = await contract.internal(
            blockchain,
            from,
            msgBody,
            10000000n,
            bounce,
            bounced
        )
        expect(sentMessageResult.transactions).toHaveTransaction({
            from: from,
            to: contractAddress,
            exitCode: 80,
        })
    })
})