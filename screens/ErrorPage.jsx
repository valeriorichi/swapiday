import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import LogoHeader from './LogoHeader';

function ErrorPage({ message }) {
  return (
    <ScrollView>
      <LogoHeader style={styles.logoHeader} />
      <View style={styles.container}>
        <Text style={styles.errorMsg}>
          {message?.msg || message || 'Oops!\nSomething went wrong!'}
        </Text>
        <Image
          style={styles.errorImg}
          source={{
            uri: 'https://media.tenor.com/IQZucbKf9isAAAAC/mimi-neko-its-ok.gif',
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorMsg: {
    fontSize: 30,
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  errorImg: {
    width: 350,
    height: 350,
  },
});

export default ErrorPage;
