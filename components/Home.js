import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";
import { setTracks } from "../redux/mediaActions";

import Controls from "./Controls";

const Home = ({ loading, tracks, setTracks }) => {
  React.useEffect(() => {
    
    let mounted = true;
    console.log("mounted :>> ", mounted);

    if (mounted) setTracks();
    // console.log('setTracks :>> ',setTracks());
    // console.log('tracks Home1:>> ', tracks);
    return () => (mounted = false);
  }, []);

  // console.log('tracks :>> ', tracks);
  console.log('tracks Home2:>> ', tracks[8]);

  let markup = !loading ? (
    <Controls tracks={tracks} />
  ) : (
    <Text>Loading...</Text>
  );

  //   console.log("markup :>> ", markup);

  return (
    <View style={styles.container}>
      <View style={styles.lineStyle} />
      {markup}
    </View>
  );
};

// class Home extends React.Component {
//   componentDidMount() {
//     this.props.setTracks();
//   }

//   render() {
//     const { tracks, loading } = this.props;

//     let markup = !loading ? (
//       <Controls tracks={tracks} />
//     ) : (
//       <Text>Loading...</Text>
//     );
//     return (
//       <View style={styles.container}>
//         <View style={styles.lineStyle} />
//         {markup}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#2f712f",
    marginHorizontal: vw(2),
  },
});

const mapStateToProps = (state) => ({
  loading: state.loading,
  tracks: state.tracks,
});

export default connect(mapStateToProps, { setTracks })(Home);
