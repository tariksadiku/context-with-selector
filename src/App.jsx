/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import contextWithSelectors from './context-with-selector';

// { first, last } are provided as initialState
const { Provider, useStore } = contextWithSelectors({ first: "", last: ""},
  // Example of functions (actions) that are attached on the global store, ready for use wherever the useStore hook is called
  // In these functions, set and get are provided to change/get the latest store, and an array of parameters.
  // We don't have to worry about immutability, as the set function handles that for us.
  { 
    setFirst: ({ set, get }, [inputValue]) => set({ first: inputValue }),
    setLast: ({ set, get }, [inputValue]) => set({ last: inputValue })
  }
);

const Input = () => {
  // By using a selector, we select only part of the state that we are interested in.
  // With the use of this "selector" callback, only changes to the "first" property in our state object will cause this component to re-render
  const [fieldValue, { setFirst }] = useStore((store) => store["first"]);

  return (
    <div>
      <input
        type="text"
        value={fieldValue}
        onChange={(event) => setFirst(event.target.value)}
      />
    </div>
  );
};

const InputTwo = () => {
  const [fieldValue, { setLast }] = useStore((store) => store["last"]);

  return (
    <div>
      <input
        type="text"
        value={fieldValue}
        onChange={(event) => setLast(event.target.value)}
      />
    </div>
  );
};

const Container = ({ children }) => {
  return <div>
      {children}
    </div>
};

export function App() {
  return (
    <Provider>
      <div className="App">
        <Container>
          <Input />
        </Container>
        <Container>
          <InputTwo />
        </Container>
      </div>
    </Provider>
  );
}