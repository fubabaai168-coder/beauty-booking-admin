import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Deactivate ServiceItem API
 * PATCH /api/admin/service-items/[id]/deactivate
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // 停用（isActive = false）
    const serviceItem = await prisma.serviceItem.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
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



