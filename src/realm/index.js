import * as Realm from "realm";
import userSchema from "./userSchema";
import productSchema from "./productSchema";
import promoSchema from "./promoSchema";

function connect(cb) {
	Realm.open({
		schema: [userSchema, productSchema, promoSchema],
		schemaVersion: 5,
	}).then(cb);
}

export default connect;