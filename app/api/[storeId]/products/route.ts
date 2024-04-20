import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { useSearchParams } from 'next/navigation';

 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { 
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isArchived,
      isFeatured,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("color id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isArchived,
        isFeatured,
       storeId: params.storeId,
       images:{
        createMany:{
          data:[
            ...images.map((image:{url:string})=>image)
          ]
        }
       }
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[productS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const searchParams = useSearchParams()
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const isFeatured = searchParams.get("isFeatured")


    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured : isFeatured ? true : undefined,
        isArchived:false
      },
      include:{
        size:true,
        images:true,
        color:true,
        category:true
      },
      orderBy:{
        createdAt:"desc"
      }
    });
  
    return NextResponse.json(products);
  } catch (error) {
    console.log('[productS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
