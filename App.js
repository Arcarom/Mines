import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Field from './src/components/Field';
import Params from './src/params';

const App = () => {
  return (
    <View style={style.container}>
      <Text style={style.welcome}> Iniciando o Mines</Text>
      <Text style={style.introductions}>
        {' '}
        Tamanho da grade:
        {Params.getRowsAmount()}x{Params.getColumnsAmount()}
      </Text>
      <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={4} />
      <Field opened nearMines={5} />
      <Field opened nearMines={6} />
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
