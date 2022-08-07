/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  FlatList,
  TextInput,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

export const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [count, setCount] = useState<number>(1);
  return (
    <View style={styles.sectionContainer}>
      <View
        style={{
          backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}
          testID="counterId">
          {count}
        </Text>
      </View>

      <Button
        color={'green'}
        title="+"
        testID="plus-button"
        onPress={() => setCount(sw => sw + 1)}
      />
      <Button
        color={'red'}
        title="-"
        testID="minus-button"
        onPress={() => setCount(sw => sw - 1)}
      />
    </View>
  );
};

export const FlatSection = ({onEndReached}: {onEndReached?: () => void}) => {
  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: 'yellow',
        height: 50,
      }}
      data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
      onEndReached={onEndReached}
      horizontal
      onEndReachedThreshold={0.2}
      testID="flat-list"
      renderItem={() => (
        <View
          style={{
            backgroundColor: 'red',
            height: 10,
            width: 50,
            marginRight: 10,
          }}
        />
      )}
    />
  );
};

export const FormSection = () => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  return (
    <View>
      <TextInput placeholder="name" value={name} onChangeText={setName} />
      <Button
        title="print"
        testID="print-button"
        onPress={() =>
          setTimeout(() => setShow(true), Math.floor(Math.random() * 200))
        }
      />
      {show && <Text testID="printed-username">{name}</Text>}
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* <LearnMoreLinks /> */}
          <Section title="Count" />
          <FlatSection onEndReached={() => console.log('finished')} />

          <FormSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    marginLeft: 12,
    fontSize: 24,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
