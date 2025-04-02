import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { GroupByNodeType } from "./model";
import { useEditPopoverContext } from "@/workflow/nodes/parts/EditPopover";

const formSchema = z.object({
  keySelector: z.string()
});

export default function GroupByForm() {
  const { getNode, updateNodeData } = useReactFlow<GroupByNodeType>();
  const { close: closePopover } = useEditPopoverContext();

  const nodeId = useNodeId();

  if (!nodeId) {
    throw Error('The form component mast be used in Node');
  }

  const { data } = getNode(nodeId)!;

  const form = useForm<z.input<typeof formSchema>, object, z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: data,
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateNodeData(nodeId!, () => values);
    closePopover();
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
      <FormField control={form.control} name="keySelector" render={({ field }) => (
        <FormItem className="grid grid-cols-3 items-center gap-x-4 gap-y-1">
          <FormLabel className="col-span-1">Key Selector</FormLabel>
          <FormControl className="col-span-2">
            <Input placeholder="0" {...field} />
          </FormControl>
          <FormMessage className="col-span-3" />
        </FormItem>
      )} />

      <Button type="submit">Save</Button>
    </form>
  </Form>
}
