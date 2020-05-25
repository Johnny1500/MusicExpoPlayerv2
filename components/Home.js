import * as React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Audio } from "expo-av";
import * as ScreenOrientation from 'expo-screen-orientation';

// Redux stuff
import { connect } from "react-redux";
import { setTracks, setPhoneOrientation } from "../redux/mediaActions";

// import Controls from "./Controls";
import Player from "./Player";

const Home = ({ loading, setTracks, setPhoneOrientation }) => {
  React.useEffect(() => {
    async function fetchData() {
      try {
        {
          await Audio.setAudioModeAsync({
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          });

          setTracks();
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();

    // console.log('Home ScreenOrientation :>> ', ScreenOrientation);

    ScreenOrientation.addOrientationChangeListener(async () => {
      let orientation = await ScreenOrientation.getOrientationAsync();
      console.log('Home orientation :>> ', orientation);
      setPhoneOrientation(orientation);
    })

  }, []);

  let markup = !loading ? (
    <Player />
  ) : (
    <View>
      <ActivityIndicator size="large" color="#2f712f" />
      <Text>Loading...</Text>
    </View>
  );

  return (
    <View style={loading ? styles.containerLoading : styles.containerControl}>
      {markup}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerControl: {
    flex: 1,
    justifyContent: "center",
  },
});

const mapActionsToProps = {
  setTracks,
  setPhoneOrientation
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  tracks: state.tracks,
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
