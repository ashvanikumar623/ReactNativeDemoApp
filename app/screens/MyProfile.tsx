import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '../app_language/I18n';
import { Colors, Images } from '../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const skills = [
  { name: 'Adobe Photoshop', color: '#00A8FF' },
  { name: 'Sketch App', color: '#f39c12' },
  { name: 'Adobe After Effects', color: '#9b59b6' },
  { name: 'HTML/CSS', color: '#27ae60' },
  { name: 'Invision App', color: '#e74c3c' },
  { name: 'Behance/Medium', color: '#34495e' },
];

const MyProfile = (props: any) => {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [locationLatLong, setLocationLatLong] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const imgPath = await AsyncStorage.getItem('profileImage');
      setImagePath(imgPath);
      const location = await AsyncStorage.getItem('location');
      if (location != null) {
        const pos = JSON.parse(location);
        setLocationLatLong(
          `Location : ${pos.coords.latitude},${pos.coords.longitude}`,
        );
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header with Image and Name */}
        <LinearGradient
          colors={['#ff5f6d', '#ffc371']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View>
            <Image
              source={
                imagePath != null && imagePath != ''
                  ? { uri: `file://${imagePath}` }
                  : Images.profile
              }
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.editImageTouch}
              onPress={() => {
                Vibration.vibrate(1500);
                props.navigation.navigate('MyCamera');
              }}
            >
              <Image source={Images.edit} style={styles.editImage}></Image>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Richa Darly</Text>
          <Text style={styles.location}>Abc, Xyz</Text>
          {locationLatLong != null && (
            <Text style={styles.location}>{locationLatLong}</Text>
          )}
        </LinearGradient>

        {/* Card Section */}
        <View style={styles.card}>
          <Text style={styles.title}>{i18n.t('productDesigner')}</Text>
          <Text style={styles.description}>
            Day dreamer designer specialized in making awesome solution for
            complex problems with having great visual interface.
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>257</Text>
              <Text style={styles.statLabel}>{i18n.t('posts')}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>2.8k</Text>
              <Text style={styles.statLabel}>{i18n.t('follower')}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>386</Text>
              <Text style={styles.statLabel}>{i18n.t('following')}</Text>
            </View>
          </View>

          {/* Follow Button */}
          <TouchableOpacity style={styles.followButton}>
            <LinearGradient
              colors={['#ff5f6d', '#ffc371']}
              style={styles.followGradient}
            >
              <Text style={styles.followText}>{i18n.t('follow')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Skills Section */}
        <View style={styles.skillsContainer}>
          <Text style={styles.skillsTitle}>{i18n.t('skills')}</Text>
          <View style={styles.skillTags}>
            {skills.map((skill, index) => (
              <View
                key={index}
                style={[
                  styles.skillTag,
                  { backgroundColor: `${skill.color}20` },
                ]}
              >
                <Text style={[styles.skillText, { color: skill.color }]}>
                  {skill.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatar: {
    width: 110,
    height: 110,
    marginTop: 30,
    borderRadius: 55,
    borderColor: '#fff',
    borderWidth: 3,
  },
  editImage: {
    width: 20,
    height: 20,
  },
  editImageTouch: {
    bottom: 0,
    right: 5,
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    position: 'absolute',
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    marginTop: 10,
  },
  location: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
    fontFamily: 'Outfit-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
  },
  followButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  followGradient: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
  },
  followText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
  skillsContainer: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
  },
  skillText: {
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
  },
});

export default MyProfile;
