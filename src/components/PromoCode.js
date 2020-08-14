import React from "react";
import { StyleSheet, View, TextInput, Alert } from "react-native";

import AppText from "../components/AppText";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";

import realmConnect from "../realm";
import bind from "../redux/bind";

class PromoCode extends React.Component {
	constructor(props) {
		super(props);

		this.state = { realm: null };

		this.onApply = this.onApply.bind(this);
	}

	componentDidMount() {
		realmConnect(realm => {
			this.setState({ realm });
		});
	}

	onApply(code) {
		const { realm } = this.state;

		realm.write(() => {
			let findUser = realm.objects("User").filtered(`email = "${this.props.user.email}"`);
			const user = findUser[0];

			let findPromo = realm.objects("Promo").filtered(`code = "${code}"`);
			if (!findPromo.length) Alert.alert("Error", "Promo code doesn't match any available promotion offers!");
			else {
				const currentPromos = this.props.promo.slice();
				const foundAt = currentPromos.findIndex(item => (item.code === code));
				if (foundAt === -1) {
					currentPromos.push(findPromo[0]);
					user.promo = currentPromos;
					this.props.updatePromo(currentPromos);
					Alert.alert("Success", "Promo code applied successfully!");
				}
				else Alert.alert("Error", "You've already applied this promotion offer!");
			}
		});
	}

	render() {
		const {
			style,
			onChangeText,
			value,
		} = this.props;

		return (
			<View style={[styles.container, style]}>
				<View style={styles.header}>
					<AppText style={styles.label}>Promo code (Optional)</AppText>
					<AppText
						style={styles.button}
						onPress={() => this.onApply(value)}
					>
						Apply
					</AppText>
				</View>
				<TextInput
					placeholder={"Enter your promo code here"}
					placeholderTextColor={Theme.dim}
					returnKeyType="done"
					selectionColor={Theme.text + "99"}
					selectTextOnFocus={false}
					style={styles.field}
					onChangeText={onChangeText}
					value={value}
					underlineColorAndroid="transparent"
					allowFontScaling={false}
					disableFullscreenUI={true}
				/>
			</View>
		);
	}
}

export default bind(PromoCode);

const styles = StyleSheet.create({
	container: {},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6 * Layout.ratio,
	},
	label: {
		marginLeft: 8 * Layout.ratio,
		fontSize: FontSize[12],
		fontWeight: "bold",
		color: Theme.dim,
	},
	button: {
		marginLeft: "auto",
		marginRight: 8 * Layout.ratio,
		fontSize: FontSize[12],
		fontWeight: "bold",
		color: Theme.primary,
	},
	field: {
		alignSelf: "stretch",
		height: 50 * Layout.ratio,
		borderRadius: 8 * Layout.ratio,
		paddingHorizontal: 8 * Layout.ratio,
		fontSize: FontSize[16],
		color: Theme.text,
		backgroundColor: Theme.medium,
	},
});