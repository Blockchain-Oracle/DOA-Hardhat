const { getNamedAccounts, network, ethers } = require("hardhat");

module.exports = async ({ deployments, namedAccounts }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const timeLock = await ethers.getContract("TimeLock", deployer);
  const Goveror = await ethers.getContract("MyGovernorContract", deployer);
  log("setting up roles");

  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.DEFAULT_ADMIN_ROLE();

  const proposerTx = await timeLock.grantRole(
    proposerRole,
    await Goveror.getAddress()
  );

  await proposerTx.wait(1);

  const executorTx = await timeLock.grantRole(
    executorRole,
    "0x0000000000000000000000000000000000000000"
  );
  await executorTx.wait(1);

  const revokeVoke = await timeLock.revokeRole(adminRole, deployer);
  await revokeVoke.wait(1);

  log(`new admin${await timeLock.DEFAULT_ADMIN_ROLE()}`);
};
