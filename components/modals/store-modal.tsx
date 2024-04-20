"use client"
import axios from "axios"
import { Modal } from "@/components/ui/modal"
import  useStoreModal  from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm } from "react-hook-form";
import * as z  from "zod";
import {
     Form, 
    FormControl, 
    FormField,
     FormItem,
     FormLabel,
     FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
const formSchema = z.object({
    name:z.string().min(1)
})

export const StoreModal=()=>{
    const storemodal=useStoreModal();
    const [isLoading, setIsLoading] = useState(false)
    
    const form =useForm<z.infer<typeof formSchema>>(
        { resolver:zodResolver(formSchema), defaultValues:{
            name:''
        }}
        
    )
    const onSubmit = 
    async (values:z.infer<typeof formSchema>)=>{
        try { 
            setIsLoading(true)
    const response = await axios.post("/api/stores",values)
    window.location.assign(`/${response.data.id}`)   
     } catch (error) {
        toast("Something went wrong")
    }   finally{
        setIsLoading(false)
    }
    }

    return(
    <Modal title='Create Store'
    description='Add a new store to manage products and categories'
    isOpen={storemodal.isOpen}
    onClose={storemodal.onClose}>
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading}  placeholder="E-commerce"
                                     {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center space-x-2 pt-6 justify-end">
                            <Button
                            disabled={isLoading}
                            variant='outline'
                            onClick={storemodal.onClose}
                            >Cancel
                            </Button>
                        <Button
                         disabled={isLoading}  type="submit"
                         >
                            Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>  
    </Modal>)
}