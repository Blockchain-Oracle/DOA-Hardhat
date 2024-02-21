const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers, network } = require("hardhat");
const chainId = network.config.chainId;
async function main(funtionToCall, args, proposalDescription) {
  const govonor = await ethers.getContract("MyGovernorContract");
  const box = await ethers.getContract("box");
  const encodedFuntionCall = box.interface.encodeFunctionData(
    funtionToCall,
    args
  );
  const descriptionHash = ethers.keccak256(
    ethers.toUtf8Bytes(proposalDescription)
  );

  console.log("queing...");

  //   address[] memory targets,
  //   uint256[] memory values,
  //   bytes[] memory calldatas,
  //   bytes32 descriptionHash
  console.log(encodedFuntionCall, `/n`, descriptionHash);
  const queueTx = await govonor.queue(
    [await box.getAddress()],
    [0],
    [encodedFuntionCall],
    descriptionHash
  );
  await queueTx.wait(1);
  //alright queue your request you have to wait an hour
  if (chainId == 31337) {
    await time.increase(3600 + 300);
  }
  const executeTx = await govonor.execute(
    [await box.getAddress()],
    [0],
    [encodedFuntionCall],
    descriptionHash
  );

  await executeTx.wait(1);

  const boxNewValue = await box.getValue();
  console.log(`new  box value  ${boxNewValue}`);
}

main("SetValue", [77], "propal number 1 #store number 77").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
