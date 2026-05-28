import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

type BlocoBuscaProps = {
  titulo: string;
  obs: string;
  valor: string;
  onChange: (texto: string) => void;
  Pesquisar: () => void;
  Limpar: () => void;
}

export default function BlocoBusca({ titulo, obs, valor, onChange, Pesquisar, Limpar }: BlocoBuscaProps) {
  return (
    <View style={styles.firstGridTop}>

      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.subtitle}>{obs}</Text>

      <View style={styles.firstGridBotton}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui..."
          onChangeText={onChange}
          value={valor}
        />
        <Pressable style={styles.button} onPress={Pesquisar}>
          <Text style={styles.buttonTxt}>Buscar</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={Limpar}>
          <Text style={styles.buttonTxt}>Limpar</Text>
        </Pressable>
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
  subtitle: {
    fontStyle: 'italic',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
});