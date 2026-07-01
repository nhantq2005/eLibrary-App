export const Theme = {
  colors: {
    // Backgrounds - Lấy cảm hứng từ trang sách, ấm áp và êm mắt
    background: '#FDFBF7', 
    surface: '#FFFFFF',
    surfaceVariant: '#F3F0E9', // Màu be nhạt cho các card, chip
    
    // Primary - Xanh Navy học thuật, tạo sự tin cậy và tập trung
    primary: '#1E3A5F',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D8E2F0',
    onPrimaryContainer: '#0B1D35',
    
    // Secondary - Nâu vàng/Đồng cổ điển (Accent)
    secondary: '#B8860B', // Dark Goldenrod
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FCEFCF',
    onSecondaryContainer: '#402D00',

    // Text & Outlines
    onBackground: '#2C3338', // Charcoal thay vì đen tuyền
    onSurface: '#2C3338',
    onSurfaceVariant: '#5A6570',
    outline: '#D1D5DB',

    // Trạng thái (Status)
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
  },
  typography: {
    displayLg: {
      fontFamily: 'Source Serif 4',
      fontSize: 48,
      fontWeight: '700',
      lineHeight: 56,
      letterSpacing: -0.96, // Gốc: -0.02em (-0.02 * 48)
    },
    headlineLg: {
      fontFamily: 'Source Serif 4',
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 40,
    },
    headlineMd: {
      fontFamily: 'Source Serif 4',
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    headlineSm: {
      fontFamily: 'Source Serif 4',
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    bodyLg: {
      fontFamily: 'Hanken Grotesk',
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 28,
    },
    bodyMd: {
      fontFamily: 'Hanken Grotesk',
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    labelMd: {
      fontFamily: 'Hanken Grotesk',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      letterSpacing: 0.14, // Gốc: 0.01em (0.01 * 14)
    },
    labelSm: {
      fontFamily: 'Hanken Grotesk',
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 16,
      letterSpacing: 0.6, // Gốc: 0.05em (0.05 * 12)
    },
  },
  rounded: {
    sm: 4,      // Gốc: 0.25rem (0.25 * 16)
    DEFAULT: 8, // Gốc: 0.5rem (0.5 * 16)
    md: 12,     // Gốc: 0.75rem (0.75 * 16)
    lg: 16,     // Gốc: 1rem (1 * 16)
    xl: 24,     // Gốc: 1.5rem (1.5 * 16)
    full: 9999,
  },
  spacing: {
    unit: 8,
    containerPaddingMobile: 20,
    containerPaddingDesktop: 40,
    gutter: 24,
    stackSm: 8,
    stackMd: 16,
    stackLg: 32,
  },
};