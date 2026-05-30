import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/encrypt`);
    console.log(`   POST http://localhost:${PORT}/api/decrypt`);
  }
});
