import express from "express"
import cors from "cors";

import clienteRoutes from "./routes/v1/cliente.routes.js"
import authRoutes from "./routes/v1/auth.routes.js"

const app = express()

app.use( cors());
app.use( express.json());

app.use("/api/v1/cliente", clienteRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(3000, ()=>{console.log("running server")})