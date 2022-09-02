import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors, fonts} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import CardPesanan from '../CardPesanan';
import {Gap} from '../../atoms';
import {useDispatch, useSelector} from 'react-redux';
import {getSelesaiPenitipan, getBatalPenitipan} from '../../../redux/action';

const renderTabBar = props => (
  <TabBar
    scrollEnabled
    {...props}
    indicatorStyle={{
      backgroundColor: '#4552CB',
      height: 3,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: 'white',
      borderBottomWidth: 1,
    }}
    tabStyle={{
      width: 'auto',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: fonts.primary[400],
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const Selesai = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {selesaiPenitipan} = useSelector(state => state.pesananReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getSelesaiPenitipan());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getSelesaiPenitipan());
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.contentPage}>
        {selesaiPenitipan.map(itemPenitipan => {
          return (
            <CardPesanan
              onPress={() =>
                navigation.navigate('DetailPesananPenitipan', itemPenitipan)
              }
              key={itemPenitipan.id}
              nama={itemPenitipan.user.name}
              jenisHewan={itemPenitipan.animal_type}
              total={itemPenitipan.total}
              status={itemPenitipan.status}
              images={{uri: itemPenitipan.penitipan_photo_path}}
            />
          );
        })}
      </View>
      <Gap height={20} />
    </ScrollView>
  );
};

const Batal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {batalPenitipan} = useSelector(state => state.pesananReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getBatalPenitipan());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getBatalPenitipan());
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.contentPage}>
        {batalPenitipan.map(itemPenitipan => {
          return (
            <CardPesanan
              onPress={() =>
                navigation.navigate('DetailPesananPenitipan', itemPenitipan)
              }
              key={itemPenitipan.id}
              nama={itemPenitipan.user.name}
              jenisHewan={itemPenitipan.animal_type}
              total={itemPenitipan.total}
              status={itemPenitipan.status}
              images={{uri: itemPenitipan.penitipan_photo_path}}
            />
          );
        })}
      </View>
      <Gap height={20} />
    </ScrollView>
  );
};

const RiwayatPenitipanTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Selesai'},
    {key: '2', title: 'Dibatalkan'},
  ]);

  const renderScene = SceneMap({
    1: Selesai,
    2: Batal,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default RiwayatPenitipanTabSection;

const styles = StyleSheet.create({
  contentPage: {
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    flex: 1,
  },
});
