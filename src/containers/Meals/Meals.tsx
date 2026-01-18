import Meal from "../../components/Meal/Meal.tsx";
import {useCallback, useEffect, useState} from "react";
import type {IMeal, IMealAPI} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {Stack, Box, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {toast} from "react-toastify";
import dayjs from "dayjs";

const Meals = () => {
    const [meals, setMeals] = useState<IMeal[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const totalCalories = meals.reduce((totalSum, meal) => {
        if (meal.date === dayjs().format('YYYY-MM-DD')) {
            return totalSum + meal.calories;
        } else {
            return totalSum
        }
    }, 0)

    const deleteMeal = async (idMeal: string) => {
        try {
            setDeleteId(idMeal)
            await axiosAPI.delete(`/meals/${idMeal}.json`);
            setMeals(prev => prev.filter(item => item.id !== idMeal))
            toast.success('Meal successfully deleted')
        } catch (e) {
            console.log(e)
        } finally {
            setDeleteId(null)
        }
    }

    const fetchMeals = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosAPI<IMealAPI | null>('/meals.json')
            const mealsObject = response.data;
            if (mealsObject) {
                const mealsArray = Object.keys(mealsObject).map(idMeal => {
                    return {
                        ...mealsObject[idMeal],
                        id: idMeal
                    }
                })
                const sortedMeals = mealsArray.sort((a, b) => a.date.localeCompare(b.date)).reverse()
                setMeals(sortedMeals);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchMeals()
    }, [fetchMeals])

    return (
        <Box>
            <Typography variant="h5" color="primary" fontWeight="bold" sx={{marginBottom: '15px'}}>Total
                calories: {totalCalories}</Typography>
            {!loading && meals.length === 0 && 'Not meals yet.'}
            {loading && <Spinner/>}
            {!loading &&
                <Stack spacing={2}>
                    {meals.map(meal => {
                        return <Meal
                            key={meal.id}
                            name={meal.name}
                            date={meal.date}
                            calories={meal.calories}
                            time={meal.time}
                            id={meal.id}
                            loading={deleteId === meal.id}
                            deleteMeal={() => deleteMeal(meal.id)}
                        />
                    })}
                </Stack>
            }
        </Box>
    );
}

export default Meals