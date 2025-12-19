import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic';

/**
 * Create ServiceItem API
 * POST /api/admin/service-items
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 基本驗證
    if (!body.branchId || !body.title || body.price === undefined || body.durationMin === undefined) {
      return NextResponse.json(
        {
          error_code: "INVALID_INPUT",
          message: "branchId, title, price, and durationMin are required",
        },
        { status: 400 }
      );
    }

    const serviceItem = await prisma.serviceItem.create({
      data: {
        branchId: body.branchId,
        title: body.title,
        description: body.description || null,
        price: body.price,
        durationMin: body.durationMin,
        imageUrl: body.imageUrl || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
        sortOrder: body.sortOrder !== undefined ? body.sortOrder : 0,
      },
    });

    return NextResponse.json(serviceItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error_code: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * List ServiceItems API
 * GET /api/admin/service-items?branchId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");

    if (!branchId) {
      return NextResponse.json(
        {
          error_code: "INVALID_INPUT",
          message: "branchId query parameter is required",
        },
        { status: 400 }
      );
    }

    const serviceItems = await prisma.serviceItem.findMany({
      where: {
        branchId: branchId,
      },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(serviceItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error_code: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}



