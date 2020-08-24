import * as Realm from "realm";
import userSchema from "./userSchema";
import productSchema from "./productSchema";
import promoSchema from "./promoSchema";
import themeSchema from '../realm/themeSchema';

function connect(cb) {
	Realm.open({
		schema: [userSchema, productSchema, themeSchema, promoSchema],
		schemaVersion: 5,
	}).then(cb);
}

export default connect;
