import React, { useEffect, useState, useRef } from 'react';
import { Image, View, Modal, Text, useWindowDimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel from 'react-native-snap-carousel';
import Hero from 'react-native-hero';
import Tooltip from 'react-native-walkthrough-tooltip';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const ImagePickerButton = (props) => {
  const { images: initialImages } = props;
  const [images, setImages] = useState(initialImages);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        // aspect: [3, 5],
        quality: 1,
      });
      alert(JSON.stringify(result));
      if (!result.cancelled) {
        const newImages = images.concat({
          url: result.uri,
          uriForImage: { uri: result.uri },
          props: {
            style: { width: 200, height: 200 },
            pins: [],
          }});
        setImages(newImages);
      }

      console.log(result);
    } catch (E) {
      alert(E);
    }
  };

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setZoomVisible(true)} style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={ item.uriForImage }
          style={{ height: 300 }}
        />
      </TouchableOpacity>
    );
  };

  const TooltipItem = (props) => {
    const { pins } = props;
    // alert(JSON.stringify(pins));
    const [toolTipVisible, setToolTipVisible] = useState(false);

    const handleVisible = () => {
      setToolTipVisible(!toolTipVisible);
    };
    return (
      <Tooltip
        isVisible={toolTipVisible}
        content={<Text>{pins[2]}</Text>}
        placement="bottom"
        showChildInTooltip={false}
        onClose={handleVisible}
        arrowStyle={{ display: 'none' }}
      >
      <TouchableOpacity
        onPress={handleVisible}
        >
         <Ionicons
           focused={toolTipVisible}
          name={"md-eye"}
          size={30}
          color={toolTipVisible ? Colors.iconToolTipSelected : Colors.iconToolTip}
        />
      </TouchableOpacity>
    </Tooltip>)
  };

  const CustomImage = (props) => {
    const { source, style, pins } = props;
    const imageWidth = style.width;
    const imageHeight = style.height;



    return (
      <Hero
        // fullWidth
        minHeight={Math.floor(style.height) > 0 ? Math.floor(style.height) : 500}
        source={source}
        customImageProps={{ flex: 1, resizeMode: 'contain', height: '100%' }}
        renderOverlay={() => (
          <View
            style={{ flex: 1, height: imageHeight, width: imageWidth }}
          >
            {pins.map((item, index) => {
              const offsetLeft = `${item[0] / 10}%`;
              const offsetTop = `${item[1] / 10}%`;
              return (
                <View key={index} style={{  left: offsetLeft,  top: offsetTop }}>
                  <TooltipItem  pins={item}/>
                </View>)
            })}
          </View>
        )} />
  )};

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const slider = useRef();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>стр. 33 упр. 777</Text>
      {images.length > 0 &&
      (<Carousel
        layout={"default"}
        ref={ref => slider.current = ref}
        renderItem={_renderItem}
        data={images}
        sliderWidth={300}
        itemWidth={200}
        onSnapToItem={index => setActiveIndex(index)}
      />)}
      {images.length > 0 && (
        <Modal visible={zoomVisible} transparent={true} onRequestClose={() => setZoomVisible(false)}>
          <ImageViewer
            enableSwipeDown={true}
            renderImage={(data) => CustomImage(data)}
            onCancel={() => setZoomVisible(false)}
            onSwipeDown={() => setZoomVisible(false)}
            imageUrls={images} index={activeIndex} />
        </Modal>
      )}
      <Button onPress={async () => {
        await _pickImage();
      }}>
        Загрузить домашнее задание
      </Button>
    </View>
  );
};


export default ImagePickerButton;
