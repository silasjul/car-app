import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DatePickerProps {
  buttonText: string;
  buttonStyle: any;
  time: Date | null;
  setTime: (date: Date | null) => void;
}

export default function DatePicker({ buttonText, buttonStyle, time: startTime, setTime: setStartTime }: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState<null | string>(null)

  const onChangeStartTime = (event: any, selectedTime: Date | undefined) => {
    if (event.type === 'dismissed') {
      setShow(false);
    } else if (selectedTime) {
      console.log('Selected time:',);
      setStartTime(selectedTime);
      setShow(false);
      setSelectedTime(selectedTime.toLocaleDateString());
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setShow(true)}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1, flexDirection: 'row', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '500', opacity: .8 }}>{selectedTime ?? buttonText}</Text>
          {selectedTime && (
            <TouchableOpacity
              onPress={() => {
                setSelectedTime(null);
                setStartTime(null);
              }}
              style={{ padding: 4, backgroundColor: 'rgba(0,0,0,1)', borderRadius: 9999, display: 'flex', alignItems: 'center' }}
            >
              <Ionicons name="close" size={14} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {show &&
        <DateTimePicker
          testID="dateTimePicker"
          value={startTime || new Date()}
          mode="date"
          is24Hour={true}
          onChange={onChangeStartTime}
        />}
    </View>
  )
}
