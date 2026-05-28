import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import { useState } from 'react';
import restCountries from './utils/restCountries';
import BlocoBusca from './components/BlocoBusca';

export default function App() {

  //Caputura o que o usuário digita no campo país
  const [pais, setPais] = useState<string>('');
  //Captura o que o usuário digita no campo capital
  const [capital, setCapital] = useState<string>('');

  //Salva os dados necessários que foram extraidos da API
  const [detalhesPorPais, setDetalhesPorPais] = useState({
    nomeComum: null,
    nomeOficial: null,
    nomeRusso: null,
    imagemPais: null
  });

  const [detalhesPorCapital, setDetalhesPorCapital] = useState({
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
          setDetalhesPorPais({
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

  const buscaPorCapital = () => {
      restCountries.get(`/capital/${capital}`)
      .then((result) => {
          setDetalhesPorCapital({
            nomeComum: result.data[0].name.common,
            bandeira: result.data[0].flags.png,
          });
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

            <BlocoBusca
              titulo="Digite um país para consultar suas informações completas"
              obs="OBS: o nome do país deve ser em inglês"
              valor={pais}
              onChange={setPais}
              Pesquisar={buscaPorPais}
              Limpar={() => {
                setPais('')
                setExibirListaPorPais(false);
              }}/>

            <BlocoBusca
              titulo="Digite uma capital para consultar as informações de seu País"
              obs="OBS: o nome da capital deve ser em inglês"
              valor={capital}
              onChange={setCapital}
              Pesquisar={buscaPorCapital}
              Limpar={() => {
                setCapital('')
                setExibirListaPorCapital(false);
              }}/>

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
                  {detalhesPorPais.nomeComum || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Nome Oficial</Text>
                <Text style={styles.valor}>
                  {detalhesPorPais.nomeOficial || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Nome em Russo</Text>
                <Text style={styles.valor}>
                  {detalhesPorPais.nomeRusso || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Ver no mapa</Text>
                <Text 
                  style={styles.link}
                  onPress={() =>
                  {Linking.openURL(detalhesPorPais.imagemPais || 'Não possui')}}>
                    Abrir mapa do País
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
                  {detalhesPorCapital.nomeComum || 'Não possui'}
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.itemTitle}>Bandeira</Text>
                {detalhesPorCapital.bandeira && (
                  <Image
                    style={styles.image}
                    source={{ uri: detalhesPorCapital.bandeira }}
                    />)}
              </View>

            </View>

          </View>
        )}

      </View>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: 200,
    height: 120
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
  link: {
    fontSize: 17,
    color: 'purple',
    fontWeight: 'bold',
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
  topGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  valor: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
  }

});
