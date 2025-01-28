### API: GET /macros

**Response:** Returns the macros consumed by the currently logged in user

```json
{
  "userID": 1,
  "calories": 2300,
  "protien": 100,
  "carbs": 100,
  "fats": 100,
  "fibre": 100
}
```

### API: GET /all-recipes

**Response:** Returns all the meals in the current database as an array of objects

```json
[
  {
    "id": 1,
    "name": "Peanut Butter Sandwich",
    "macros": {
      "calories": 2300,
      "protein": 100,
      "carbs": 100,
      "fats": 100,
      "fibre": 100
    }
  }
]
```

### API: POST /add-meal

**Request Body:**

```json
{
  "calories": 2300,
  "protein": 100,
  "carbs": 100,
  "fats": 100,
  "fibre": 100
}
```

**Response:** Return any generic message with an appropriate status code

### API: POST /add-recipe

**Request Body:**

```json
{
  "name": "Peanut Butter Sandwich",
  "macros": {
    "calories": 2300,
    "protein": 100,
    "carbs": 100,
    "fats": 100,
    "fibre": 100
  }
}
```

**Response:** Return any generic message with an appropriate status code

### API: POST /find-macros

**Request Body:**

```json
{
  "name": "Name of the recipe",
  "prompt": "The prompt of the ingridents given by the user"
}
```

**Response:** Returns the macro info determined by GPT

```json
{
  "name": "Peanut Butter Sandwich",
  "macros": {
    "calories": 2300,
    "protein": 100,
    "carbs": 100,
    "fats": 100,
    "fibre": 100
  }
}
```

### API: PUT /update-meal

**Request Body:**

```json
{
  "mealId": 1,
  "calories": 2300,
  "protein": 100,
  "carbs": 100,
  "fats": 100,
  "fibre": 100
}
```

**Response:** Returns the updated meal macro information

```json
{
  "calories": 2300,
  "protein": 100,
  "carbs": 100,
  "fats": 100,
  "fibre": 100
}
```

### API: DELETE /delete-meal/:id

**Response:** Return any generic message with an appropriate status code
