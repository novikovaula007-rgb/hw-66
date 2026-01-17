import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type {IMeal} from "../../types";
import React from "react";
import {NavLink} from "react-router-dom";

interface Props extends IMeal {
    deleteMeal: () => void;
}

const Meal: React.FC<Props> = ({name, calories, time, date, id, deleteMeal}) => {


    return (
        <Card sx={
            {
                width: 400,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        }>
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {date}, {time}
                </Typography>
            </CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                <Box sx={{p: 2, pt: 0}}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {calories} kcal
                    </Typography>
                </Box>
                <Box sx={{margin: '0 5px'}}>
                    <IconButton aria-label="delete" onClick={deleteMeal}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="edit" component={NavLink} to={`/meals/${id}/edit`}>
                        <EditIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}

export default Meal;