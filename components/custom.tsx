import { Text as RNText, TextProps } from "react-native";

export const Text = ({ style, children, ...props }: TextProps) => {
  return (
    <RNText style={[{ fontFamily: "SpaceMono-Regular" }, style]} {...props}>
      {children}
    </RNText>
  );
};

// imake manje yonke i text engifuna ukuyifaka font izoza lana ? Yes

// weee kodwa i just want to make whole app use one font style..... "SpaceMono-Regular"? Yes? Then this will do it

// Just import this Text component instead of the one from react-native

// imake ngiyozama kuyenza ku explore page 