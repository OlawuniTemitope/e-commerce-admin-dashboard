
import { db } from "@/lib/db";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, billboardId:string }
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  const billboards = await db.billboard.findMany({
    where:{
      id:params.billboardId
    }
  })

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
        billboards ={billboards} 
        initialData={category}
         />
      </div>
    </div>
  );
}

export default CategoryPage;
