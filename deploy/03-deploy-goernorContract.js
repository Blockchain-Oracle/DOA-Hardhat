const { getNamedAccounts, network, ethers } = require("hardhat");

module.exports = async ({ deployments, namedAccounts }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const gpveranceToken = await get("goveranceToken");
  const timeLock = await get("TimeLock");

  //   IVotes _token,
  //   TimelockController _timelock,
  //   uint48 _votingDelay, // time vote will start after propose
  //   uint32 _votingPeriod, // timeframe of votes
  //   uint256 qourmPercentagez

  const args = [gpveranceToken.address, timeLock.address, 1, 2, 4];
  console.log(gpveranceToken.address, timeLock.address);
  const governaceContract = await deploy("MyGovernorContract", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || "1",
  });
  log("governace Contract deployed");
  log(".......................................................");
  //   await MyGovToken.wait(1);

  //take my vote and vote use it  how you want that what this do
};
