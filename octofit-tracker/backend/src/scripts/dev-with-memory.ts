import { MongoMemoryServer } from 'mongodb-memory-server';

async function main() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log('Started in-memory MongoDB at', uri);

  // Ensure downstream imports see the env var
  process.env.MONGODB_URI = uri;
  process.env.MONGODB_MEMORY = '1';

  // Run seed script (it auto-executes on import)
  console.log('Running seed script...');
  await import('./seed');

  // Start the Express server (will import server which connects using MONGODB_URI)
  console.log('Starting backend server...');
  await import('../server');

  console.log('Backend started with in-memory MongoDB');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
