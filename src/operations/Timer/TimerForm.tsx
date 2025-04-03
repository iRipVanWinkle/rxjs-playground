import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export default function TimerForm() {
  return <div className="">
    <div className="grid gap-2">
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="startDue" className="col-span-2">Start Due</Label>
        <Input type="number" id="startDue" placeholder="Start Due" defaultValue="0"/>
      </div>
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="intervalDuration" className="col-span-2">Interval Duration</Label>
        <Input type="number" id="intervalDuration" placeholder="Interval Duration" defaultValue="1000" />
      </div>
    </div>
  </div>
}
