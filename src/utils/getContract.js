import Web3 from 'web3'
import { address, ABI } from './constants/sendnGDContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let sendnGDContract = web3.eth.contract(ABI)
  let sendnGDContractInstance = sendnGDContract.at(address)
 // casinoContractInstance = () => casinoContractInstance
  resolve(sendnGDContractInstance)
})

export default getContract
