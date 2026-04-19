import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';

export const useFileHandler = () => {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFile = async (url: string) => {
        setIsLoading(true);

        // Извлекаем имя файла из URL
        const decodedUrl = decodeURIComponent(url);
        const nameMatch = decodedUrl.match(/([^\/]+\.(md|markdown|txt))($|\?)/i);
        if (nameMatch) {
            setFileName(nameMatch[1]);
        }

        // Читаем содержимое
        const content = await FileSystem.readAsStringAsync(url, {
            encoding: 'utf8' // или 'base64'
        });

        setFileContent(content);
        setIsLoading(false);
    };

    useEffect(() => {
        // Проверяем при запуске
        Linking.getInitialURL().then((url) => {
            if (url) handleFile(url);
        });

        // Слушаем новые URL
        const subscription = Linking.addEventListener('url', (event) => {
            handleFile(event.url);
        });

        return () => subscription.remove();
    }, []);

    return { fileContent, fileName, isLoading };
}