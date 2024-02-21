const { getNamedAccounts, network, ethers } = require("hardhat");

module.exports = async ({ deployments, namedAccounts }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const TimeLock = await get("TimeLock");
  console.log(TimeLock.address);
  const args = [TimeLock.address];
  const box = await deploy("box", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || "1",
  });
  log("box deployed deployed");
  log(".......................................................");
};
