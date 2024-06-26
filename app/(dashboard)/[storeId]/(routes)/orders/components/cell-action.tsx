"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OrderColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps{
  data:OrderColumn
}

export const CellAction = ({data}:CellActionProps) => {
    
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const router = useRouter()
    const params= useParams()
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Order id copied to clipboard.');
    }
    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/orders/${data.id}`);
          router.refresh();
          toast.success('Order deleted.');
        } catch (error: any) {
          toast.error('Make sure you removed all categories using this Order first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }
    
  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    loading={loading}
    onConfirm={onDelete}/>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4"/>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuLabel>
            Action
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={()=>onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4"/>
                Copy id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/orders/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4"/>
            Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/>
            Delete
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
</>

  )
}
