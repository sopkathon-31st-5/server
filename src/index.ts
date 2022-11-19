import express, { NextFunction, Request, Response } from "express";
import router from "./router";
import cors from 'cors';

const app = express(); // express 객체 받아옴
const PORT = 3000; // 사용할 port를 3000번으로 설정

app.use(express.json()); // express 에서 request body를 json 으로 받아오겠다.
app.use(cors());
app.use("/", router); // use -> 모든 요청

//* HTTP method - GET
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("시장에 가면~ 정빈이도 있고~ 😎 지영이도 있고~ 😳 수현이도 있고~ 😇");
});

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ 시장에 가면 Server listening on port: ${PORT} 🛡️
            🛍️ 시장에 가면~ 정빈이도 있고~ 😎 지영이도 있고~ 😳 수현이도 있고~ 😇 🛍️
        #############################################
    `);
}); // 8000 번 포트에서 서버를 실행하겠다!
