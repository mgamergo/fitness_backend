import { Request, Response, Router } from "express";
import validateJwt from "../../utils/authMiddleware";
import dbClient from "../../../db/index";

const router = Router();

// Get all meals for today
router.get("/get-todays-meals", async (req: Request, res: Response) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const todayMeals = await dbClient.daywise_macros.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    res.status(200).send(todayMeals);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Log a meal consumed in a day
router.post(
  "/add-meal",
  validateJwt as any,
  async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const { recipeName, calories, protein, carbs, fats, fiber } = req.body;

    try {
      await dbClient.daywise_macros.create({
        data: {
          userId,
          recipeName,
          calories,
          protein,
          carbs,
          fats,
          fiber,
        },
      });

      res.status(201).json({ message: "Meal added successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get all recipes
router.get("/get-all-recipes", async (req: Request, res: Response) => {
  try {
    const recipes = await dbClient.recipes.findMany();

    res.status(200).send(recipes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a recipe bu Id from the recipes present in database
router.get(
  "/get-recipe-info/:recipeId",
  async (req: Request, res: Response) => {
    const { recipeId } = req.params;

    try {
      const recipe = await dbClient.recipes.findUnique({
        where: {
          recipeId: parseInt(recipeId),
        },
      });

      res.status(200).send(recipe);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
