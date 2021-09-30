import fetch from 'node-fetch';
import { promises as fs } from 'fs';

const BASE_METADATA_API_URL = 'https://mint.impermanent.digital/api/metadata';
const MIN_IMPERMANENT_COUNT = 0;
const MAX_IMPERMANENT_COUNT = 4444;

function sleep(duration) {
  return function(...args){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve(...args);
      }, duration)
    });
  };
}

(async () => {
  let allMetadata = [];
  for (let i = MIN_IMPERMANENT_COUNT; i < MAX_IMPERMANENT_COUNT; i += 1) {
    const metadata = await fetch(`${BASE_METADATA_API_URL}/${i}`).then((response) => response.json());

    console.log(`Scraped impermanent digital ${i}`);
    allMetadata.push(metadata);

    await sleep(333);
  }

  await fs.writeFile('data/metadata.json', JSON.stringify(allMetadata, null, 2));
})();
