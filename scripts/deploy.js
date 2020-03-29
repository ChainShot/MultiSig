const env = require("@nomiclabs/buidler");
const fs = require('fs');

async function main() {
  await env.run("compile");

  const MultiSig = env.artifacts.require("MultiSig");
  const accounts = await ethereum.send("eth_accounts");
  const contract = await MultiSig.new(accounts, 2);

  const config = { address: contract.address }
  fs.writeFileSync("./app/config.json", JSON.stringify(config, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
