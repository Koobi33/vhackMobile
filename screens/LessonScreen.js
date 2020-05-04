import React, { useEffect, useState } from 'react';
import {TouchableOpacity, StyleSheet, ScrollView, Text, View} from 'react-native';
import { Layout, Button } from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import ImagePickerButton from './imagePicker/imagePicker';
import LessonService from '../services/LessonService';

export default function LessonScreen({ route, navigation }) {
  const {item} = route.params;

  const [image, setImage] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getImage = async () => {
    const img = await  LessonService.getImage();
    setImage(img);
    setDataLoaded(true);
  };

  useEffect(() => {
    getImage();
  }, []);

  moment.locale('ru');

  const Topic = () => (
    <Layout level="2" style={styles.lessonItem}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('knowledgeBase', { id: item.topic_id });
        }}>
        <View style={ styles.contentOneRow }>
          <Text style={ styles.titleText }>Тема урока: </Text>
          <Text style={ styles.contentText }>Дроби</Text>
        </View>
        <View style={ styles.contentOneRow }>
          <Text style={ styles.titleText }>Тип: </Text>
          <Text style={ styles.contentText }>Урок</Text>
        </View>
      </TouchableOpacity>
    </Layout>
  );

  const DateTime = () => (
    <Layout level="2" style={ [styles.lessonItem, styles.dateTimeContainer] }>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.dateText}>{moment(item.begin_date).format('DD MMMM')}</Text>
        <Text style={styles.yearText}>{moment(item.begin_date).format('YYYY')}</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.timeText}>{moment(item.begin_date).format('HH:mm')}</Text>
        <Text style={styles.timeText}>{moment(item.end_date).format('HH:mm')}</Text>
      </View>
    </Layout>
  );

  const Teacher = () => (
    <Layout level="2" style={ styles.lessonItem }>
      <View style={ styles.contentOneRow }>
        <Text style={ styles.titleText }>Учитель: </Text>
      </View>
      <Text style={ styles.contentText }>{item.teacher_name}</Text>
      <View style={{ marginTop: 25 }}>
      <Button onPress={() => {navigation.navigate('chatBot')}}>
        Задать вопрос
      </Button>
      </View>
    </Layout>
  );

  const Score = () => (
    <Layout level="2" style={ styles.lessonItem }>
      <View style={ styles.contentOneRow }>
        <Text style={ styles.titleText }>Оценка: </Text>
        <Text style={ styles.scoreText }>5</Text>
      </View>
    </Layout>
  );

  const HomeWork = () => (
    <Layout level="2" style={ styles.lessonItem }>
      <View style={ styles.contentOneRow }>
        <Text style={ styles.titleText }>Домашнее задание: </Text>
      </View>
      {dataLoaded && <ImagePickerButton images={[image]} />}
    </Layout>
  );

  return (
      <Layout style={styles.container} level="4">
        <ScrollView>
          <Score />
          <DateTime />
          <Topic />
          <Teacher />
          <HomeWork />
        </ScrollView>
      </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  lessonItem: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 35,
  },
  contentText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 55,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'red',
  }
});
