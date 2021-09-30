import sharp from 'sharp';
import { promises as fs } from 'fs';

const COLUMNS = 100;
const WIDTH = 24;
const HEIGHT = 24;
const MIN_PUNKS_COUNT = 0;
const MAX_PUNKS_COUNT = 4444;

(async () => {
  const punksSpritesheetFile = await fs.readFile('public/images/punks.png');

  for (let i = MIN_PUNKS_COUNT; i < MAX_PUNKS_COUNT; i += 1) {
    const left = (i % COLUMNS) * HEIGHT;
    const top = Math.floor(i / COLUMNS) * WIDTH;

    sharp(punksSpritesheetFile)
      .extract({ left, top, width: WIDTH, height: HEIGHT })
      .toFile(`public/images/punk-${i}.png`, function (err) {
          if (err) console.log(err);
      })

    console.log(`Sliced punk ${i} @ [${left}, ${top}]`);
  }
})();
