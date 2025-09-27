// src/utils/database.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function findBookByISBN(isbn: string) {
  return await prisma.book.findFirst({ where: { isbn } });
}

export async function addOrUpdateStock(book: {
  isbn: string;
  title: string;
  author: string;
  subject?: string;
  bookCondition?: string;
}) {
  const existing = await findBookByISBN(book.isbn);
  if (existing) {
    return await prisma.book.update({
      where: { id: existing.id },
      data: { stock: { increment: 1 } }
    });
  }
  return await prisma.book.create({
    data: {
      ...book,
      stock: 1
    },
  });
}

export async function receiveBook(isbn: string) {
  const book = await findBookByISBN(isbn);
  if (!book || book.stock <= 0) return null;

  return await prisma.book.update({
    where: { id: book.id },
    data: { stock: { decrement: 1 } }
  });
}

export default prisma;
