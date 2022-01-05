import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Gap from '../Gap';
import {ICArrowRight, ICEmail, ICKeluar, ICPusatbantuan} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabAkun = ({category, onPress, categoryStrip}) => {
  const Icon = () => {
    if (category === 'Beri Masukan') {
      return <ICEmail />;
    }
    if (category === 'Pusat Bantuan') {
      return <ICKeluar />;
    }
    if (category === 'Keluar Akun') {
      return <ICPusatbantuan />;
    }
    return <View style={{marginRight: -10}} />;
  };

  const Strip = () => {
    if (categoryStrip === 'Benar') {
      return <View style={styles.stripp} />;
    } else {
    }

    return <View />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapContent}>
        <Icon />
        <Gap width={10} />
        <View style={styles.wrapTxt}>
          <Text style={styles.TxtCategory}>{category}</Text>
          <ICArrowRight style={styles.ArrowRight} />
        </View>
      </View>
      <Strip />
    </TouchableOpacity>
  );
};

export default TabAkun;

const styles = StyleSheet.create({
  wrapContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stripp: {
    backgroundColor: colors.border,
    height: 0.8,
    marginVertical: 10,
  },
  TxtCategory: {
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  ArrowRight: {
    marginRight: 3,
  },
  wrapTxt: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});
