const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
  const pairs = [
    "SGD/USD",
    "EUR/USD",
    "GBP/USD",
    "AUD/USD",
    "EUR/USD",
    "AUD/CAD",
    "EUR/JPY",
    "CAD/CHF",
    "GBP/CHF",
    "USD/JPY",
    "EUR/GBP",
    "AUD/CHF",
    "NZD/JPY",
    "EUR/CHF",
  ];
  let forexPairs = [];
  for (const pair of pairs) {
    // Generate a random bid price
    const newBidPrice = (Math.random() * (1.5 - 1) + 1).toFixed(4);

    // Ensure the ask price is higher than the bid price (add margin)
    const askMargin = Math.random() * (0.005 - 0.001) + 0.001;
    const newAskPrice = (parseFloat(newBidPrice) + askMargin).toFixed(4);

    forexPairs.push({
      pair,
      bidPrice: parseFloat(newBidPrice),
      askPrice: parseFloat(newAskPrice),
    });
  }

  for (const forex of forexPairs) {
    await db.forexData.upsert({
      where: { pair: forex.pair },
      update: {},
      create: {
        pair: forex.pair,
        bidPrice: forex.bidPrice,
        askPrice: forex.askPrice,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
