import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function App() {
  const [theme, setTheme] = useState(ConfigApp.THEMEMODE);
  const [isLogged, setIsLogged] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState(ConfigApp.DEFAULTLANG);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    AsyncStorage.setItem("themeSetting", theme);
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  const updateValue = (lang) => {
    setLanguage(lang);
    AsyncStorage.setItem("language", lang);
  };

  useEffect(() => {
    async function checkUser() {
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          setIsLogged(true);
          setLoaded(true);
        } else {
          setIsLogged(false);
          setLoaded(true);
        }
      });
    }

    checkUser();
    console.log("isLogged", isLogged);
  }, []);

  useEffect(() => {
    async function checkTheme() {
      await AsyncStorage.getItem("themeSetting").then((value) => {
        if (value) {
          setTheme(value === "dark" ? "light" : "dark");
        }
      });
    }

    checkTheme();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
  },
});
