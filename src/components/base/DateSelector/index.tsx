import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import Popup from 'components/base/Popup';
import Row from 'components/base/Row';
import Button from 'components/base/Button';
import { useTheme } from 'styled-components/native';

interface Props {
  title: string;
  selected?: Date;
  onSelect: (input: Date | undefined) => void;
}

const formatDay = (date: Date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DateSelector: React.FC<Props> = ({ title, selected, onSelect }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const marked: any = {};
  if (selected) {
    marked[formatDay(selected)] = {
      selected: true,
      marked: true,
      selectedColor: theme.colors.primary,
    };
  }

  return (
    <Row
      overline={title}
      onPress={() => setVisible(true)}
      title={selected ? selected.toString() : 'Not set'}
    >
      <Popup visible={visible} onClose={() => setVisible(false)}>
        {visible && (<Calendar
          showWeekNumbers={true}
          markedDates={marked}
          hideArrows={false}
          enableSwipeMonths={true}
          onDayPress={(day: any) => {
            onSelect(new Date(day.timestamp));
            setVisible(false);
          }}
          current={selected}
        />)}
        <Row>
          <Button
            title="Clear"
            onPress={() => {
              onSelect(undefined);
              setVisible(false);
            }}
          />
        </Row>
      </Popup>
    </Row>
  );
};

export default DateSelector;
