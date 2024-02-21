const { getNamedAccounts, network, ethers } = require("hardhat");

module.exports = async ({ deployments, namedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  //   uint256 minDelay,
  //   address[] memory proposers,
  //   address[] memory executors,
  //   address admin
  const args = ["3600", [], [], deployer];
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || "1",
  });
  log("TimeLock deployed");
  log(".......................................................");
  //   await MyGovToken.wait(1);

  //take my vote and vote use it  how you want that what this do
};
