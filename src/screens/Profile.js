import React from "react";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import {
	StyleSheet,
	ScrollView,
	View,
	Image,
	Alert,
	TouchableOpacity,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import AppText from "../components/AppText";
import FormField from "../components/FormField";
import Button from "../components/Button";
import UserAvatar from "../components/UserAvatar";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";

import realmConnect from "../realm";
import bind from "../redux/bind";

const HEIGHT = 300 * Layout.ratio;
const DIMENSION = 2000;

class Profile extends React.Component {
	constructor(props) {
		super(props);

		const {
			user,
		} = this.props;

		this.state = {
			realm: null,
			name: user.name,
			phone: user.phone,
			email: user.email,
			password: user.password,
		};
	}

	componentDidMount() {
		realmConnect(realm => {
			this.setState({ realm });
		});
	}

	async handleUpdate() {
		const {
			user, authenticateUser,
		} = this.props;

		try {
			const { realm } = this.state;
			realm.write(() => {
				let userInstance = realm.objects("User").filtered(`email = "${user.email}"`);
				if (userInstance.length !== 0) {
					userInstance = userInstance[0];
					userInstance.name = this.state.name;
					userInstance.phone = this.state.phone;
					authenticateUser({
						...user,
						name: this.state.name,
						phone: this.state.phone,
					});
					Alert.alert("Success",
						"Profile information updated successfully!");
				}
			});
		}
		catch (e) {
			Alert.alert("Error while updating profile",
				"An unknown problem occurred while trying to update profile information");
			console.log(e);
		}
	}

	render() {
		const { user } = this.props;

		return (
			<SafeAreaInsetsContext.Consumer>
				{(insets) => (
					<ScrollView style={{ flex: 1, backgroundColor: Theme.bright, }}>
						<View style={styles.curvedHeaderContainer}>
							<LinearGradient
								colors={[Theme.gradient.start, Theme.gradient.end]}
								style={[styles.headerContainer, { paddingTop: insets.top, }]}
							>
								<TouchableOpacity
									style={styles.backButton}
									onPress={() => this.props.navigation.goBack()}
								>
									<Image source={require("../assets/img/back.png")} style={styles.backIcon} />
								</TouchableOpacity>
								<View style={styles.avatarContainer}>
									<UserAvatar
										style={styles.avatar}
										dimension={130 * Layout.ratio}
									/>
								</View>
								<AppText style={styles.name}>{this.state.name}</AppText>
								<AppText style={styles.email}>{this.state.email}</AppText>
							</LinearGradient>
						</View>
						<View style={[
							styles.formContainer,
							{
								paddingTop: HEIGHT + 26 * Layout.ratio,
								paddingBottom: insets.bottom + 20 * Layout.ratio,
							}
						]}>
							<FormField
								style={styles.formField}
								icon={
									<Image
										source={require("../assets/img/avatar-placeholder.png")}
										style={[styles.formFieldIcon, { width: 20 * Layout.ratio }]}
									/>
								}
								secureTextEntry={false}
								onChangeText={(text) => this.setState({ name: text })}
								value={this.state.name}
								placeholder="Full Name"
								editable={false}
								toggleToEdit={user.signInMethod === "EMAIL"}
							/>
							<FormField
								style={styles.formField}
								icon={
									<Image
										source={require("../assets/img/phone.png")}
										style={[styles.formFieldIcon, { width: 20 * Layout.ratio }]}
									/>
								}
								secureTextEntry={false}
								onChangeText={(text) => this.setState({ phone: text })}
								value={this.state.phone}
								keyboardType="number-pad"
								placeholder="Phone no."
								editable={false}
								toggleToEdit={user.signInMethod === "EMAIL"}
							/>
							<FormField
								style={styles.formField}
								icon={
									<Image
										source={require("../assets/img/mail.png")}
										style={[styles.formFieldIcon, { width: 20 * Layout.ratio }]}
									/>
								}
								secureTextEntry={false}
								onChangeText={(text) => this.setState({ email: text })}
								value={this.state.email}
								placeholder="Email"
								editable={false}
							/>
							{
								user.signInMethod === "EMAIL" &&
								<Button
									style={styles.submitButton}
									label="Update"
									onPress={() => this.handleUpdate()}
								/>
							}
						</View>
					</ScrollView>
				)}
			</SafeAreaInsetsContext.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	curvedHeaderContainer: {
		position: "absolute",
		alignItems: "center",
		height: DIMENSION,
		width: DIMENSION,
		borderRadius: DIMENSION / 2,
		top: -DIMENSION + HEIGHT,
		left: (Layout.window.width - DIMENSION) / 2,
		paddingTop: DIMENSION - HEIGHT,
		zIndex: 1,
		overflow: "hidden",
	},
	headerContainer: {
		height: HEIGHT,
		width: Layout.window.width,
	},
	backButton: {
		alignSelf: "flex-start",
		marginTop: 20 * Layout.ratio,
		marginLeft: 20 * Layout.ratio,
	},
	backIcon: {
		height: 20 * Layout.ratio,
		width: 24 * Layout.ratio,
	},

	avatarContainer: {
		alignSelf: "center",
		height: 130 * Layout.ratio,
		width: 130 * Layout.ratio,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 130 / 2 * Layout.ratio,
		elevation: 4,
		marginBottom: 16 * Layout.ratio,
		backgroundColor: Theme.bright,
		overflow: "hidden",
	},

	name: {
		alignSelf: "center",
		fontSize: FontSize[22],
		fontWeight: "bold",
		color: Theme.bright,
		marginBottom: 5 * Layout.ratio,
	},
	email: {
		alignSelf: "center",
		fontSize: FontSize[16],
		color: Theme.bright,
	},

	formContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: Theme.bright,
	},

	formField: {
		alignSelf: "stretch",
		marginHorizontal: 20 * Layout.ratio,
		marginBottom: 16 * Layout.ratio,
	},
	formFieldIcon: {
		width: 17 * Layout.ratio,
		resizeMode: "contain",
	},
	submitButton: {
		alignSelf: "stretch",
		marginTop: 10 * Layout.ratio,
		marginHorizontal: 20 * Layout.ratio,
		marginBottom: 16 * Layout.ratio,
	},

	horizontalBar: {
		alignSelf: "stretch",
		height: 1,
		marginHorizontal: 45 * Layout.ratio,
		marginBottom: 12 * Layout.ratio,
		backgroundColor: Theme.medium,
	},

	footerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	footerText: {
		fontSize: FontSize[10],
		color: Theme.text,
	},
	footerLink: {
		marginLeft: 4 * Layout.ratio,
		fontSize: FontSize[10],
		fontWeight: "bold",
		color: Theme.primary,
	},
	footerChevron: {
		marginTop: 2.4,
		marginLeft: 1.5,
		height: 10 * Layout.ratio,
		width: 10 * 500 / 700 * Layout.ratio,
	},
});

export default bind(Profile);