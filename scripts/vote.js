const fs = require("fs");
const { network, ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const chainId = network.config.chainId;
const index = 0;

async function main() {
  const proposal = JSON.parse(fs.readFileSync("proposal.json", "utf8"));
  const proposalId = proposal[chainId][index];
  const govonor = await ethers.getContract("MyGovernorContract");
  const voteWay = 1;

  const voteTxResponse = await govonor.castVoteWithReason(
    proposalId,
    voteWay,
    "I lke to do da cha cha"
  );
  await voteTxResponse.wait(1);

  if (chainId == 31337) {
    await time.increase(3600 + 36);
  }

  // if (chainId == 31337) {
  //   await time.increase(3600 + 8888);
  // }

  console.log("voted ready to go!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
