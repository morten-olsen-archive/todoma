interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    shade: string;
    text: string;
  };
  sizes: {
    corners: number;
  };
  margins: {
    small: number;
    medium: number;
    large: number;
  };
  font: {
    baseSize: number;
  };
}

export default Theme;
