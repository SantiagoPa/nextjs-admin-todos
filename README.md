[Next.js](https://nextjs.org)

# Development

## steps for raise app in development

1. raise database
```
docker compose up -d
```

2. create copy of the file `.env.template`  and rename the `.env.template` to `.env` and replace environment variables
3. execute command `npm install`
4. execute command `npm run dev`
5. Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
6. executed SEED [for the create mock data for database](localhost:3000/api/seed)


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

