import Header from '@src/components/commons/header/Header';
import ItemIncidence from '@src/components/commons/itemIncidence/ItemIncidence';
import { INCIDENCES_LIST, TOTAL_STEPS } from '@src/utils/constants';
import { getStorage } from '@src/utils/utils';
import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListReportScreen() {
    const listIncidences = getStorage(INCIDENCES_LIST);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Les meues comunicacions" close step={TOTAL_STEPS} />
      <View style={{ padding: 16, flex: 1}}>
        <View>{listIncidences !== null && listIncidences.length > 0 ?
            <FlatList
              data={listIncidences.reverse()}
              renderItem={({item}) => <ItemIncidence title={item?.title} description={item?.description} address={item?.address} image={item?.image} type={item?.type} data={item?.data} time={item?.time} location={item.location}/>}
              keyExtractor={item => item.image} // TODO: afegir un ide no el de la IMATGE
            />
            : <Text>Encara no s'ha reportat cap incidència</Text>}</View>
      </View>
    </SafeAreaView>
  );
}
