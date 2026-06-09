import { useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
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
    let tempFileUri: string | null = null;

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Ошибка', 'Обмен файлами недоступен на этом устройстве');
        return false;
      }

      const sanitizedTitle = title.replace(/[/\\?%*:|"<>]/g, '-');
      const fileName = sanitizedTitle.endsWith('.md')
        ? sanitizedTitle
        : `${sanitizedTitle}.md`;

      const cacheDir = FileSystem.cacheDirectory ?? '';
      const docDir = FileSystem.documentDirectory ?? '';

      try {
        tempFileUri = cacheDir + fileName;
        console.log('Trying to write to cache:', tempFileUri);
        await FileSystem.writeAsStringAsync(tempFileUri, content, {
          encoding: 'utf8' as const,
        });
      } catch (cacheError) {
        console.warn('Cache write failed, falling back to document directory', cacheError);
        tempFileUri = docDir + fileName;
        console.log('Trying to write to documents:', tempFileUri);
        await FileSystem.writeAsStringAsync(tempFileUri, content, {
          encoding: 'utf8' as const,
        });
      }

      console.log('File written, sharing:', tempFileUri);
      await Sharing.shareAsync(tempFileUri, {
        mimeType: 'text/markdown',
        dialogTitle: `Отправить: ${fileName}`,
        UTI: 'net.daringfireball.markdown',
      });

      return true;
    } catch (error) {
      console.error('Ошибка при шеринге файла:', error);
      Alert.alert('Ошибка', 'Не удалось создать или отправить файл');
      return false;
    } finally {
      if (tempFileUri) {
        try {
          await FileSystem.deleteAsync(tempFileUri, { idempotent: true });
        } catch (cleanupError) {
          console.warn('Не удалось удалить временный файл:', cleanupError);
        }
      }
      setIsSharing(false);
    }
  };

  return { shareFile, isSharing };
};