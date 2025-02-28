//import { Router } from "express";Removed
import { Router, Request, Response } from "express"; //added by Lydia
const router = Router();
import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req: Request, res: Response) => {
  // try {
  // TODO: GET weather data from city name
  const { cityName } = req.body;
  if (typeof cityName !== "string" || cityName.trim() === "") {
    return res.status(400).json({ message: "City name is required" });
  }

  const weatherData = await WeatherService.getWeatherForCity(cityName);

  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  return res.json(weatherData);
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).json({ message: "An error occurred" });
  // }
});

// TODO: GET search history //Will need to get info from line 4 //_may be an issue?
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

// * BONUS TODO: DELETE city from search history
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
