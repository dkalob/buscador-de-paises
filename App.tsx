import { StyleSheet, TextInput, Text, View, Pressable, Linking, Image } from 'react-native';
import { useState } from 'react';
import restCountries from './utils/restCountries';

export default function App() {

  //Caputura o que o usuário digita no campo país
  const [pais, setPais] = useState('');
  //Captura o que o usuário digita no campo capital
  const [capital, setCapital] = useState('');

  //Salva os dados necessários que foram extraidos da API
  const [detalhes, setDetalhes] = useState({
    nomeComum: null,
    nomeOficial: null,
    nomeRusso: null,
    imagemPais: null
  });

  const [info, setInfo] = useState({
    nomeComum: null,
    bandeira: null
  });


  //State para mostrar ou não as informações por busca por país
  const [exibirListaPorPais, setExibirListaPorPais] = useState(false);
  //State para mostrar ou não as informações por busca por capital
  const [exibirListaPorCapital, setExibirListaPorCapital] = useState(false);
 
  //Sempre que apertar o botão, puxa os dados da API e salva na variável
  const buscaPorPais = () => {
      restCountries.get(`/name/${pais}`)
      .then((result) => {
          setDetalhes({
            nomeComum: result.data[0].name.common,
            nomeOficial: result.data[0].name.official,
            nomeRusso: result.data[0].translations.rus.common,
            imagemPais: result.data[0].maps.openStreetMaps
          });
          console.log(JSON.stringify(result.data[0], null, 2));
          setExibirListaPorPais(true)
        })
        .catch((error) => {
          alert('País não encontrado! Lembre-se de digitar em inglês.')
          setExibirListaPorPais(false);
        });
      };

  const buscaPorCapital = () => {
      restCountries.get(`/capital/${capital}`)
      .then((result) => {
          setInfo({
            nomeComum: result.data[0].name.common,
            bandeira: result.data[0].flags.png,
          });
          console.log(JSON.stringify(result.data[0], null, 2));
          setExibirListaPorCapital(true)
        })
        .catch((error) => {
          alert('País não encontrado! Lembre-se de digitar em inglês.')
          setExibirListaPorCapital(false);
        });
      };
  

  return (     
        <View style={styles.container}>

          <View style={styles.topGrid}>
            <View style={styles.firstGridTop}>
              <Text 
                style={styles.title}>
                Digite um país para consultar suas informações completas
              </Text>
              <Text
                style={styles.subtitle}>
                  OBS: o nome do país deve ser em inglês
              </Text>
                <View style={styles.firstGridBotton}>  
                  <TextInput
                    style={styles.input}
                    placeholder='Digite aqui..'
                    onChangeText={setPais}
                    value={pais}
                    />
                    <Pressable
                      style={styles.button} 
                      onPress={buscaPorPais}
                      >
                      <Text
                        style={styles.buttonTxt}>Buscar
                      </Text>
                    </Pressable>
                  </View>
            </View>

            <View style={styles.firstGridTop}>
              <Text 
                style={styles.title}>
                Digite uma capital para consultar suas informações de seu País
              </Text>
              <Text
                style={styles.subtitle}>
                  OBS: o nome da capital deve ser em inglês
              </Text>
                <View style={styles.firstGridBotton}>  
                  <TextInput
                    style={styles.input}
                    placeholder='Digite aqui..'
                    onChangeText={setCapital}
                    value={capital}
                    />
                    <Pressable
                      style={styles.button} 
                      onPress={buscaPorCapital}
                      >
                      <Text
                        style={styles.buttonTxt}>Buscar
                      </Text>
                    </Pressable>
                  </View>
            </View>
          </View>

          {exibirListaPorPais && (
          <View style={styles.list}>

            <Text style={styles.listTitle}>
              Resultado por País
            </Text>
            
            <View style={styles.card}>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Nome Comum</Text>
                <Text style={styles.valor}>
                  {detalhes.nomeComum || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Nome Oficial</Text>
                <Text style={styles.valor}>
                  {detalhes.nomeOficial || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Nome em Russo</Text>
                <Text style={styles.valor}>
                  {detalhes.nomeRusso || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Foto do País</Text>
                <Text 
                  style={styles.valor}
                  onPress={() =>
                  {Linking.openURL(detalhes.imagemPais || 'Não possui')}}>
                    Abrir imagem
                </Text>
              </View>

            </View>

          </View>
          )}

          {exibirListaPorCapital && (
          <View style={styles.list}>

            <Text style={styles.listTitle}>
              Resultado por Capital
            </Text>

            <View style={styles.card}>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Nome do País</Text>
                <Text style={styles.valor}>
                  {info.nomeComum || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Bandeira</Text>
                {info.bandeira && (
                  <Image
                    source={{ uri: info.bandeira }}
                    style={{ width: 200, height: 120 }}/>
                )}
              </View>

            </View>
          </View>
        )}

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
  card: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 40,
  },
  firstGridBotton: {
    borderBottomColor: 'gray',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  },
  input: {
    width: '70%',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 8,
    textAlign: 'left',
    borderRadius: 4
  },
  itemList: {
    flexDirection: 'column'
  },
  itemTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  list: {
    width: '90%',
    marginTop: 20,
    padding: 12,
    borderBottomColor: 'gray',
    marginBottom: 4,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  listItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 8,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 4,
  },
  subtitle: {
    fontStyle: 'italic',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  topGrid: {
    flexDirection: 'row',
    gap: 15
  },
  valor: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
  }

});
