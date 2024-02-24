
import express,{Application} from 'express';
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import { Product } from './product';


class Server{
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3002';
        this.listen();
        this.dbConnect();
        this.midlewares();
        this.routes();
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log("Aplicacion corriendo en el puerto "+ this.port);
        } )
    }


    routes(){
        this.app.use('/api/products',routesProduct)
        this.app.use('/api/users', routesUser);
    }


    midlewares(){
        this.app.use(express.json());
    }


    async dbConnect(){
        try {
            await Product.sync()
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
          
    }
}

export  default Server;