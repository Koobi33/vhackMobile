import React, { useState } from 'react';
import { Layout, Menu, Icon, MenuItem, MenuGroup } from '@ui-kitten/components';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';


const SubjectScreen = ({ route, navigation }) => {

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const SmartphoneIcon = (props) => (
    <Icon {...props} name='smartphone-outline'/>
  );

  const BrowserIcon = (props) => (
    <Icon {...props} name='browser-outline'/>
  );

  const ColorPaletteIcon = (props) => (
    <Icon {...props} name='color-palette-outline'/>
  );

  const StarIcon = (props) => (
    <Icon {...props} name='star'/>
  );

  return (
    <Layout style={{flex: 1}} level='1'>
      <Menu
        selectedIndex={null}
        onSelect={() => {}}>
        <MenuGroup style={styles.menuGroupContainer} title={() => <Text style={styles.menuGroupText}>Ближайший Урок</Text>}>
          <MenuItem style={styles.menuItemContainer} title={() => <Text style={styles.menuItemText}>15.05.2020 Тема: Нейроны</Text>} />
        </MenuGroup>
        <MenuGroup style={styles.menuGroupContainer} title={() => <Text style={styles.menuGroupText}>Посещаемость</Text>}>
          <MenuItem style={styles.menuItemContainer} title={() => <Text style={styles.menuItemText}>10/15</Text>} />
        </MenuGroup>
        <MenuGroup style={styles.menuGroupContainer} title={() => <Text style={styles.menuGroupText}>Оценки</Text>}>
          <MenuItem style={styles.menuItemContainer} title={() => <Text style={styles.menuItemText}>4 5 4 3 5 5 5</Text>} />
        </MenuGroup>
        <MenuGroup style={styles.menuGroupContainer} title={() => <Text style={styles.menuGroupText}>Домашняя работа</Text>}>
          <MenuItem style={styles.menuItemContainer} title={() => <Text style={styles.menuItemText}>Стр. 2 упр. 2, 3, 4</Text>} />
        </MenuGroup>
        <MenuGroup style={styles.menuGroupContainer} title={() => <Text style={styles.menuGroupText}>Преподаватель</Text>}>
          <MenuItem style={styles.menuItemContainer} title={() => <Text style={styles.menuItemText}>Марья Ивановна</Text>} />
        </MenuGroup>
          <MenuItem style={styles.menuGroupContainer} title={() => <Text style={styles.menuGroupText}>Достижения</Text>} />
      </Menu>
    </Layout>

  );
};

const styles = StyleSheet.create({
  menuGroupContainer: {
    height: 120,
  },
  menuGroupText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  menuItemContainer: {
    // backgroundColor: '#E2E6ED',
    backgroundColor: '#e0d8ff',
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
});

export default SubjectScreen;
