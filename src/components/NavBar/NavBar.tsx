import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <Box sx={{flexGrow: 1, zIndex: 10}}>
            <AppBar position='static' sx={{backgroundColor: '#171717'}}>
                <Toolbar>
                    <Typography variant='h6'
                                sx={{flexGrow: 1, textDecoration: 'none', color: 'white'}}
                                component={NavLink}
                                to='/meals'>
                        Calorie tracker
                    </Typography>

                    <Button color='inherit' to='/meals/add' component={NavLink}>Add</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;