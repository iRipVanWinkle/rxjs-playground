import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { InfoIcon } from "lucide-react"
import { useCallback } from "react";
import { OperationsByGroup } from "../nodes";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function OperationsSidebar() {

  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData('operationKey', (event.target as any).dataset.operation);
      event.dataTransfer.effectAllowed = 'move';
    },
    [],
  );

  return (
    <Sidebar>
      <SidebarHeader>Operators</SidebarHeader>
      <SidebarContent>
        {Object.entries(OperationsByGroup).map(([group, operations]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {operations.map(operation => (<SidebarMenuItem key={operation.key} >
                  <SidebarMenuButton draggable onDragStart={onDragStart} data-operation={operation.key}>
                    <div>{operation.title}</div>
                  </SidebarMenuButton>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <SidebarMenuAction>
                        <InfoIcon />
                      </SidebarMenuAction>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      {operation.description}
                    </HoverCardContent>
                  </HoverCard>


                </SidebarMenuItem>))}

              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar >
  )
}