Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('AssetTracker.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':AssetTracker'].interface)
AssetTrackerContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':AssetTracker'].bytecode
deployedContract = AssetTrackerContract.new(['Waivers', 'Conditions', 'Legal', 'Money'], {data: byteCode, from:web3.eth.accounts[0], gas:4700000})
contractInstance = AssetTrackerContract.at(deployedContract.address)

console.log("address:");
console.log(deployedContract.address);