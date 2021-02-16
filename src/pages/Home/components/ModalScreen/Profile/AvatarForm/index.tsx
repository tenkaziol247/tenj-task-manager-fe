import {
    Box,
    Button,
    CircularProgress,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { AxiosResponse } from 'axios';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAvatar } from '../../../../../../store/user/action';
import { TRootState } from '../../../../../../store';
import { userApi } from '../../../../../../api/userApi';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    displayAvatar: {
        maxWidth: '100%',
        width: '110px',
        height: '110px',
        background: theme.palette.background.default,
        border: `2px solid ${theme.palette.primary.main}`,
        marginBottom: 16,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const AvatarForm: React.FC = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadPercent, setUploadPercent] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const { avatar, profile, loadingAvatar } = useSelector(
        (state: TRootState) => state.user,
    );

    useEffect(() => {
        if (!loadingAvatar) {
            setLoading(false);
            setUploadPercent(0);
            setSelectedFile(null);
            setSelectedFileName(null);
        }
    }, [loadingAvatar]);

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size < 1000000) {
                setSelectedFile(e.target.files[0]);
                const fileName = e.target.files[0].name;

                if (fileName.length >= 18) {
                    const indexOfLastDot = fileName.lastIndexOf('.');
                    const minimizeFileName =
                        fileName.slice(0, 6) +
                        '...' +
                        fileName.slice(indexOfLastDot - 3, indexOfLastDot) +
                        fileName.slice(indexOfLastDot);
                    setSelectedFileName(minimizeFileName);
                } else {
                    setSelectedFileName(fileName);
                }
            } else {
                alert('Image size must be less than 1MB');
            }
        }
    };

    const handleInputRefClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            setLoading(true);
            const formData = new FormData();
            formData.append('avatar', selectedFile, selectedFile?.name);
            userApi
                .uploadAvatar(formData, (percent: number) => {
                    setUploadPercent(percent - 2);
                })
                .then((response: AxiosResponse) => {
                    if (profile) {
                        dispatch(getAvatar(profile?._id));
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setUploadPercent(0);
                });
        }
    };

    const renderAvatar = () => {
        if (loading) {
            return (
                <CircularProgress variant='determinate' value={uploadPercent} />
            );
        } else if (avatar) {
            return (
                <img
                    src={`${avatar.url}`}
                    alt='user-avatar'
                    width='100%'
                    height='100%'
                />
            );
        } else {
            return <div className='avatar--default'></div>;
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.displayAvatar}>{renderAvatar()}</Box>
            <Box width='80%' mb='8px'>
                <input
                    ref={inputRef}
                    type='file'
                    style={{ display: 'none' }}
                    name='avatar'
                    id='avatarForm__input'
                    accept='image/png, image/jpg, image/jpeg'
                    onChange={handleFileSelect}
                />
                <Button
                    size='small'
                    variant='outlined'
                    fullWidth
                    onClick={handleInputRefClick}
                >
                    {selectedFile ? selectedFileName : 'Select file'}
                </Button>
            </Box>
            <Box width='80%' mb='8px'>
                <Button
                    size='small'
                    fullWidth
                    color='primary'
                    variant='contained'
                    disabled={selectedFile ? false : true}
                    onClick={handleFileUpload}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
};
