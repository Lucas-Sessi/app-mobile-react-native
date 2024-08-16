import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export default function Loading() {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#4287f5" />
          </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo semitransparente
    },
  });