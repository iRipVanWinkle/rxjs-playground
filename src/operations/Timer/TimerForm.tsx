import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { useEditPopoverContext } from "@/workflow/nodes/parts/EditPopover";

const formSchema = z.object({
  startDue: z.coerce.number().min(0, {
    message: "the start due must be more then 0.",
  }),
  intervalDuration: z.coerce.number().min(0, {
    message: "the interval duration must be more then 0.",
  }),
})

export default function TimerForm() {
  const { getNode, updateNodeData } = useReactFlow();
  const { close: closePopover } = useEditPopoverContext();

  const nodeId = useNodeId();

  if (!nodeId) {
    throw Error('The form component mast be used in Node');
  }

  const { data } = getNode(nodeId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: data,
    defaultValues: {
      startDue: data.startDue,
      intervalDuration: data.intervalDuration,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateNodeData(nodeId!, () => values);
    closePopover();
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
      <FormField control={form.control} name="startDue" render={({ field }) => (
        <FormItem className="grid grid-cols-3 items-center gap-x-4 gap-y-1">
          <FormLabel className="col-span-2">Start Due</FormLabel>
          <FormControl>
            <Input placeholder="Start Due" type="number"  {...field} />
          </FormControl>
          <FormDescription className="col-span-3">
            If a number, the amount of time in milliseconds to wait before emitting. If a Date, the exact time at which to emit.
          </FormDescription>
          <FormMessage className="col-span-3" />
        </FormItem>
      )} />
      <FormField control={form.control} name="intervalDuration" render={({ field }) => (
        <FormItem className="grid grid-cols-3 items-center gap-x-4 gap-y-1">
          <FormLabel className="col-span-2">Interval Duration</FormLabel>
          <FormControl>
            <Input placeholder="Interval Duration" type="number" {...field} />
          </FormControl>
          <FormDescription className="col-span-3">
            This is your public display name.
          </FormDescription>
          <FormMessage className="col-span-3" />
        </FormItem>
      )} />
      <Button type="submit">Save</Button>
    </form>
  </Form>
}
