import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = () => {
    return (
        <View className="absolute inset-0 bg-white justify-center items-center">
            <ActivityIndicator size="large" color="#4F46E5" /> {/* Tailwind Indigo-600 */}
        </View>
    );
};

export default Loading;
