const BACKEND_URL = import.meta.env.DEV ? "http://localhost:9000/" : import.meta.env.BASE_URL;

export function load_recipe_list() {
    console.log('Fetching recipe list...');
  return fetch(`${BACKEND_URL}api/recipes`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Fetched recipe list:', data);
          return data;
      })
      .catch(error => {
        // Log the error to the console or handle it in some other way
        console.error('Fetching recipe list failed:', error);
        // Re-throw the error to ensure it propagates up
        throw error;
    });
}

export function load_recipe_detail({ params }) {
  fetch(`${BACKEND_URL}api/recipes/${params.id}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log(`Fetched recipe detail for ${params.id}:`, data);
          return data;
      });
}
