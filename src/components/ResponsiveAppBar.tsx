import * as React from 'react';
import _ from 'lodash';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { CircularProgress, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

export interface Page {
    name: string,
    onClick?: () => void;
    onChange?: (text: string) => void;
    value?: string;
    onClicks?: (() => void)[];
    loading?: boolean;
}

export interface ResponsiveAppBarProps {
    pages: Page[];
}

function ResponsiveAppBar(props: ResponsiveAppBarProps) {
    const [characterAnchorEl, setCharacterAnchorEl] = React.useState<null | HTMLElement>(null);
    const characterOpen = Boolean(characterAnchorEl);
    const handleCharacterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setCharacterAnchorEl(event.currentTarget);
    };
    const handleCharacterClose = () => {
        setCharacterAnchorEl(null);
    };

    const [potionAnchorEl, setPotionAnchorEl] = React.useState<null | HTMLElement>(null);
    const potionOpen = Boolean(potionAnchorEl);
    const handlePotionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPotionAnchorEl(event.currentTarget);
    };
    const handlePotionClose = () => {
        setPotionAnchorEl(null);
    };

    const [levelAnchorEl, setLevelAnchorEl] = React.useState<null | HTMLElement>(null);
    const levelOpen = Boolean(levelAnchorEl);
    const handleLevelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLevelAnchorEl(event.currentTarget);
    };
    const handleLevelClose = () => {
        setLevelAnchorEl(null);
    };

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Primal: The Abuildening
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {props.pages.map((page) => (
                                <MenuItem key={page.name} onClick={page.onClick}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Primal: The Abuildening
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={{ alignItems: 'center' }}>
                        {props.pages.map((page, i) => {
                            if (page.name === 'Character') {
                                return <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={characterOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={characterOpen ? 'true' : undefined}
                                        onClick={handleCharacterClick}
                                        style={{ color: 'white' }}
                                    >
                                        Character
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={characterAnchorEl}
                                        open={characterOpen}
                                        onClose={handleCharacterClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleCharacterClose(); page.onChange!('dareon'); }}>Dareon</MenuItem>
                                        <MenuItem onClick={() => { handleCharacterClose(); page.onChange!('heleren'); }}>Herelen</MenuItem>
                                        <MenuItem onClick={() => { handleCharacterClose(); page.onChange!('karah'); }}>Karah</MenuItem>
                                        <MenuItem onClick={() => { handleCharacterClose(); page.onChange!('ljonar'); }}>Ljonar</MenuItem>
                                        <MenuItem onClick={() => { handleCharacterClose(); page.onChange!('mirah'); }}>Mirah</MenuItem>
                                        <MenuItem onClick={() => { handleCharacterClose(); page.onChange!('thoreg'); }}>Thoreg</MenuItem>
                                    </Menu>
                                </div>
                            } else if (page.name === 'Potions') {
                                return <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={potionOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={potionOpen ? 'true' : undefined}
                                        onClick={handlePotionClick}
                                        style={{ color: 'white' }}
                                    >
                                        Potions
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={potionAnchorEl}
                                        open={potionOpen}
                                        onClose={handlePotionClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { handlePotionClose(); page.onClicks![0]() }}>Slot 1</MenuItem>
                                        <MenuItem onClick={() => { handlePotionClose(); page.onClicks![1]() }}>Slot 2</MenuItem>
                                        <MenuItem onClick={() => { handlePotionClose(); page.onClicks![2]() }}>Slot 3</MenuItem>
                                    </Menu>
                                </div>
                            } else if (_.includes(page.name, 'Level')) {
                                return <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={characterOpen ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={characterOpen ? 'true' : undefined}
                                        onClick={handleLevelClick}
                                        style={{ color: 'white' }}
                                    >
                                        {page.name}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={levelAnchorEl}
                                        open={levelOpen}
                                        onClose={handleLevelClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleLevelClose(); page.onChange!('1'); }}>1</MenuItem>
                                        <MenuItem onClick={() => { handleLevelClose(); page.onChange!('2'); }}>2</MenuItem>
                                        <MenuItem onClick={() => { handleLevelClose(); page.onChange!('3'); }}>3</MenuItem>
                                    </Menu>
                                </div>
                            } else {
                                return <Button
                                    key={page.name}
                                    onClick={page.onClick}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name} {page.loading ? <CircularProgress color='secondary' size="30px" /> : null}
                                </Button>
                            }
                        })}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
