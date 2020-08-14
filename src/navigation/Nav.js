import "react-native-gesture-handler";
import SplashScreen from 'react-native-splash-screen'
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "../screens/Auth";
import Drawer from "../screens/Drawer";
import Profile from "../screens/Profile";
import Product from "../screens/Product";

import realmConnect from "../realm";
import bind from "../redux/bind";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../redux/reducers";
import { signIn } from "../helpers/authentication";

const store = createStore(reducer);

const Stack = createStackNavigator();
class Screens extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			realm: null,
		}
	}

	componentDidMount() {
		const {
			authenticateUser,
			updateCart,
			updatePromo
		} = this.props;

		try {
			realmConnect(realm => {
				realm.write(() => {
					let userCheck = realm.objects("User").filtered(`isSignedIn = true`);
					if (userCheck.length) {
						const user = userCheck[0];
						signIn({
							email: user.email,
							password: user.password,
						}, authenticateUser, updateCart, updatePromo, this.props.navigation);
					}

					let findPromoHALF = realm.objects("Promo").filtered(`code = "HALF"`);
					let findPromoQUARTER = realm.objects("Promo").filtered(`code = "QUARTER"`);
					if (!findPromoHALF.length) {
						realm.create("Promo", {
							code: "HALF",
							discount: 50,
						});
					}
					if (!findPromoQUARTER.length) {
						realm.create("Promo", {
							code: "QUARTER",
							discount: 25,
						});
					}
				});
				this.setState({ realm });
			});
			SplashScreen.hide();
		}
		catch (e) {
			console.log("Error while checking existing logged-in account:", e);
		}
	}

	render() {
		const { email } = this.props.user;

		return (
			<SafeAreaProvider>
				<StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName={email ? "Drawer" : "Authentication"}
						screenOptions={{
							headerShown: false,
						}}
					>
						{
							!email &&
							<Stack.Screen name="Authentication" component={Auth} />
						}
						<Stack.Screen name="Drawer" component={Drawer} />
						<Stack.Screen name="Profile" component={Profile} />
						<Stack.Screen name="Product" component={Product} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		);
	}
}

Screens = bind(Screens);

class Nav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<Screens />
			</Provider>
		);
	}
}

export default Nav;