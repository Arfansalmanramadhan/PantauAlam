import 'dotenv/config'
import express  from 'express';
import cors  from 'cors';
import cuacaRouter  from './router/cuacaRouter.js'
import gempaRouter  from './router/gempaRouter.js'
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', cuacaRouter)
app.use('/api/gempa', gempaRouter)
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});