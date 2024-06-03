import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2024-04-10",
});

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Erreur de token" }, { status: 400 });
    }
  } catch (error: any) {
    console.log(error);
    return new Response("An error occured", { status: 500 });
  }
};
