import { ExpressApp } from "./app";

async function Bootstrap(): Promise<void> {
  const app = new ExpressApp();

  await app.init();
}

Bootstrap().catch((error) => {
  console.log(error);
  process.exit(1);
});
