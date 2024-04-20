"use client"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { ImageUpload } from "@/components/ui/image-upload"

interface SizeFormProps {
    initialData : Size | null
}

const formSchema = z.object({
    name: z.string().min(2),
    value: z.string().min(1)
  });

  type SizeFormValues = z.infer<typeof formSchema>


export const SizeForm = ({initialData}:SizeFormProps) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params =useParams()
  const router = useRouter()

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size.' : 'Add a new size';
  const toastMessage = initialData ? 'Size updated.' : 'size created.';
  const action = initialData ? 'Save changes' : 'Create';


    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
          name : "",
          value : ""
        }
      });

    const  onSubmit = async (data:SizeFormValues)=>{
        console.log(data)
        try {
            setLoading(true);

            if(initialData){
            await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
            }

            else{
              await axios.post(`/api/${params.storeId}/sizes`, data);           
            }
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success(toastMessage);
          } catch (error: any) {
            toast.error('Something went wrong.');
          } finally {
            setLoading(false);
          }
       
    }  

    const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
        router.refresh();
        router.push(`/${params.storeId}/sizes`);
        toast.success('Size deleted.');
      } catch (error: any) {
        toast.error('Make sure you removed all products using this Size first.');
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  
    
    
  return (
    <>   
    <AlertModal
    isOpen={open} 
    onClose={() => setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
 />
     <div className="flex items-center justify-between">
    <Heading title={title} 
    description={description} />
    {initialData && (
     <Button
      disabled={loading}
      variant="destructive"
      size="icon"
      onClick={() => setOpen(true)}
    >
      <Trash className="h-4 w-4" />
    </Button>)}
    </div>
    <Separator/>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} 
                    placeholder="Size name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />      
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} 
                    placeholder="Size value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />      
          </div>
            <Button disabled={loading}
             className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
        <ApiAlert
         variant="admin" 
         title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeId}`}
          />
    </>

   )
}
