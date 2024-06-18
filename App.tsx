/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useCallback, Fragment} from 'react';
import {
  Modal,
  Button,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
} from 'react-native';

import {CalendarList, DateData} from 'react-native-calendars';

const RANGE = 4;
const initialDate = '2022-07-05';

const CalendarListScreen = () => {
  const [selected, setSelected] = useState(initialDate);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [notes, setNotes] = useState({});
  const [text, setText] = React.useState('');

  const onDayPress = (day: DateData) => {
    const dayStr = day.dateString;
    setSelected(dayStr);

    setIsModalVisible(true);
    setText('');
  };

  const onSave = () => {
    setMarkedDates(json => {
      json[selected] = {marked: true};
      return json;
    });
    setNotes(json => {
      json[selected] = text;
      return json;
    });
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <FlatList
          data={notes[selected]}
          renderItem={(item) => {
            return <Text>{item.item}</Text>;
          }}
        />
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="Appointment"
        />
        <Button onPress={() => setIsModalVisible(false)} title="Close" />
        <Button onPress={onSave} title="Save" />
      </Modal>
      <CalendarList
        current={initialDate}
        pastScrollRange={RANGE}
        futureScrollRange={RANGE}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
    </Fragment>
  );
};

function App(): React.JSX.Element {
  return <CalendarListScreen />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
