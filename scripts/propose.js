const { ethers, network } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const fs = require("fs");
const chainId = network.config.chainId;
async function main(funtionToCall, args, proposalDescription) {
  const govonor = await ethers.getContract("MyGovernorContract");
  const box = await ethers.getContract("box");

  //   function propose(
  //     address[] memory targets,
  //     uint256[] memory values,
  //     bytes[] memory calldatas,
  //     string memory description

  const encodedFuntionCall = box.interface.encodeFunctionData(
    funtionToCall,
    args
  );

  console.log(`proposing ${funtionToCall} on ${await box.getAddress()}`);
  console.log(`proposal description ${proposalDescription}`);
  const proposeTx = await govonor.propose(
    [await box.getAddress()],
    [0],
    [encodedFuntionCall],
    proposalDescription
  );
  const proposalREciept = await proposeTx.wait(1);
  console.log("sigh");
  const proposalId = await proposalREciept.logs[0].args[0];
  console.log(proposalId);
  let proposal = JSON.parse(fs.readFileSync("proposal.json", "utf8"));
  proposal[chainId].push(proposalId.toString());
  fs.writeFileSync("proposal.json", JSON.stringify(proposal));
  if (chainId == 31337) {
    await time.increase(3600 + 22);
  }
}

main("SetValue", [77], "propal number 1 #store number 77").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
