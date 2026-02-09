import express from "express";
import cors from "cors";
import perfumeRouter from "./modules/perfume/routes/perfume.route";
import memberRouter from "./modules/member/routes/member.routes";
import brandRouter from "./modules/brands/routes/brand.routes";
import connectDB from "./config/db";

const app = express();
const apiRouter = express.Router();

// Connect to MongoDB
connectDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
apiRouter.use("/perfume", perfumeRouter);
apiRouter.use("/member", memberRouter);
apiRouter.use("/brand", brandRouter);
app.use("/api/v1", apiRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
