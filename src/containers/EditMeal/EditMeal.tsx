import {useCallback, useEffect, useState} from "react";
import type {IMealForm} from "../../types";
import {useParams} from "react-router-dom";
import axiosAPI from "../../axiosAPI";
import MealForm from "../../components/MealForm/MealForm.tsx";
import dayjs from "dayjs";
import {Box} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const EditMeal = () => {
    const [meal, setMeal] = useState<IMealForm | null>()
    const [loading, setLoading] = useState<boolean>()
    const {idMeal} = useParams()

    const fetchMeal = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axiosAPI<IMealForm | null>(`/meals/${idMeal}.json`);
            const responseMeal = response.data
            if (responseMeal) {
                setMeal(responseMeal)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [idMeal])

    useEffect(() => {
        void fetchMeal()
    }, [fetchMeal]);

    console.log(idMeal)

    return (
        <>
            {loading && <Box sx={{textAlign: "center"}}><Spinner/></Box>}
            {!loading && meal && idMeal && <MealForm
                isEditing
                initialValueForm={{
                    ...meal, date: dayjs(meal.date)
                }}
                mealID={idMeal}
            />}

        </>
    );
};

export default EditMeal;