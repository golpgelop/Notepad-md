import { useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface ShareNoteArgs {
  title: string;
  content: string;
}

export const useFileSharer = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareFile = async ({ title, content }: ShareNoteArgs) => {
    setIsSharing(true);

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Ошибка', 'Обмен файлами недоступен на этом устройстве');
        setIsSharing(false);
        return false;
      }

      const sanitizedTitle = title.replace(/[/\\?%*:|"<>]/g, '-');
      const fileName = sanitizedTitle.endsWith('.md') ? sanitizedTitle : `${sanitizedTitle}.md`;
      
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/markdown',
        dialogTitle: `Отправить: ${fileName}`,
        UTI: 'net.daringfireball.markdown', 
      });

      setIsSharing(false);
      return true; 

    } catch (error) {
      console.error('Ошибка при шеринге файла:', error);
      Alert.alert('Ошибка', 'Не удалось сформировать или отправить файл');
      setIsSharing(false);
      return false;
    }
  };

  return { shareFile, isSharing };
};
