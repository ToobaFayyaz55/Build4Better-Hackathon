import { StyleSheet, Text, View } from 'react-native';

const MarketWelcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Market</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // light background
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MarketWelcome;
