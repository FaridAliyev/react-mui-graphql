import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/system';
import { useSettings } from 'context/settings/store';
import { Language } from 'context/settings/reducer';

const Root = styled(Select)(({ theme }) => ({
    '&.MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
        '& .MuiSelect-select': {
            padding: theme.spacing(0.25, 1),
            fontSize: '0.75rem',
            backgroundColor: theme.palette.primary.dark,
            color: '#fff',
            borderRadius: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            color: '#fff',
        },
    },
}));

const MenuItemComponent = styled(MenuItem)(({ theme }) => ({
    '&.MuiMenuItem-root': {
        fontSize: '0.75rem',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
}));

export const LanguageMenu: React.FC<SelectProps> = ({ className }) => {
    const [{ language }, dispatch] = useSettings();
    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        dispatch({ type: 'LANGUAGE_CHANGED', language: event.target.value as Language });
        i18n.changeLanguage(event.target.value);
    };

    const languages = {
        az: { name: 'Azərbaycanca', shortName: 'AZ' },
        en: { name: 'English', shortName: 'EN' },
        ru: { name: 'Русский', shortName: 'РУ' },
    };

    return (
        <Root className={className} value={language} onChange={handleChange}>
            {Object.keys(languages).map((key) => (
                <MenuItemComponent key={key} value={key}>
                    {languages[key].shortName}
                </MenuItemComponent>
            ))}
        </Root>
    );
};
