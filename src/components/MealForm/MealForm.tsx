import dayjs, {Dayjs} from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import React, {useState} from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    type SelectChangeEvent,
    Button,
    Typography
} from "@mui/material";
import type {IMealForm} from "../../types";
import SaveIcon from '@mui/icons-material/Save';
import axiosAPI from "../../axiosAPI.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const initialMealForm: IMealForm = {
    name: '',
    time: '',
    calories: 0,
    date: dayjs(),
}

interface Props {
    isEditing?: boolean,
    initialValueForm?: IMealForm,
    mealID?: string,
}

const MealForm: React.FC<Props> = ({isEditing, initialValueForm = initialMealForm, mealID}) => {
    const [form, setForm] = useState<IMealForm>(initialValueForm);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const {name, value} = e.target;
        let valueForm: number | string = value

        if (name === 'price') {
            const valueCalories = Number(value)
            if (valueCalories > 0) {
                valueForm = valueCalories
            }
        }

        setForm((prevState) => ({
            ...prevState,
            [name]: valueForm
        }));
    };

    const onDateChange = (newValue: Dayjs | null) => {
        setForm((prev) => ({
            ...prev,
            date: newValue,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)

            const formSubmit = {
                ...form,
                date: form.date.format('YYYY-MM-DD'),
            }

            if (formSubmit.calories < 0) {
                toast.error('The number of calories cannot be negative.')
            } else if (!formSubmit.name || !formSubmit.time) {
                toast.error('Fill in all fields.')
            } else {
                if (isEditing && mealID) {
                    await axiosAPI.put(`/meals/${mealID}.json`, {...formSubmit});
                } else {
                    await axiosAPI.post('/meals.json', {...formSubmit});
                }
                toast.success(`Meal ${isEditing ? 'edited' : 'added'} successfully!`);
                setForm(initialMealForm)
                navigate('/meals')
            }

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{maxWidth: 450, mx: 'auto', mt: 4}}>
            <Typography variant='h4' sx={{textAlign: 'center', marginBottom: '15px'}}>
                {isEditing ? 'Edit' : 'Add'} meal
            </Typography>

            <Stack spacing={2}>

                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={onInputChange}
                    fullWidth
                    disabled={loading}
                />

                <FormControl fullWidth>
                    <InputLabel>Time</InputLabel>
                    <Select
                        label="Meal time"
                        name="time"
                        value={form.time}
                        onChange={onInputChange}
                        disabled={loading}
                    >
                        <MenuItem value="breakfast">Breakfast</MenuItem>
                        <MenuItem value="snack">Snack</MenuItem>
                        <MenuItem value="lunch">Lunch</MenuItem>
                        <MenuItem value="dinner">Dinner</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Calories"
                    name="calories"
                    type="number"
                    value={form.calories}
                    inputProps={{min: 0}}
                    onChange={onInputChange}
                    fullWidth
                    disabled={loading}
                />

                <DatePicker
                    label="Date"
                    value={form.date}
                    onChange={onDateChange}
                    disabled={loading}
                />

                <Button
                    fullWidth
                    type='submit'
                    loading={loading}
                    loadingPosition='end'
                    variant='contained'
                    endIcon={<SaveIcon/>}>
                    {isEditing ? 'Edit' : 'Add'}
                </Button>
            </Stack>
        </Box>
    );
}

export default MealForm