import { createBrowserRouter } from 'react-router-dom';
import Root from './root/root';
import HomePage from './components/home-page';
import AllRecipes from './components/all-recipes';
import RecipeList from './components/recipe-list';
import SimpleRecipeList from './components/simple-recipe-list';
import RecipeDetail from './components/recipe-page'; 
import CreateUpdateRecipe from './components/create-update-recipe';
import { load_recipe_list, load_recipe_detail } from './data/recipes-loader';

const router = createBrowserRouter([
    {
        path: '/recipes',
        element: <RecipeList />,
        loader: load_recipe_list,  // Use the loader function for the list
    },
    {
        path: '/recipes/:id',
        element: <RecipeDetail />,
        loader: load_recipe_detail,  // Use the loader function for details
    },
    {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <HomePage />, index: true },
      { path: '/all-recipes', element: <AllRecipes /> },
      { path: '/create-update-recipe', element: <CreateUpdateRecipe /> },
    ],
    },
    {
        path: '/simple-recipes',
        element: <SimpleRecipeList />,
        loader: load_recipe_list,  // use the loader function here
    },
    {
      path: '/update-recipe/:id',
      element: <CreateUpdateRecipe />,
      loader: load_recipe_detail,
    }
    
]);

export default router;
