
import { Workflow } from './workflow/Workflow';
import { ReactFlowProvider } from '@xyflow/react';

import styles from './App.module.css';

function App() {
  return <div className="h-screen w-screen">
    <ReactFlowProvider>
      <Workflow></Workflow>
    </ReactFlowProvider>
  </div >;
}

export default App;
