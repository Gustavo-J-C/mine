import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import { createMineBoard,
    cloneBoard,
    openField, 
    hadExplosion, 
    wonGame, 
    showMines } from './src/Function'

export default function App() {


  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(rows * cols * params.difficultLevel)
  }

  const createInitialBoard = () => { 
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()  
    return {
      board: createMineBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
    }
    console.log(board);
  }

  const [boardState, setBoardState] = useState(createInitialBoard)
  
  onOpenField = (row, column) => {
    const board = cloneBoard(boardState.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeuuu!', 'Boa sorte da proxima vez!')
    }

    if (won) {
      Alert.alert('Você ganhou, quer um biscoito?')
    }

    setBoardState({board, lost, won})
  }

  return (
    <View style={styles.container}>
      <Text>Iniciando o mines</Text>
      <Text> Tamanho da grade :
        {params.getColumnsAmount()} x {params.getRowsAmount()}</Text>
      <View style={styles.board}>
        <MineField onOpenField={onOpenField} board={boardState.board} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
