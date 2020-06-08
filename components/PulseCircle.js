import * as React from "react";
import Svg, { Circle, Rect } from "react-native-svg";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

const PulseCircle = () => {
  // const [tick, setTick] = React.useState(false);
  const [radius, setRadius] = React.useState(9);
 
  console.log("PulseCircle radius :>> ", radius);
  // console.log("PulseCircle tick :>> ", tick);

  let tick;

  React.useEffect(() => {
    // console.log("PulseCircle radius :>> ", radius);
    // console.log("PulseCircle tick :>> ", tick);

    let timer = setInterval(() => {
      if (tick) {
        setRadius((radius) => radius - 2);
        tick = !tick;
      } else {
        setRadius((radius) => radius + 2);
        tick = !tick;
      }
      // setTick((tick) => !tick);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Svg height="100%" width="100%">
      <Circle cx={vmax(4)} cy={vmax(4)} r={radius} fill="green" />
    </Svg>
  );
};

export default PulseCircle;
