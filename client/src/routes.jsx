import { createBrowserRouter } from 'react-router-dom';
import Root from './root/root';
import HomePage from './components/home-page';
import AllRecipes from './components/all-recipes';
import RecipeList from './components/recipe-list';
import SimpleRecipeList from './components/simple-recipe-list';
import RecipeDetail from './components/recipe-details';
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
    //   { path: '/my-profile', element: <MyProfile /> },
    ],
    },
    {
        path: '/simple-recipes',
        element: <SimpleRecipeList />,
        loader: load_recipe_list,  // use the loader function here
      },
]);

export default router;
