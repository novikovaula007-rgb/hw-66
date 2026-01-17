import Meal from "../../components/Meal/Meal.tsx";
import {useCallback, useEffect, useState} from "react";
import type {IMeal, IMealAPI} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {Stack, Box} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const Meals = () => {
    const [meals, setMeals] = useState<IMeal[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchMeals = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axiosAPI<IMealAPI | null>('/meals.json')
            const mealsObject = response.data;

            if (mealsObject) {
                const mealsArray = Object.keys(mealsObject).map(idMeal => {
                    return {
                        ...mealsObject[idMeal],
                        id: idMeal
                    }
                })
                setMeals(mealsArray);
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
            {!loading && !meals && 'Not meals yet.'}
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
                        />
                    })}
                </Stack>
            }
        </Box>


    );
}

export default Meals