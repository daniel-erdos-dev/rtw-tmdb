import express, { Request, Response } from "express";
import { getMovieDetailsFromApi, getProviderInfo } from "./tmdb_handling";

const app = express();
const port: number = Number(process.env.PORT) || 3003;

// GET movie based on title
app.get("/movie", (req: Request, res: Response) => {
  const title = req.query.title as string;
  const yearAsString = req.query.year as string;
  const year = yearAsString ? parseInt(yearAsString) : undefined;

  getMovieDetailsFromApi(title, year)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(501);
    });
});

// GET provider info based on movie id and country code (2digits)
app.get("/providers", (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string);
  const country_code = req.query.country_code as string;

  getProviderInfo(id, country_code)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(501);
    });
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("OK");
});

app.listen(port);
