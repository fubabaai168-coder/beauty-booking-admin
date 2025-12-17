import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Get ServiceItem by ID API
 * GET /api/admin/service-items/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const serviceItem = await prisma.serviceItem.findUnique({
      where: {
        id: id,
      },
    });

    if (!serviceItem) {
      return NextResponse.json(
        {
          error_code: "NOT_FOUND",
          message: `ServiceItem with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(serviceItem, { status: 200 });
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
 * Update ServiceItem API
 * PUT /api/admin/service-items/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 檢查是否存在
    const existing = await prisma.serviceItem.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error_code: "NOT_FOUND",
          message: `ServiceItem with id ${id} not found`,
        },
        { status: 404 }
      );
    }

    // 更新資料
    const serviceItem = await prisma.serviceItem.update({
      where: {
        id: id,
      },
      data: {
        branchId: body.branchId,
        title: body.title,
        description: body.description !== undefined ? body.description : null,
        price: body.price,
        durationMin: body.durationMin,
        imageUrl: body.imageUrl !== undefined ? body.imageUrl : null,
        isActive: body.isActive !== undefined ? body.isActive : existing.isActive,
        sortOrder: body.sortOrder !== undefined ? body.sortOrder : existing.sortOrder,
      },
    });

    return NextResponse.json(serviceItem, { status: 200 });
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



