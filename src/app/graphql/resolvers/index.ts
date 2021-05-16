import OperatiosDB from '../../database';
import AuthResolver from './authentication';
import ProductResolver from './product';
import CheckInResolver from './checkin';

const db = new OperatiosDB();
const auth = new AuthResolver();
const product = new ProductResolver();
const checkin = new CheckInResolver();

export default {
    /* Mutations */
    register: auth.register(db),
    login: auth.login(db),
    product_mut: product.product_update_insert(db),
    checkin: checkin.create_check_in(db),
    /* Queries */
    product: product.product(db),
    products: product.products(db),
};
