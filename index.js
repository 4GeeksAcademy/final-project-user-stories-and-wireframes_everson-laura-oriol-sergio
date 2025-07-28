//Fix para __dirname

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Rutas

app.get("/", (req, res) => res.sendFile(__dirname + "./index.html"));
