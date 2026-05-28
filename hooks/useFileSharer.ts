import { useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export interface ShareNoteArgs {
  title: string;
  content: string;
}

interface UseFileSharerReturn {
  shareFile: (args: ShareNoteArgs) => Promise<boolean>;
  isSharing: boolean;
}

export const useFileSharer = (): UseFileSharerReturn => {
  const [isSharing, setIsSharing] = useState(false);

  const shareFile = async ({ title, content }: ShareNoteArgs): Promise<boolean> => {
    setIsSharing(true);

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Ошибка', 'Обмен файлами недоступен на этом устройстве');
        return false;
      }

      const cacheDir: string | null = FileSystem.cacheDirectory ?? null;
      if (!cacheDir) {
        Alert.alert('Ошибка', 'Не удалось получить доступ к временной папке');
        return false;
      }

      const sanitizedTitle = title.replace(/[/\\?%*:|"<>]/g, '-');
      const fileName = sanitizedTitle.endsWith('.md')
        ? sanitizedTitle
        : `${sanitizedTitle}.md`;
      const fileUri = `${cacheDir}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, content, {
        encoding: 'utf8' as const,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/markdown',
        dialogTitle: `Отправить: ${fileName}`,
        UTI: 'net.daringfireball.markdown',
      });

      return true;
    } catch (error) {
      console.error('Ошибка при шеринге файла:', error);
      Alert.alert('Ошибка', 'Не удалось сформировать или отправить файл');
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return { shareFile, isSharing };
};