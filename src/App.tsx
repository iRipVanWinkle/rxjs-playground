
import { Workflow } from './workflow/Workflow';
import { ReactFlowProvider } from 'reactflow';

import styles from './App.module.css';


function App() {
  return <div className={styles.app}>
    <ReactFlowProvider>
      <Workflow></Workflow>
    </ReactFlowProvider>
  </div >;
}

export default App;
