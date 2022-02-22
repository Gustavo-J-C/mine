import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';

import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import { createMinedBoard,
    cloneBoard,
    openField, 
    hadExplosion, 
    wonGame, 
    showMines,
    invertFlag,
    flagsUsed } from './src/Function'

export default function App() {
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(rows * cols * params.difficultLevel)
  }

  initialBoardState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()  
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
    }
  }

  const [boardState, setBoardState] = useState(initialBoardState())

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

  onSelectField = (row, column) => {
    const board = cloneBoard(boardState.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns!  Você ganhou!')
    }

    setBoardState({board, won})
  }


  return (
    <View style={styles.container}>
      <Header flagsLeft={minesAmount() - flagsUsed(boardState.board)}
        onNewGame={() => setBoardState(initialBoardState())}/>
      <View style={styles.board}>
        <MineField 
          board={boardState.board} 
          onOpenField={onOpenField}
          onSelectField={onSelectField}/>
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
