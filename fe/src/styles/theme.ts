// NOTE: colorValues 주석은 피그마에 등록된 색상명. 필요없는 주석은 나중에 지울 예정

const colorValues = {
  grayscale: {
    50: '#FEFEFE', // (WHITE_DEF)
    100: '#F7F7FC', // (GRAY_02)
    200: '#EFF0F6', // (GRAY_DEF)
    300: '#D9DBE9', // (GRAYSCALE 중간값)
    400: '#BEC1D5', // (GRAYSCALE 중간값)
    500: '#A0A3BD', // (GRAYSCALE 중간값)
    600: '#6E7191', // (BLACK_02)
    700: '#4E4B66', // (GRAY_DEF_02)
    800: '#2A2A44', // (BLACK_DEF)
    900: '#14142B', // (DARK_BLACK)
  },
  accent: {
    blue: '#007AFF', // (Accent blue)
    navy: '#0025E6', // (Navy accent)
    red: '#FF3B30', // (Accent red)
    yellow: '#F7DB78', // (widget_yellow)
    green: '#A7C4A5', // (GREEN_DEF)
    lightBlue: '#A6C8DD', // (BLUE_DEF)
  },
  widget: {
    blue: '#A8D5FF', // (WIDGET_BLUE)
    red: '#FF936F', // (WIDGET_RED)
    green: '#A6CAA3', // (WIDGET_GREEN)
    yellow: '#F7DB78', // (WIDGET_YELLOW)
    grey: '#979797', // (WIDGET_GREY)
  },
  special: {
    bgDefault: '#FEFFD2', // (BG_DEF)
    modalBg: '#FFEEA9', // (MODAL_BG_DEF)
    textForce: '#FFBF78', // (TEXT_FORCE_DEF)
    textForce02: '#FF7D29', // (TEXT_FORCE_02_DEF)
  },
};

const lightTheme = {
  backgroundPrimary: colorValues.special.bgDefault, // 밝은 배경
  modalBackground: colorValues.special.modalBg, // 모달 배경
  textPrimary: colorValues.grayscale[900], // 주 텍스트 (진한 검정)
  textSecondary: colorValues.grayscale[700], // 보조 텍스트 (어두운 회색)
  textAccentPrimary: colorValues.special.textForce, // 주요 강조 텍스트
  textAccentSecondary: colorValues.special.textForce02, // 보조 강조 텍스트
  accentBlue: colorValues.accent.blue, // 액센트 블루
  accentGreen: colorValues.accent.green, // 액센트 그린
  accentYellow: colorValues.accent.yellow, // 액센트 옐로우
  widgetBlue: colorValues.widget.blue, // 위젯 블루
  widgetRed: colorValues.widget.red, // 위젯 레드
  widgetGreen: colorValues.widget.green, // 위젯 그린
  widgetYellow: colorValues.widget.yellow, // 위젯 옐로우
  grayLight: colorValues.grayscale[200], // 라이트 그레이
  grayLighter: colorValues.grayscale[100], // 더 밝은 그레이
  grayDark: colorValues.grayscale[600], // 어두운 회색 (보조 텍스트에 사용)
  black: colorValues.grayscale[900], // 검정
  white: colorValues.grayscale[50], // 흰색
};

const darkTheme = {
  backgroundPrimary: colorValues.grayscale[800], // 어두운 배경
  modalBackground: colorValues.grayscale[700], // 모달 어두운 배경
  textPrimary: colorValues.grayscale[50], // 밝은 텍스트 (흰색에 가까움)
  textSecondary: colorValues.grayscale[300], // 보조 텍스트 (밝은 회색)
  textAccentPrimary: colorValues.special.textForce, // 주요 강조 텍스트 (동일)
  textAccentSecondary: colorValues.special.textForce02, // 보조 강조 텍스트 (동일)
  accentBlue: colorValues.accent.lightBlue, // 연한 액센트 블루
  accentGreen: colorValues.accent.green, // 동일한 그린
  accentYellow: colorValues.accent.yellow, // 동일한 옐로우
  widgetBlue: colorValues.widget.blue, // 위젯 블루 (동일)
  widgetRed: colorValues.widget.red, // 위젯 레드 (동일)
  widgetGreen: colorValues.widget.green, // 위젯 그린 (동일)
  widgetYellow: colorValues.widget.yellow, // 위젯 옐로우 (동일)
  grayLight: colorValues.grayscale[600], // 어두운 회색 (라이트 그레이)
  grayLighter: colorValues.grayscale[500], // 중간 회색
  grayDark: colorValues.grayscale[900], // 거의 검정
  black: colorValues.grayscale[900], // 검정 (기본 검정)
  white: colorValues.grayscale[50], // 흰색
};

export const theme = {
  colorValues,
  lightTheme,
  darkTheme,
  // typography,
  // radius,
  // imgSize,
  // buttonSizes,
  // buttonStyles,
  // buttonStates,
};

export default theme;
