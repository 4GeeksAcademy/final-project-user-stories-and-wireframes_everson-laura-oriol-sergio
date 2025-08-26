import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => res.sendFile(__dirname + "./index.html"));