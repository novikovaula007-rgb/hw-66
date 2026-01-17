import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Meal = () => {
    return (
        <Card sx={
            {
                width: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        }>
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="div">
                    title
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    time
                </Typography>
            </CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
                <Box sx={{p: 2, pt: 0}}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        calories
                    </Typography>
                </Box>
                <Box sx={{margin: '0 5px'}}>
                    <IconButton aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}

export default Meal;