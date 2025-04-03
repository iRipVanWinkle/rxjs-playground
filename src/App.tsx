
import { SidebarProvider } from './components/ui/sidebar';
import { Workflow } from './workflow/Workflow';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  return <div className="h-screen w-screen">
    <ReactFlowProvider>
      <SidebarProvider defaultOpen={false}>
          <Workflow></Workflow>
      </SidebarProvider>
    </ReactFlowProvider>
  </div >;
}

export default App;
