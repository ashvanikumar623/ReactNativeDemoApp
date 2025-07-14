import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  Vibration,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import i18n from '../app_language/I18n';
import { Colors, Images } from '../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

const MyCamera = (props: any) => {
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const isFocused = useIsFocused();
  const [position, setPosition] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
      Geolocation.getCurrentPosition(
        pos => {
          setPosition(JSON.stringify(pos));
        },
        error => {
          if (error.PERMISSION_DENIED == 1) {
            Alert.alert('Error', i18n.t('location_permission_error'));
          } else {
            Alert.alert('Error', error.message);
          }
        },
        { enableHighAccuracy: true },
      );
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      Vibration.vibrate(1500);
      setIsCapturing(true);
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });
      await AsyncStorage.setItem('profileImage', photo.path);
      if (position != null) {
        await AsyncStorage.setItem('location', position);
      }
      props.navigation.navigate('MyProfile');
    } catch (error) {
      Alert.alert(i18n.t('capture_failed'));
    } finally {
      setIsCapturing(false);
    }
  };

  const renderContent = () => {
    if (hasPermission === null) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.infoText}>{i18n.t('checking_permissions')}</Text>
        </View>
      );
    }

    if (!hasPermission) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>
            {i18n.t('camera_permission_error')}
          </Text>
        </View>
      );
    }

    if (!device) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{i18n.t('no_camera')}</Text>
        </View>
      );
    }

    return (
      <>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused}
          photo={true}
        />
        <TouchableOpacity
          onPress={takePicture}
          style={styles.captureButton}
          disabled={isCapturing}
        >
          <Text style={styles.buttonText}>
            {isCapturing ? i18n.t('capturing') : i18n.t('take_picture')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={Images.back_arrow} style={styles.backIcon}></Image>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.red,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 10,
    fontFamily: 'Outfit-Regular',
  },
  captureButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: Colors.secondry,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  backIcon: {
    height: 25,
    width: 25,
  },
});

export default MyCamera;
