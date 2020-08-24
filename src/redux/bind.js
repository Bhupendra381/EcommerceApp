import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../redux/actions";

function mapStateToProps(state) {
	const { cartLength, cart, user, promo, theme } = state;
	return {
		cartLength,
		cart,
		user,
		promo,
		theme,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		authenticateUser: bindActionCreators(actions.authenticateUser, dispatch),
		updateCart: bindActionCreators(actions.updateCart, dispatch),
		updatePromo: bindActionCreators(actions.updatePromo, dispatch),
		switchTheme: bindActionCreators(actions.switchTheme, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps);
