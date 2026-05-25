import { StyleSheet, TextInput, Text, View, Pressable, Linking, Image } from 'react-native';
import { useState } from 'react';
import restCountries from './utils/restCountries';

export default function App() {

  //Caputura o que o usuário digita no campo
  const [pais, setPais] = useState('');
  //Salva os dados necessários que foram extraidos da API
  const [detalhes, setDetalhes] = useState({
    nomeComum: null,
    nomeOficial: null,
    nomeRusso: null,
    imagemPais: null
  });
  //State para mostrar ou não as informações por busca por país
  const [exibirListaPorPais, setExibirListaPorPais] = useState(false);
 
  //Sempre que apertar o botão, puxa os dados da API e salva na variável
  const buscaPorNome = () => {
      restCountries.get(`/name/${pais}`)
      .then((result) => {
          setDetalhes({
            nomeComum: result.data[0].name.common,
            nomeOficial: result.data[0].name.official,
            nomeRusso: result.data[0].translations.rus.common,
            imagemPais: result.data[0].maps.openStreetMaps
          });
          setExibirListaPorPais(true)
        })
        .catch((error) => {
          alert('País não encontrado! Lembre-se de digitar em inglês.')
          setExibirListaPorPais(false);
        });
      };
  
  

  return (     
        <View style={styles.container}>
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
                    onPress={buscaPorNome}
                    >
                    <Text
                      style={styles.buttonTxt}>Buscar
                    </Text>
                  </Pressable>
                </View>
          </View>

          {exibirListaPorPais && (
          <View style={styles.list}>

            <Text style={styles.listTitle}>
              Informações Detalhadas
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
  valor: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
  }

});
