import { generateExecutiveBrief } from "../src/lib/generate-executive-brief";

async function main() {
  const brief = await generateExecutiveBrief();

  console.log(brief);
}

main().catch(console.error);
