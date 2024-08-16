// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
    const token = false
    
    if (token) {
        return <Redirect href="home" />;
    }

  return <Redirect href="login" />;
}
