import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { IntervalNodeType } from "./model";

const formSchema = z.object({
  period: z.coerce.number().nonnegative({
    message: "the period must be positive value or null.",
  }).optional()
})

export default function IntervalForm() {
  const { getNode, updateNodeData } = useReactFlow<IntervalNodeType>();
  const nodeId = useNodeId();

  if (!nodeId) {
    throw Error('The form component mast be used in Node');
  }

  const { data } = getNode(nodeId)!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: data,
    defaultValues: {
      period: data.period,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateNodeData(nodeId!, () => values)
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
      <FormField control={form.control} name="period" render={({ field }) => (
        <FormItem className="grid grid-cols-3 items-center gap-x-4 gap-y-1">
          <FormLabel className="col-span-1">Period</FormLabel>
          <FormControl className="col-span-2">
            <Input placeholder="Period" type="number"  {...field} />
          </FormControl>
          <FormDescription className="col-span-3">
            The interval size in milliseconds.
          </FormDescription>
          <FormMessage className="col-span-3" />
        </FormItem>
      )} />

      <Button type="submit">Save</Button>
    </form>
  </Form>
}
