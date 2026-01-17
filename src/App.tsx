import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import AddMeal from "./containers/AddMeal/AddMeal.tsx";
import EditMeal from "./containers/EditMeal/EditMeal.tsx";
import NotFoundPage from "./containers/NotFoundPage/NotFountPage.tsx";
import Meals from "./containers/Meals/Meals.tsx";

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route index element={<Navigate to="/meals" replace/>}/>
                <Route path="/meals" element={<Meals/>}/>
                <Route path="/meals/add" element={<AddMeal/>}/>
                <Route path="/meals/:idMeal/edit" element={<EditMeal/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Layout>
    )
}

export default App
