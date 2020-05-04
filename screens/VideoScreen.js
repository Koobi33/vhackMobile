import React, { useState, useEffect } from 'react';
import {StyleSheet, TouchableOpacity, Text, useWindowDimensions, View} from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Button} from '@ui-kitten/components';
import useTimeout from 'use-timeout';
import { RadioGroup, Radio } from '@ui-kitten/components';
import io from 'socket.io-client';

export default function VideoScreen ({ route, navigation }) {


  const apiKey = '46699602';
  const sessionId = '1_MX40NjY5OTYwMn5-MTU4ODQzNjU1OTczOX5MeFZHRFlkQS9YUnBTRkNFbm1lWTFxT3Z-fg';
  const token = 'T1==cGFydG5lcl9pZD00NjY5OTYwMiZzaWc9OGVmOTU2NmU4ZWVlNTlkNGMyOWFmY2ExZThhNjUzMzI4OWZiMmYyNDpzZXNzaW9uX2lkPTFfTVg0ME5qWTVPVFl3TW41LU1UVTRPRFF6TmpVMU9UY3pPWDVNZUZaSFJGbGtRUzlZVW5CVFJrTkZibTFsV1RGeFQzWi1mZyZjcmVhdGVfdGltZT0xNTg4NDM2ODUwJm5vbmNlPTAuNDY5NDM3OTIzODcwNTQ1NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTkxMDI4ODQ5JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
  const [audioOn, setAudioOn] = useState(false);
  const [connected, setConnected] = useState(false);


  const width = useWindowDimensions().width;


  const questions = {
    topic: 'Present Simple, Form of Affirmative Sentences',
    text: 'Put the verb into the correct form.',
    answers: ['listen', 'listening',],
    rightAnswer: 'listen',
    };

  const [socket, setSocket] = useState(io("194.87.94.107:5555/", {
      'reconnection': true,
      'reconnectionDelay': 1000,
      'reconnectionAttempts': Infinity,
      'transports': ['websocket'],
      'forceNode': true,
    }
  ));


  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.on("publish", (question) => {
        let parseQuestion = JSON.parse(question);
        const answers = parseQuestion.answers.split(';');
        // setQuestion({...parseQuestion, answers});
        // setShowQuestion(true);
      });
    }}, []);

  const PrimaryQuiz = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showQuestion, setShowQuestion] = useState(false);
    useTimeout(() => {
      setShowQuestion(true);
    }, 40 * 1000);
    return (showQuestion && <View style={{height: '48%', width: '100%', backgroundColor: 'white'}}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>{questions.topic}</Text>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>{questions.text}</Text>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          <Radio>{questions.answers[0]}</Radio>
          <Radio>{questions.answers[1]}</Radio>
          {/*<Radio>{questions.answers[2]}</Radio>*/}
          {/*<Radio>{questions.answers[3]}</Radio>*/}
        </RadioGroup>
        <Button
          onPress={() => {
            // socket.emit('insertpoll', JSON.stringify( { ...questions, mark: Number(questions.right === question.answers[selectedIndex]) } ));
            setShowQuestion(false);
          }}>
          Ответить
        </Button>
      </View>);
  };


  return (
    <SafeAreaView style={styles.container}>

      { connected &&
      (<View style={{ height: '100%',justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
        <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
          <OTSubscriber style={{ width, height: 260, backgroundColor: 'gray' }}
          />
          <OTPublisher properties={{
            publishAudio: audioOn,
            videoTrack: false,
          }} />
          <Button
            onPress={()=> setAudioOn(!audioOn)}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{audioOn ? 'Выключить звук' : "Поднять руку"}</Text>
          </Button>
        </OTSession>
        <PrimaryQuiz />
      </View>)}
      {!connected &&
      (<Button
        onPress={()=> setConnected(true)}>
        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Подключиться к уроку</Text>
      </Button>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fafafa',
  },
  cancel: {
    backgroundColor:'#E74C3C',
    flex:1,
    margin:5,
    alignItems:'center',
    borderRadius:5,
    justifyContent:'center'
  }
});
