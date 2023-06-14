import { green, red } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';
import { PaletteType } from 'context/settings/reducer';
import { Theme as ThemeEnum } from 'enum';

const breakpoints = createBreakpoints({});

const theme = (mode: PaletteType): Theme => {
    const isDarkMode = mode === ThemeEnum.Dark;
    return createTheme({
        dark: isDarkMode,
        spacing: 8,
        breakpoints,
        shape: { borderRadius: 10 },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        fontSize: 16,
                        [breakpoints.down('sm')]: {
                            fontSize: 15,
                        },
                    },
                },
            },
        },
        palette: {
            mode,
            primary: {
                main: '#3B43F2',
            },
            secondary: {
                main: '#FFB100',
            },
            error: {
                main: red.A400,
            },
            success: { light: green[600], main: green[500], dark: green[400], contrastText: '#fff' },
            text: {
                secondary: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.7)',
            },
            background: { default: isDarkMode ? 'rgba(30, 30, 30, 1)' : 'rgba(255, 255, 255, 1)' },
        },
        typography: {
            fontFamily: ['Poppins', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),

            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
            },
            h1: {
                fontSize: '2.275rem',
                fontWeight: 600,
            },
            h2: {
                fontSize: '1.625rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '1.375rem',
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
            h5: {
                fontSize: '1rem',
                fontWeight: 600,
            },
            h6: {
                fontSize: '0.875rem',
                fontWeight: 500,
            },
        },
        shadows: [
            'none',
            'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
            'rgba(0, 0, 0, 0.15) 0px 1px 4px 0px',
            'rgba(0, 0, 0, 0.15) 0px 4px 8px 0px',
            'rgba(0, 0, 0, 0.15) 0px 4px 8px 0px',
            'rgba(0, 0, 0, 0.1) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.1) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.15) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.15) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.2) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.2) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 6px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 7px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 8px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 9px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 10px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 11px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 12px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 13px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 14px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 15px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 16px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 17px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 18px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 19px 0px',
        ],
    });
};

declare module '@mui/material/styles' {
    interface Theme {
        dark: boolean;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        dark?: boolean;
    }
}

export default theme;
