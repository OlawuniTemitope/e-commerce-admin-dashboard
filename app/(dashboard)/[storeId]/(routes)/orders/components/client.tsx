"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";

interface orderClientProps {
  data: OrderColumn[]
}

export const OrderClient: React.FC<orderClientProps> = ({
  data
}) => {
  return (
    <>
        <Heading title={`orders ${data.length}`} description="Manage orders for your store" />     
       <Separator />
       <DataTable
       searchKey="products"
        columns={columns} data={data} />
       </>
  );
};
