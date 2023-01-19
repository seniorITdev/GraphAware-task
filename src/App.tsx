import { useState, createContext, useEffect } from "react";
import { TableRow } from "./_model/stateType";
import { data } from "./example-data";

import Table from './components/Table';

interface contextType {
  state: TableRow[];
  setState: (s: TableRow[]) => void;
}

export const stateContext = createContext<contextType>({
  state: [],
  setState: (e) => { },
});

function App() {
  const [state, setState] = useState<TableRow[]>([]);

  useEffect(() => {
    setState(data);
  }, [])

  return (
    <stateContext.Provider value={{ state, setState: (s: TableRow[]) => { setState(s) } }}>
      <div className="text-1xl">Main Table</div>
      {state.length !== 0 && <Table location={[]} />}
    </stateContext.Provider>
  );
}

export default App;
