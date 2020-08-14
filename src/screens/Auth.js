import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

import Signup from "./Signup";
import Login from "./Login";

const Tab = createMaterialTopTabNavigator();

export default function Auth() {
	return (
		<Tab.Navigator
			tabBarPosition="top"
			tabBarOptions={{
				showIcon: false,
				showLabel: false,
			}}
			tabBar={props => null}
			initialRouteName="Signup"
			backBehavior="initialRoute"
			lazy={false}
			keyboardDismissMode="auto"
			swipeEnabled={false}
			initialLayout={{ width: Dimensions.get("window").width }}
		>
			<Tab.Screen name="Signup" component={Signup}/>
			<Tab.Screen name="Login" component={Login}/>
		</Tab.Navigator>
	);
}