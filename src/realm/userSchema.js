export default {
	name: "User",
	properties: {
		isSignedIn: "bool",
		signInMethod: "string",
		avatarSource: "string",
		name: "string",
		nameAbbr: "string", 
		phone: "string",
		email: "string",
		password: "string",
		cart: "Product[]",
		promo: "Promo[]",
	}
};