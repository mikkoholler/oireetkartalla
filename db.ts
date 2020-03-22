import * as pgp from 'pg-promise'

const dbClient = pgp()

export const db = dbClient({
  connectionString: process.env.DATABASE_URL,
  max: 30,
})
