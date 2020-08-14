import React from "react";
import {Image,View} from "react-native";

import AppText from "./AppText";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";

import bind from "../redux/bind";

class UserAvatar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { user, dimension, style: styleProp } = this.props;

		const styles = {
			image: {
				height: dimension * Layout.ratio,
				width: dimension * Layout.ratio,
				borderRadius: dimension / 2 * Layout.ratio,
			},
			container: {
				height: dimension * Layout.ratio,
				width: dimension * Layout.ratio,
				borderRadius: dimension / 2 * Layout.ratio,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: Theme.text,
			},
			text: {
				fontSize: Math.round(dimension / 2),
				fontWeight: "bold",
				color: Theme.bright,
			},
		};

		return (
			user.avatarSource ?
			<Image source={{ uri: user.avatarSource }} style={[styles.image, styleProp]} /> :
			<View style={[styles.container, styleProp]}>
				<AppText style={styles.text}>{user.nameAbbr}</AppText>
			</View>
		);
	}
}

export default bind(UserAvatar);