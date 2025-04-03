import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Home, InfoIcon, MoreHorizontal, Plus, PlusIcon } from "lucide-react"
import { useCallback } from "react";
import { OperationsByGroup } from "../nodes";

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
                    <div>
                      <span>{operation.title}</span>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <InfoIcon />
                  </SidebarMenuAction>
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