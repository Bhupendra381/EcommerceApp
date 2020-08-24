import React from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Image,
	TouchableOpacity,
} from "react-native";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";

export default class FormField extends React.Component {
	constructor(props) {
		super(props);

		const editable = this.props.editable !== false;
		this.state = {
			editable,
		};
	}

	render() {
		const {
			style,
			icon,
			secureTextEntry = false,
			keyboardType = "default",
			onChangeText,
			value = "",
			placeholder = "",
			toggleToEdit = false,
		} = this.props;

		return (
			<View style={[styles.container, style]}>
				<View style={styles.iconContainer}>{icon}</View>
				<TextInput
					style={styles.field}
					keyboardType={keyboardType}
					returnKeyType="done"
					selectionColor={Theme.text + "99"}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={Theme.text}
					value={value}
					secureTextEntry={secureTextEntry}
					underlineColorAndroid="transparent"
					allowFontScaling={false}
					disableFullscreenUI={true}
					editable={this.state.editable}
					onBlur={() => {
						if (toggleToEdit && this.state.editable) this.setState({ editable: false, });
					}}
				/>
				{
					toggleToEdit && !this.state.editable &&
					<TouchableOpacity
						onPress={() => this.setState({ editable: true, })}
						style={styles.editButton}
					>
						<Image
							source={require("../assets/img/edit.png")}
							style={styles.editIcon}
						/>
					</TouchableOpacity>
				}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		height: 50 * Layout.ratio,
		borderRadius: 25 * Layout.ratio,
		paddingRight: 16 * Layout.ratio,
		backgroundColor: Theme.medium,
	},
	iconContainer: {
		height: 50 * Layout.ratio,
		width: 40 * Layout.ratio,
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 10 * Layout.ratio,
	},
	field: {
		fontSize: FontSize[14],
		color: Theme.text,
	},
	editButton: {
		position: "absolute",
		right: 10 * Layout.ratio,
		top: 0,
		height: 50 * Layout.ratio,
		width: 30 * Layout.ratio,
		alignItems: "center",
		justifyContent: "center",
	},
	editIcon: {
		height: 40 * Layout.ratio,
		width: 17 * Layout.ratio,
		resizeMode: "contain",
	},
});

const verify = {
	name: (text) => {
		text = text.trim();
		let error = "";
		if (text === "") error = "Name cannot be empty!";
		return {
			text,
			error,
		};
	},

	phone: (text) => {
		text = text.trim();
		let error = "";
		if (text === "") error = "Phone no. cannot be empty!";
		if (!RegExp(/^\d{10}$/).test(text)) error = "Phone no. must have 10 digits.";

		return {
			text,
			error,
		};
	},

	email: (text) => {
		text = text.trim();
		let error = "";
		if (text === "") error = "Email cannot be empty!";
		if (!RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
			.test(text)) error = "Invalid email format. Kindly make sure the email is typed correctly.";
		return {
			text,
			error,
		};
	},

	password: (text) => {
		text = text.trim();
		let error = "";
		if (text === "") error = "Password cannot be empty!";
		return {
			text,
			error,
		};
	},
};

export { verify };
