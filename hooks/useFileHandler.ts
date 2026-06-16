import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { copyAsync, readAsStringAsync, deleteAsync, cacheDirectory } from 'expo-file-system/legacy';

export const useFileHandler = () => {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const extractFileName = (url: string): string => {
        try {
            const decoded = decodeURIComponent(url);
            const parts = decoded.split('/');
            const lastPart = parts[parts.length - 1].split('?')[0];
            if (lastPart) return lastPart;
        } catch (e) {}
        return `Заметка ${new Date().toLocaleDateString()}`;
    };

    const handleFile = async (url: string) => {
        if (!url) return;
        setIsLoading(true);
        try {
            const name = extractFileName(url);
            setFileName(name);

            const localUri = cacheDirectory + name;
            await copyAsync({
                from: url,
                to: localUri,
            });

            const content = await readAsStringAsync(localUri, {
                encoding: 'utf8',
            });

            await deleteAsync(localUri, { idempotent: true });

            setFileContent(content);
        } catch (error) {
            console.error('Ошибка при чтении файла:', error);
            setFileName(null);
            setFileContent(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        Linking.getInitialURL().then((url) => {
            if (url) handleFile(url);
        });

        const subscription = Linking.addEventListener('url', (event) => {
            handleFile(event.url);
        });

        return () => subscription.remove();
    }, []);

    return { fileContent, fileName, isLoading };
};