import fetch from "node-fetch";
import { promises as fs } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const BASE_METADATA_API_URL = "https://mint.impermanent.digital/api/metadata";
const MIN_IMPERMANENT_COUNT = 0;
const MAX_IMPERMANENT_COUNT = 4444;
const SHOULD_SCRAPE_IMPERMANENT_DIGITAL_API = true;
const SHOULD_GENERATE_PUNK_MAP = true;
const SHOULD_UPDATE_METADATA_META = true;

function sleep(duration) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(...args);
      }, duration);
    });
  };
}

(async () => {
  let allMetadata = [];

  // scrape Impermannet Digital API
  if (SHOULD_SCRAPE_IMPERMANENT_DIGITAL_API) {
    for (let i = MIN_IMPERMANENT_COUNT; i < MAX_IMPERMANENT_COUNT; i += 1) {
      const metadata = await fetch(`${BASE_METADATA_API_URL}/${i}`).then(
        (response) => response.json()
      );

      console.log(`Scraped impermanent digital ${i}`);
      allMetadata.push({
        id: i,
        ...metadata,
      });

      await sleep(333);
    }
    await fs.writeFile(
      "data/metadata.json",
      JSON.stringify(allMetadata, null, 2)
    );
  } else {
    allMetadata = require("../data/metadata.json");
  }

  // Generate CryptoPunk ID <-> Impermanent Digital ID map
  if (SHOULD_GENERATE_PUNK_MAP) {
    const punkMap = allMetadata.reduce((accumulator, metadata, index) => {
      const punkAttribute = metadata?.attributes?.find(({ trait_type }) =>
        trait_type.toLowerCase().includes("punk id")
      );

      if (!punkAttribute) {
        console.log(`No CryptoPunk ID for ${index}`);
        return accumulator;
      }

      console.log(
        `Mapped CryptoPunk ID ${punkAttribute.value} with Impermanent Digital ID ${index}`
      );
      accumulator[punkAttribute.value] = index;

      return accumulator;
    }, {});
    await fs.writeFile("data/punkMap.json", JSON.stringify(punkMap, null, 2));
  }

  // Save out a timestamp to indicate last time script ran
  if (SHOULD_UPDATE_METADATA_META) {
    const now = new Date();
    await fs.writeFile(
      "data/metadata-meta.json",
      JSON.stringify(
        {
          updatedAt: now,
        },
        null,
        2
      )
    );
  }
})();
