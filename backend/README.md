```
npm install
npm run dev
```

```
npm run deploy
```

### Important

Serverless backends need a connection pooler which controls the traffic or querries to the centralised DB.
Provide the Main DB URL in the .env file so that the prisma migrate command runs properly in the local environment
Add the Pool DB URL in the wrangler or toml file so that cloudfare workers take it as a DB URL.
