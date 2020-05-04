import React, { useState, useContext } from 'react';
import { Avatar, Layout, Divider, Icon, OverflowMenu } from '@ui-kitten/components';
import avatar from '../../assets/images/avatar.png';
import { View, StyleSheet, Text, useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';

const PersonalScreen = ({ navigation }) => {

  const PersonalInfo = () => {
  const windowWidth = useWindowDimensions().width;
    return (
      <Layout style={styles.personalInfo} level="3">
        <TouchableWithoutFeedback onPress={() => alert('сюда потом добавить выход')}>
          <Avatar style={styles.avatar} shape='round' source={avatar}/>
        </TouchableWithoutFeedback>
        <View style={styles.avatarName}>
          <View style={{ width: windowWidth * 0.70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.name}>Оксана Винирьянова</Text>
            <Text style={styles.name}>11А</Text>
          </View>
          <Progress.Bar style={{ marginVertical: 5 }} progress={0.67} color={'rgb(124,116,225)'} unfilledColor={'rgba(124,116,225, 0.5)'} height={12} width={windowWidth * 0.70} />
          <View style={{ width: windowWidth * 0.70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.level}>Повелительница морей ур. 4</Text>
          </View>
        </View>
        <Divider />
      </Layout>
    );
  };

  const MenuItem = ({ iconName, title, link }) => (
      <Layout style={styles.menuElementLayout} level='3'>
        <TouchableOpacity onPress={() => navigation.navigate(link, { title })} style={styles.menuElementContainer}>
          <View style={styles.iconContainer}>
            <Icon
              style={styles.icon}
              fill='rgb(124,116,225)'
              name={iconName}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{title}</Text>
          </View>
        </TouchableOpacity>
      </Layout>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }} level='1'>
        <PersonalInfo />
        <ScrollView>
          <Layout style={styles.container} level='2'>
            <MenuItem title="Предметы" iconName="book-open-outline" link="subjectList" />
            <MenuItem title="Олимпиады" iconName="pantone-outline" link="olympics" />
            <MenuItem title="Достижения" iconName="award-outline" link="achievements" />
            <MenuItem title="Поступление" iconName="file-text-outline" link="university" />
          </Layout>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  personalInfo: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  avatar: {
    height: 75,
    width: 75,
  },
  avatarName: {
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  level: {
    fontWeight: '600',
    fontSize: 18,
  },
  menuElementLayout: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuElementContainer: {
    height: 150,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    height: '100%',
    flexBasis: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 70,
    width: 70,
  },
  descriptionContainer: {
    height: '100%',
    flexBasis: '65%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  descriptionTitle: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PersonalScreen;
