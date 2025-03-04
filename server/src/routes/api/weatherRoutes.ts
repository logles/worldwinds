import { Router, Request, Response } from "express";
const router = Router();
import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

router.post("/", async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;
    if (typeof cityName !== "string" || cityName.trim() === "") {
      return res.status(400).json({ message: "City name is required" });
    }

    const weatherData = await WeatherService.getWeatherForCity(cityName);

    await HistoryService.addCity(cityName);

    return res.json(weatherData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/history", async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/history/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
