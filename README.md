## React Debounce

This is the code for the article [How to use Debounce in React](https://dev.to/alexefimenko/how-to-use-debounce-in-react-1k9j).

### How to run the code

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`

### How to use Debounce in React

The problem we are trying to solve is that we want to make an API call to search for a user after the user has stopped typing for 1s (in real life, it would be more like 300ms). It will make the API calls more efficient and reduce the load on the server. Here we do not use API calls, but we will simulate the delay with a setTimeout function.

We will use the debounce function from my article [Let’s implement a Debounce function in Javascript](https://dev.to/alexefimenko/lets-implement-a-debounce-function-in-javascript-1ij1). But we will need to adjust it a bit to use it in a React component.

The main problem to use the debounce function in React is that we need to store the timer ID between renders. If we just use a useState hook, the timer ID will be reset on every render. So for this, we will use the useRef hook as it is [recommended by the React team](https://react.dev/reference/react/useRef#referencing-a-value-with-a-ref).
