/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import contextWithSelectors from './context-with-selector';

const { Provider, useStore } = contextWithSelectors({ first: "", last: ""},
  // Example Function that lives on the store level
  { 
    setFirst: ({ set, get }, [inputValue]) => set({ first: inputValue }),
    setLast: ({ set, get }, [inputValue]) => set({ last: inputValue })
  }
);

const Input = () => {
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