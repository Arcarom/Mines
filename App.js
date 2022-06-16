import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Params from './src/params';
import MineField from './src/components/MineField';
import {createMinedBoard} from './src/functions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const cols = Params.getColumnsAmount();
    const rows = Params.getRowsAmount();
    return Math.ceil(cols * rows * Params.difficultLevel);
  };

  createState = () => {
    const cols = Params.getColumnsAmount();
    const rows = Params.getRowsAmount();

    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
    };
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.welcome}> Iniciando o Mines</Text>
        <Text style={style.introductions}>
          {' '}
          Tamanho da grade:
          {Params.getRowsAmount()}x{Params.getColumnsAmount()}
        </Text>
        <View style={style.board}>
          <MineField board={this.state.board} />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
