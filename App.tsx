import { StyleSheet, TextInput, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import restCountries from './utils/restCountries';

export default function App() {

  const [pais, setPais] = useState('')

  const BuscaRealizada = () => {
      restCountries.get(`/name/${pais}`)
      .then((result) => {
        console.log(
          result.data[0].name.common,
          result.data[0].name.official,
          result.data[0].translations.rus.common,
          result.data[0].maps.openStreetMaps);
    });
  };
  


  return (     
        <View style={styles.container}>
          <View style={styles.firstGridTop}>
            <Text>Digite um país para consultar suas informações completas</Text>
              <View style={styles.firstGridBotton}>  
                <TextInput
                  style={styles.input}
                  placeholder='Digite o nome de um país'
                  onChangeText={setPais}
                  value={pais}
                  />
                  <Pressable
                    style={styles.button} 
                    onPress={BuscaRealizada}
                    >
                    <Text
                      style={styles.buttonTxt}>Buscar País
                    </Text>
                  </Pressable>
                </View>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '30%',
    backgroundColor: 'purple',
    padding: 8,
    borderRadius: 4,
  
  },
  buttonTxt: {
    color: 'white',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  input: {
    width: '70%',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 8,
    textAlign: 'center',
    borderRadius: 4
  },
  firstGridBotton: {
    borderBottomColor: 'gray',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12
    
  },
  firstGridTop: {
    padding: 12,
    borderWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#f9f9f9',
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
