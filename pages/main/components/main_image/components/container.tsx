import { MutableRefObject, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const Container = ({
  containerRef,
  children,
}: {
  containerRef: MutableRefObject<number>;
  children: ReactNode;
}) => {
  const onLayout = ({ nativeEvent: { layout } }) => {
    containerRef.current = layout.width;
  };
  return (
    <View style={styles.container} onLayout={onLayout}>
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
