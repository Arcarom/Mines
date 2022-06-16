import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';

import Params from './src/params';
import MineField from './src/components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/functions';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

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
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);
    if (lost) {
      showMines(board);
      Alert.alert('Você Perdeu!', 'Tente novamente apertando em', 'Novo Jogo');
    }
    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!');
    }
    this.setState({board, lost, won});
  };

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!');
    }

    this.setState({board, won});
  };

  onLevelSelected = level => {
    Params.difficultLevel = level;
    this.setState(this.createState());
  };

  render() {
    return (
      <View style={style.container}>
        <LevelSelection
          isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({showLevelSelection: false})}
        />
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({showLevelSelection: true})}
        />

        <View style={style.board}>
          <MineField
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
          />
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
