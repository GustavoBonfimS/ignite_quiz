import { useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurMask, Canvas, Rect } from "@shopify/react-native-skia";
import { THEME } from "../../styles/theme";
import { useEffect } from "react";

const STATUS = [
  "transparent",
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
];

type OverlayFeedbackProps = {
  status: number;
};

function OverlayFeedback({ status }: OverlayFeedbackProps) {
  const { height, width } = useWindowDimensions();
  const color = STATUS[status];

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }, [status]);

  const styleAnimated = useAnimatedStyle(() => ({
    height: "100%",
    width,
    position: "absolute",
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={styleAnimated}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={color}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  );
}

export { OverlayFeedback };
