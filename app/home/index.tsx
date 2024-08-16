import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
    const router = useRouter();

    function CadastrarUsuario() {
        router.push("user/cadastrarUser");
    }

    return (
        <View style={styles.container}>
            <Button title="cadastrar Usuário" onPress={CadastrarUsuario}/>
            <Text>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});