import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      user: "Preset",
    },
  });

  res.send(categories);
});

app.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const flashcards = await prisma.flashcards.findMany({
    select: {
      question: true,
      options: true,
      answer: true,
    },
    where: {
      category_id: id,
    },
  });

  res.send(flashcards);
});

app.listen(3000, () => {
  console.log("Listening");
});
