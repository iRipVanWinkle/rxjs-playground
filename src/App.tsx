
import { Workflow } from './workflow/Workflow';
import { ReactFlowProvider } from 'reactflow';

import "@cloudscape-design/global-styles/index.css"
import styles from './App.module.css';
import { AppLayout, BreadcrumbGroup, Container, ContentLayout, Flashbar, Header, HelpPanel, Link, SideNavigation, SplitPanel } from '@cloudscape-design/components';


function App() {
  return <div className={styles.app}>
    <ReactFlowProvider>
    <AppLayout
        // breadcrumbs={
        //   <BreadcrumbGroup
        //     items={[
        //       { text: 'Home', href: '#' },
        //       { text: 'Service', href: '#' },
        //     ]}
        //   />
        // }
        navigationOpen={false}
        disableContentPaddings
        navigation={<>
          <SideNavigation
            header={{
              href: '#',
              text: 'Service name',
            }}
            items={[{ type: 'link', text: `Page #1`, href: `#` }]}
          /></>
        }
        // notifications={
        //   <Flashbar
        //     items={[
        //       {
        //         type: 'info',
        //         dismissible: true,
        //         content: 'This is an info flash message.',
        //         id: 'message_1',
        //       },
        //     ]}
        //   />
        // }
        // toolsOpen={true}
        tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
        content={
          <ContentLayout
            // header={
            //   <Header variant="h1" info={<Link variant="info">Info</Link>}>
            //     Page header
            //   </Header>
            // }
          >
            <Workflow></Workflow>
            {/* <Container
              header={
                <Header variant="h2" description="Container description">
                  Container header
                </Header>
              }
            >
              <div className="contentPlaceholder" />
            </Container> */}
          </ContentLayout>
        }
        // splitPanel={<SplitPanel header="Split panel header">Split panel content</SplitPanel>}
      />
      {/* <AppLayout> */}
        {/* <Workflow></Workflow> */}
      {/* </AppLayout> */}
    </ReactFlowProvider>
  </div >;
}

export default App;
