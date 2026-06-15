import { getExecutiveBriefData } from "../src/lib/executive-brief";

async function main() {
  const data = await getExecutiveBriefData();

  console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error);
