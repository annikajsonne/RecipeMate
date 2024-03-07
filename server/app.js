import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 

import recipeRoutes from './api/recipes/recipes-routes.js';
import userRoutes from './api/users/users-routes.js';
import reviewRoutes from './api/reviews/reviews-routes.js';
import bodyParser from 'body-parser';

export default(port, dbUrl) => {
    mongoose.connect(dbUrl)
    .then(() => {
        console.log('MongoDB connection successful, MongoDB available ');
    })
    .catch(err => {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(-1);
    });

    const app = express();

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.static('public'));

    app.use('/api/recipes', recipeRoutes);
    app.use('/api/users', userRoutes); 
    app.use(`/api/recipes/:recipeId/reviews`, reviewRoutes); 

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
      });
      
    app.listen(port, () => {
        console.log(`App started on port ${port}`);
    });
    
    return app;
}
