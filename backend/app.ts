import Express, {
    Request,
    Response,
} from 'express';
import { getData } from './ether';
import cors from 'cors';

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', async (req: Request, res: Response) => {
    const address: any = req.query.address;
    const data = await getData(address);
    res.status(200).json({status: 'ok', data: data});
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});