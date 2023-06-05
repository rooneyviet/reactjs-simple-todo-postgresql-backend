import cookieParser from "cookie-parser";
import express, {NextFunction, Request, Response} from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.route";
import { AppDataSource } from "./utils/data-source";

AppDataSource.initialize()
  .then(async () => {
    //validateEnv();

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use("/api/v1", routes);

    // UNHANDLED ROUTE
    // app.all('*', (req: Request, res: Response, next: NextFunction) => {
    //     next(new AppError(404, `Route ${req.originalUrl} not found`));
    //   });
      
    // GLOBAL ERROR HANDLER
    // app.use(
    //     (error: AppError, req: Request, res: Response, next: NextFunction) => {
    //       error.status = error.status || 'error';
    //       error.statusCode = error.statusCode || 500;
  
    //       res.status(error.statusCode).json({
    //         status: error.status,
    //         message: error.message,
    //       });
    //     }
    //   );

    const port = process.env.PORT || 5000;
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
