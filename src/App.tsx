
import { SidebarProvider } from './components/ui/sidebar';
import { WorkContextProvider } from './context/WorkContext';
import { Workflow } from './workflow/Workflow';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  return <div className="h-screen w-screen">
    <ReactFlowProvider>
      <WorkContextProvider>
        <SidebarProvider>
          <Workflow></Workflow>
        </SidebarProvider>
      </WorkContextProvider>
    </ReactFlowProvider>
  </div >;
}

export default App;
