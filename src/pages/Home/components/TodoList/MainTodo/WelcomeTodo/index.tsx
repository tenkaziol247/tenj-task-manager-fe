import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { TRootState } from '../../../../../../store';
import { randomText } from '../../../../utils/utilities';

const text = randomText();

export const WelcomeTodo: React.FC = () => {
    const { profile } = useSelector((state: TRootState) => state.user);

    const renderWishes = () => {
        if (text.length < 120) {
            return { miniText: <>{text}</>, fullText: text };
        } else {
            let miniText = text.slice(0, 120);

            return { miniText: <>{miniText}...</>, fullText: text };
        }
    };

    return (
        <div className='welcomeTodo'>
            <Box margin='0px 20px 4px'>
                <Box fontSize='1.2rem' mb='4px'>
                    <Typography
                        component='p'
                        variant='inherit'
                        color='textPrimary'
                    >
                        Hi, <b>{profile ? profile.name : ''}</b>
                    </Typography>
                </Box>
                <Box color='text.secondary' fontSize='0.9rem' height='34px'>
                    <Typography
                        component='p'
                        variant='inherit'
                        title={renderWishes().fullText}
                    >
                        {renderWishes().miniText}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};
