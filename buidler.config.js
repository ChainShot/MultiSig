usePlugin("@nomiclabs/buidler-truffle5");

module.exports = {
  defaultNetwork: "localhost",
  paths: {
    artifacts: "./app/artifacts",
  },
  solc: {
    version: "0.6.2",
  }
};
