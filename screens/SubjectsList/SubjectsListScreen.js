import React from 'react';
import {Icon, Layout} from '@ui-kitten/components';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, useWindowDimensions, Image } from 'react-native';
import chemistry from '../../assets/images/lessons/chemistry.jpg'
import english from '../../assets/images/lessons/english.jpg'
import geography from '../../assets/images/lessons/geography.jpg'
import literature from '../../assets/images/lessons/literature.jpg'
import math from '../../assets/images/lessons/math.jpg'
import russian from '../../assets/images/lessons/russian.jpg'
import * as Progress from "react-native-progress";

const SubjectsListScreen = ({ navigation }) => {
const windowWidth = useWindowDimensions().width;
  const Subject = ({image, title, lessonId, attendance, average}) => {
    let color;
    if (average >= 2 && average < 3) {
      color = 'red';
    } else if (average >= 3 && average < 4) {
      color = 'orange';
    } else if (average >= 4 && average <= 5) {
      color = 'green';
    }
    return (
      <Layout style={styles.menuElementLayout} level='3'>
        <TouchableOpacity
          onPress={() => navigation.navigate('lessonAverage', {title, image, lessonId})}
          style={styles.menuElementContainer}
        >
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{title}</Text>
            <Text style={[styles.descriptionAdditionalText, { color: color }]}>{average}</Text>
          </View>
          <Progress.Bar
            progress={getRandomInt(0, 1)}
            color={'rgb(124,116,225)'}
            unfilledColor={'rgba(124,116,225, 0.5)'}
            width={windowWidth * 0.92}/>
        </TouchableOpacity>
      </Layout>
    )
  };

  const getRandomInt = (min, max) => {
    return Number(Math.random() * (max - min + 1) + min).toFixed(2);
  };

  const subjectsList = [
    {
      title: 'Русский язык',
      lessonId: 1,
      image: russian,
      attendance: String(getRandomInt(1, 100)) + '%',
      average: String(getRandomInt(2, 4)),
    },
    {
      title: 'Литература',
      lessonId: 2,
      image: literature,
      attendance: String(getRandomInt(1, 100)) + '%',
      average: String(getRandomInt(2, 4)),
    },
    {
      title: 'Химия',
      lessonId: 3,
      image: chemistry,
      attendance: String(getRandomInt(1, 100)) + '%',
      average: String(getRandomInt(2, 4)),
    },
    {
      title: 'Математика',
      lessonId: 4,
      image: math,
      attendance: String(getRandomInt(1, 100)) + '%',
      average: String(getRandomInt(2, 4)),
    },
    {
      title: 'География',
      lessonId: 5,
      image: geography,
      attendance: String(getRandomInt(1, 100)) + '%',
      average: String(getRandomInt(2, 4)),
    },
    {
      title: 'Английский язык',
      lessonId: 6,
      image: english,
      attendance: String(getRandomInt(1, 100)) + '%',
      average: String(getRandomInt(2, 4)),
    },
  ];

  return (
    <Layout style={{flex: 1}} level='1'>
      <ScrollView>
        {subjectsList.map((item) => {

          return (
            <Subject
              key={item.lessonId}
              title={item.title}
              lessonId={item.lessonId}
              image={item.image}
              attendance={item.attendance}
              average={item.average}
            />)
        })}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  menuElementLayout: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuElementContainer: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '100%',
    flexBasis: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  icon: {
    height: 23,
    width: 23,
  },
  descriptionContainer: {
    height: '90%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  descriptionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  descriptionAdditional: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  descriptionAdditionalText: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 7,
    marginRight: 30,
  },
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(124,116,225, 0.85)',
    flexBasis: '35%',
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 20
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(124,116,225, 0.85)',
    flexBasis: '35%',
    paddingVertical: 3,
    paddingRight: 3,
    borderRadius: 20,
  },
});

export default SubjectsListScreen;
