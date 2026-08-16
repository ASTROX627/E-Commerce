import { afterAll, describe, expect, test } from "vitest"
import { connectToDB } from "../db/connect-to-db.ts"
import { prisma } from "../lib/prisma.ts";

describe("connect to db", () => {
  test("Should connect to PostgreSQL", async () => {
    await expect(connectToDB()).resolves.toBeUndefined();
  })

  afterAll(async () => {
    await prisma.$disconnect();
  })
})
