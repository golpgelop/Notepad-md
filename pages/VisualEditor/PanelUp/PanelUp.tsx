import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { panelup } from './PanelUp.styles';

interface IPanelUpProps {
  markValue: string;
  viewValue: string;
  size: number;
  onMarkPress: () => void;
  onLinePress: () => void;
  onViewPress: () => void;
  onSizePress: () => void;
  onSavePress: () => void;   // новая
}

const PanelUp: React.FC<IPanelUpProps> = ({
  markValue,
  viewValue,
  size,
  onMarkPress,
  onLinePress,
  onViewPress,
  onSizePress,
  onSavePress,
}) => {
  return (
    <View style={panelup.container}>
      <TouchableOpacity style={panelup.Button} onPress={onMarkPress}>
        <Text style={panelup.ButtonText}>{markValue}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={panelup.Button} onPress={onLinePress}>
        <Text style={panelup.ButtonText}>---</Text>
      </TouchableOpacity>

      <TouchableOpacity style={panelup.Button} onPress={onViewPress}>
        <Text style={panelup.ButtonText}>{viewValue}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={panelup.Button} onPress={onSizePress}>
        <Text style={panelup.ButtonText}>Aa: {size}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={panelup.Button} onPress={onSavePress}>
        <Text style={panelup.ButtonText}>💾</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PanelUp;