import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';
import { PageIndicator } from 'react-native-page-indicator';

//save to finish onboarding
import { GetAllPermissions } from './global/permissions';
import { local_launch } from './global/localStorage';

const DATA = [
  {
    image: require("./images/onBoarding/buddy.png"),
    backgroundColor: '#7bcf6e',
    mode: 'logo',
    title:
      'Hi! My name is Buddy.',
    description:
      'Your provincial companion for motorcycle taxi and delivery services in the Philippines. ',
  },
  {
    image: require("./images/onBoarding/no-internet.png"),
    backgroundColor: '#4654a7',
    title:
      'Buddy is Reliable',
    description:
      'Engineered to ensure reliability, even in locations with slow internet, particularly in remote areas.',
  },
  {
    image: require("./images/onBoarding/affordable.png"),
    backgroundColor: '#4654a7',
    title:
      'Buddy is Affordable',
    description:
      'In Buddy we offer a highly affordable and efficient transportation and delivery solution.',
  },
  {
    image: require("./images/onBoarding/buddy-family.png"),
    backgroundColor: '#7370cf',
    title:
      'Job Opportunity',
    description:
      'Our goal is to make a positive impact on the community by providing new opportunities that enable individuals to meet their needs without being apart from their families.',
  },
  {
    image: require("./images/onBoarding/pasakay-variant.png"),
    backgroundColor: '#db4747',
    title:
      'Buddy Pasakay',
    description:
      "Whether it's your daily commute or a weekend adventure, Buddy's got your back.",
  },
  {
    image: require("./images/onBoarding/pabili-variant.png"),
    backgroundColor: '#db4747',
    title:
      'Buddy Pabili',
    description:
      "With Buddy's Pabili service, you can order groceries, meals, or anything available from our merchants, and our dedicated riders will handle the rest.",
  },
  {
    image: require("./images/onBoarding/merchant.png"),
    backgroundColor: '#db4747',
    title:
      'Buddy Merchant',
    description:
      'We actively endorse and promote local businesses.',
  },
  /*
  {
    image: require("./images/onBoarding/insurance.png"),
    backgroundColor: '#db4747',
    title:
      'Buddy Insurance',
    description:
      'Buddy Insurance is coming soon.',
  },
  */
  {
    image: require("./images/onBoarding/thank-you.png"),
    backgroundColor: '#db4747',
    title:
      'Thank you',
    description:
      'Our team will conduct a background check to verify the authenticity of our Buddy users. ',
    descriptionRed:
      'Providing incorrect information or inappropriate images will result in the immediate deletion of your account.',
    color: 'red',
  },
];

export default function UserOnBoarding({ navigation }) {

  const keyExtractor = React.useCallback((_, index) => index.toString(), []);

  const [isReached, setIsReached] = useState(false);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const flatListRef = React.useRef(null);

  //Flatlist props that calculates current item index
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    setActiveIndex(viewableItems[0].index);
    console.log(viewableItems[0].index)

    const index = viewableItems[0].index;

    const isEnd = index === DATA.length - 1;
    if (isEnd) {
      setIsReached(true);
      console.log("true")
    }
    else {
      setIsReached(false);
      console.log("false")
    }
  });

  const { width } = Dimensions.get('screen');
  //const imageW = width * 0.9;
  //const imageH = imageW * 1.4;

  const renderItem = ({ item }) => {
    return (
      <Animated.View style={{
        flex: 1,
        width,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <FastImage
          style={{
            width: 250,//imageW,
            height: 250,//imageH,
          }}
          //source={{ uri: item.image }}
          source={item.image}
          priority={FastImage.priority.high}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{
          width: '90%',
          alignItems: 'center',
          gap: 10,
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            letterSpacing: 2
          }}>
            {item.title}
          </Text>
          <Text style={{
            color: 'black',
            letterSpacing: 2
          }}>
            {item.description}
            <Text style={{
              color: item.color,
              letterSpacing: 2
            }}>
              {item.descriptionRed}
            </Text>
          </Text>
        </View>
      </Animated.View>
    );
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <Animated.FlatList
        data={DATA}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewRef.current}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      />
      <View style={{
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center'
      }}>
        <PageIndicator
          style={{
            marginBottom: 30,
            //width: '100%'
          }}
          activeColor='black'
          count={DATA.length}
          current={animatedCurrent}
        />
        <Button
          mode={isReached === true
            ?
            "contained"
            :
            "outlined"
          }
          textColor={isReached === true
            ?
            "white"
            :
            "black"
          }
          buttonColor={isReached === true
            ?
            "black"
            :
            "white"
          }
          style={{
            borderRadius: 100
          }}
          contentStyle={{
            padding: 10,
          }}
          labelStyle={{
            letterSpacing: 2
          }}
          onPress={() => {
            if (activeIndex + 1 < DATA.length) {
              // @ts-ignore
              flatListRef.current.scrollToIndex({
                index: activeIndex + 1,
                animated: true,
              });
            }
            if (isReached === true) {
              //save to finish onboarding
              GetAllPermissions();
              local_launch.set('local_launch', 'true');
              navigation.navigate("UserLogin");
            }
          }}>
          {isReached === false
            ?
            "Next"
            :
            "Let's Start"
          }
        </Button>
      </View>
    </View>
  );
};