import React, { useState, useEffect } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import agendaService from '../services/agendaService';
import moment from 'moment';


const testIDs = require('../testIDs');

LocaleConfig.locales['ru'] = {
  monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  monthNamesShort: ['Янв.','Февр.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.'],
  dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
  dayNamesShort: ['Вс.','Пн.','Вт.','Ср.','Чт.','Пт.','Сб.'],
  today: 'Сегодня\'Сег'
};
LocaleConfig.defaultLocale = 'ru';

const AgendaScreen = ({ navigation }) => {

  const [items, setItems] = useState({});
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getItems()
  }, []);

  const getItems = async () => {
    const lessons = await agendaService.getLessons();
    setLessons(lessons);
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };


  const loadItems = async (day) => {
    setTimeout(() => {
      const newLessons = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          newLessons[strTime] = [];
          lessons.forEach((item) => {
            const itemDate = timeToString(item.begin_time);
            if (itemDate === strTime) {
              newLessons[strTime].push(item);
            }

          })
        }
      }

      const newItems = {};
      Object.keys(newLessons).forEach(key => {
        newItems[key] = newLessons[key];
      });
      setItems(newItems);
    }, 1500);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: 100}]}
        onPress={() => {
          navigation.navigate('Lesson', {
            id: item.id,
            item,
            title: item.lesson
          })
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.lessonNameText}>{item.lesson}</Text>
          <View style={{ flexDirection: 'row'}}>
            <Text style={styles.lessonInfoText}> {moment(item.begin_time).format('hh:mm')}</Text>
            <Text style={styles.lessonInfoText}> - </Text>
            <Text style={styles.lessonInfoText}>{moment(item.end_time).format('hh:mm')}</Text>
          </View>
        </View>
        <Text style={styles.lessonInfoText}>{item.teacher_name}</Text>
        {/*<View style={{ flex: 1, marginTop: 10, }}>*/}
        {/*  <Text style={styles.lessonInfoText}>Домашнее задание: {item.homework}</Text>*/}
        {/*</View>*/}
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        {/*<Text styles={{ fontSize: 25, fontWeight: '600' }}>На эту дату ничего не запланировано!</Text>*/}
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2020-04-27'}
        renderItem={renderItem}
        renderEmptyDate={() => renderEmptyDate()}
        rowHasChanged={rowHasChanged}
        firstDay={1}
      />
    </SafeAreaView>
  );
};


  const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 20,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
    lessonNameText: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    lessonInfoText: {
      fontWeight: '400',
      fontSize: 20,
    }
  });

  export default AgendaScreen;
