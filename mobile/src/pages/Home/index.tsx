import React, {useState, useEffect, ChangeEvent} from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";


const Home = () => {

  interface UFIBGEresponse {
    sigla: string;
  }
  interface CityIBGEresponse {
    nome: string;
  }

  const navigation = useNavigation();

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get<UFIBGEresponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
      const ufInitials = res.data.map(uf => uf.sigla);

      setUfs(ufInitials.sort());

    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    const getCity = async() => { await axios
      .get<CityIBGEresponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(res => {
        const cityNames = res.data.map(city => city.nome);
        setCities(cityNames.sort());
      });
    }
   
    getCity(); 
  }, [selectedUf]);

  function handleNavigationtoPoints() {
    navigation.navigate('Points', {
      selectedUf,
      selectedCity
    });
  }
  function handleSelectUf(e: ChangeEvent<HTMLSelectElement>) {
    const est = e.target.value;
    
    setSelectedUf(est);
  }
  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;

    setSelectedCity(city);
  }

  return ( 
    <KeyboardAvoidingView 
      style={{flex:1}} 
      behavior={Platform.OS === 'ios' ? 'padding': undefined}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Picker
            style={styles.input}
            mode={'dialog'}
            prompt={'Selecione uma UF'}
            selectedValue={selectedUf}
            onValueChange={()=>handleSelectUf}
          >
            {ufs.map(uf => (
              <Picker.Item key={String(uf)} label={uf} value={uf} />
            ))}
          </Picker>
          <Picker
            style={styles.input}
            mode={'dialog'}
            prompt={'Selecione uma Cidade'}
            selectedValue={selectedCity}
            onValueChange={() => handleSelectCity}
          >
            {cities.map(item => (
              <Picker.Item key={String(item)} label={item} value={item} />
            ))}
            
          </Picker>
          <RectButton style={styles.button} onPress={handleNavigationtoPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>
              Entrar
          </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    borderColor: '#ede1',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;