import { AUTHENTICATE_USER, UPDATE_CART, UPDATE_PROMO, SWITCH_THEME } from "./types";

const initialState = {
	theme: 'light',
	cartLength: 0,
	cart: [],
	user: {
		signInMethod: "EMAIL",
		avatarSource: "",
		name: "",
		nameAbbr: "",
		phone: "",
		email: "",
		password: "",
		cart: [],
		promo: [],
	},
	promo: [],
};

function applyAuthenticateUser(state, user) {
	const {
		signInMethod,
		avatarSource,
		name,
		nameAbbr,
		phone,
		email,
		password,
		cart,
		promo,
	} = user;

	return {
		cartLength: state.cartLength,
		cart: state.cart,
		user: {
			signInMethod,
			avatarSource,
			name,
			nameAbbr,
			phone,
			email,
			password,
			cart,
			promo,
		},
		theme: state.theme,
		promo: state.promo,
	};
}

function applyUpdateCart(state, cart) {
	const {
		user
	} = state;

	user.cart = cart;

	return {
		cartLength: cart.length,
		cart,
		user,
		theme: state.theme,
		promo: state.promo,
	};
}

function applyUpdatePromo(state, promo) {
	const {
		user
	} = state;

	user.promo = promo;

	return {
		cartLength: state.cartLength,
		cart: state.cart,
		theme: state.theme,
		user,
		promo,
	};
}


function applySwitchTheme(state, theme) {
	return {
		cartLength: state.cartLength,
		cart: state.cart,
		user: state.user,
		promo: state.promo,
		theme,
	};
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case AUTHENTICATE_USER:
			return applyAuthenticateUser(state, action.user);
		case UPDATE_CART:
			return applyUpdateCart(state, action.cart);
		case UPDATE_PROMO:
			return applyUpdatePromo(state, action.promo);
		case SWITCH_THEME:
			return applySwitchTheme(state, action.theme);
		default:
			return state;
	}
}

export default reducer;
