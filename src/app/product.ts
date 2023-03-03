import { Brand } from "./brand";
import { Category } from "./category";
import { Status } from "./status.enum";

export class Product {
    productSerialNumber! : string;
    productName! : string;
    type! : string;
    model!:string;
    specification!:string;
    status!:Status;
    brand! : Brand;
    category! : Category;
}
