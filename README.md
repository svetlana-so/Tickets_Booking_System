## Plan:

1. provide a function to get a list of movies with their id, title and year by providing a list of their IDs (e.g., /movies?id=133093,816692 should return 2 movies with these IDs, if they exist) ✅

2. create a migration file to be able to create a table screenings with following parameters: id(autoIncrement, primary key, not null), movie_id(nut null, with reference to movie.id), date(date), total_tickets(integer), tickets_left(integer)✅

3. generate types for the database✅

4. create a validation schema using zod✅

5. create tests to allow admin to add and edit screenings, implement these functions✅

6. let the user get a list of screenings available for booking. Screenings should include session information (timestamp, number of tickets, number of tickets left) and movies: (title and year).✅

7. create users and bookings tables ✅

8. implement function to create users, provide zod validation schema, write tests ✅

9. let the user to create a booking (book a ticket) for movie screening that has some tickets left.

10. let the users get a list of bookings (tickets) they have booked

## Setup

## Migrations

We can run migrations with the following command:

```bash
npm run migrate:latest
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run gen:types
```
