import { AUTHENTICATE_USER, UPDATE_CART, UPDATE_PROMO, SWITCH_THEME } from "./types";

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

function switchTheme(theme) {
	return {
		type: SWITCH_THEME,
		theme,
	};
}


const actionCreators = {
	authenticateUser,
	updateCart,
	updatePromo,
	switchTheme,
};

export { actionCreators };
