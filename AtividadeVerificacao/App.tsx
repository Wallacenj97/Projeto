import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';

interface AtividadesProps {
  descricao?: string;
  dataInicio?: string;
  dataFim?: string;
  situacaoAprendizagem?: any;
  titulo?: string;
}

export default function App() {
  const [atividades, setAtividades] = useState<AtividadesProps>({});
  const [erro, setErro] = useState('')
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://academico3.rj.senac.br/api/AtividadeVerificacao/1");
        console.log(response.data)
        setAtividades((response.data));
      } catch (error) {
        console.log(error)
        setErro("Erro ao buscar os dados")
      }
    }
    fetchData();
  }, []);

  let diaSemana: any = moment(atividades.dataInicio).format('dddd')
  let diaSemanaFim: any = moment(atividades.dataFim).format('dddd')

  function primeiraLetraMaiuscula(dia: any) {
    return dia.substring(0, 1).toLocaleUpperCase() + dia.substring(1).toLocaleLowerCase();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{atividades.situacaoAprendizagem.titulo}</Text>
        <Text style={styles.descricao}>{atividades ? atividades.descricao : erro}</Text>
        <Text style={styles.hora}>
          Inicio:
          {primeiraLetraMaiuscula(diaSemana)}
          ,{moment(atividades.dataInicio).format('L')}
        </Text>
        <Text style={styles.hora}>
          Termino:
          {primeiraLetraMaiuscula(diaSemanaFim)}
          ,{moment(atividades.dataInicio).format('L')}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,

  },
  card: {
    elevation: 5,
    fontSize: 20,
    padding: 20,
    borderColor: '#004587',
    width: 356,
    height: 529,
  },
  descricao: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  hora: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titulo:{
    fontWeight: 'bold',
    fontSize: 30,
  }
});
