import React, { useState } from 'react';
import { useRouter } from 'expo-router';


export default function AuthLayout({ children }) {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin(!isLogin);
        router.push(isLogin ? '/(auth)/signup' : '/(auth)/login');
    };

    return (
        <div>
            <button onClick={handleToggle}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
            {children}
        </div>
    );
}
