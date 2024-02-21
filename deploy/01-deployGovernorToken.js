const { getNamedAccounts, network, ethers } = require("hardhat");

module.exports = async ({ deployments, namedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const MyGovToken = await deploy("goveranceToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || "1",
  });
  log("Goveror token deployed");
  log(".......................................................");
  //   await MyGovToken.wait(1);

  //take my vote and vote use it  how you want that what this do

  const delegate = async (DelegateAccount, MyGovAddress) => {
    console.log("heyy", DelegateAccount, MyGovAddress);
    const contractToken = await ethers.getContractAt(
      "goveranceToken",
      MyGovAddress
    );

    const tx = await contractToken.delegate(DelegateAccount);
    await tx.wait(1);
    console.log(
      `checkPoints ${await contractToken.numCheckpoints(DelegateAccount)}`
    );
  };

  await delegate(deployer, MyGovToken.address);
  log("delegated");
};
