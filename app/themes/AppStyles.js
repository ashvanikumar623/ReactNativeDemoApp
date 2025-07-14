import { StyleSheet } from "react-native";
import colors from "./Colors";
const AppStyles = StyleSheet.create({
  full: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 38,
    color: colors.white,
    marginTop:20,
    fontFamily:"Outfit-Medium",
    alignSelf: "center",
    textAlign: "center",
  },
  subTitle: {
    fontFamily:"Outfit-Medium",
    fontSize: 16,
    color: colors.white,
    marginTop: 0,
    alignSelf: "center",
    textAlign: "center",
  },
  headerLogo: {
    height: 50,
    width: 250,
    marginTop: 50,
    marginBottom: 70,
    alignSelf: "center",
    resizeMode: "stretch",
  },
});
export default AppStyles;
