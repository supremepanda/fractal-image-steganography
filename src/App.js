function App() {
  const makeFlaskCall = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/main`)
      .then((res) => res.json())
      .then((data) => console.log({ data }));
  };

  return (
    <div>
      <h1>Fractal Image Crypto</h1>
      <h3>Click the button to check Flask</h3>
      <button onClick={makeFlaskCall}>Click</button>
    </div>
  );
}

export default App;
