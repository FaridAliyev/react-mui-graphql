import { AppBar, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { headerHeight } from 'config';
import { useEffect, useState } from 'react';

const Root = styled(AppBar)(() => {
    return {
        height: headerHeight,
    };
});

export const Header: React.FC = () => {
    const [scrolledDown, setScrolledDown] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Root elevation={0} style={{ boxShadow: scrolledDown ? '0 0 6px 0 rgba(0,0,0,.12)' : 'none' }}>
            <Typography>Example app</Typography>
        </Root>
    );
};
