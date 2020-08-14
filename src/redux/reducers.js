import { AUTHENTICATE_USER, UPDATE_CART, UPDATE_PROMO } from "./types";

const initialState = {
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
		user,
		promo,
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
		default:
			return state;
	}
}

export default reducer;