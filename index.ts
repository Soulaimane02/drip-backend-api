import server from "./src/app";
import dotenv from "dotenv";

dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running : ${PORT}`);
});
