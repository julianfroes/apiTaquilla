import express from "express";
import morgan from "morgan";
import cors from "cors";

import ventasRoutes from "./routes/venta.routes.js";
import detallesRoutes from "./routes/detallesVenta.routes.js";
import promocionRoutes from "./routes/promocion.routes.js";
import promocionesVentaTaquilla from "./routes/promocionesVentaTaquilla.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
// Routes
app.use("/", indexRoutes);
app.use("/api", ventasRoutes);
app.use("/api", detallesRoutes);
app.use("/api", promocionRoutes);
app.use("/api", promocionesVentaTaquilla)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;