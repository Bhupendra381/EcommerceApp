import { AUTHENTICATE_USER, UPDATE_CART, UPDATE_PROMO } from "./types";

function authenticateUser(user) {
	return {
		type: AUTHENTICATE_USER,
		user,
	};
}

function updateCart(cart) {
	return {
		type: UPDATE_CART,
		cart,
	};
}

function updatePromo(promo) {
	return {
		type: UPDATE_PROMO,
		promo,
	};
}

const actionCreators = {
	authenticateUser,
	updateCart,
	updatePromo,
};

export { actionCreators };