import mockData from "./mockData.json";

let cursor = -1;
const size = 10;

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export default async function apiData() {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * size;
  const end = cursor * size + size;

  const isLastBatch = cursor * size >= mockData.length;

  //Throwing error is not the best way to handle this, but it's a quick and dirty way to handle the last batch.
  if (isLastBatch) {
    throw new Error("That's all the data we have");
  }
  return mockData.slice(start, end);
}
