import * as React from 'react';
import {makeStyles, Select, SelectProps, Theme} from "@material-ui/core";

//xs, sm, md, lg e xl.
const useStyles = makeStyles((theme: Theme) => ({
    toolbar: {
        backgroundColor: '#000000'
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    logo: {
        width: 100,
        [theme.breakpoints.up('sm')]: {
            width: 170
        }
    }
}));

export interface LocaleSelectProps extends SelectProps {
    locales: {
        url: string;
        label: string;
    }[];
}

export const LocaleSelect: React.FC<LocaleSelectProps> = (props) => {
    const {locales, ...selectProps} = props;
    const classes = useStyles();

    return (
        <Select
          native
          {...selectProps}
        >
            {
            locales.map((locale, key) => (
                <option 
                    key={key}
                    value={locale.label} 
                >
                    {locale.label}
                </option>      
            ))
            }
        </Select>
    );
};
