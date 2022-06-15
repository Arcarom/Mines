import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Flag from './Flag';
import Params from '../params';
import Mine from './Mine';

export default props => {
  const {mined, opened, nearMines, exploded, flagged} = props;
  /*destructuring = tirar de dentro de um objeto
  não "tirar = destruir" mas de ler o atributo de
  dentro de um objeto*/

  const styleField = [styles.field];

  if (opened) {
    styleField.push(styles.opened);
  }

  if (exploded) {
    styleField.push(styles.exploded);
  }

  if (flagged) {
    styleField.push(styles.flagged);
  }

  if (!opened && !exploded) {
    styleField.push(styles.regular);
  }

  let color = null;
  if (nearMines > 0) {
    if (nearMines == 1) {
      color = '#2A28D7';
    }
    if (nearMines == 2) {
      color = '#2B520F';
    }
    if (nearMines > 2 && nearMines < 6) {
      color = '#F9060A';
    }
    if (nearMines >= 6) {
      color = '#F221A9';
    }
  }
  return (
    <View style={styleField}>
      {!mined && opened && nearMines > 0 ? (
        <Text style={[styles.label, {color: color}]}>{nearMines}</Text>
      ) : (
        false
      )}
      {mined && opened ? <Mine /> : false}
      {flagged && !opened ? <Flag /> : false}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    height: Params.blockSize,
    width: Params.blockSize,
    borderWidth: Params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: Params.fontSize,
  },
});
