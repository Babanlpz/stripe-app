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


    const customer = await stripe.customers.retrieve(token);

    if((customer as Stripe.DeletedCustomer).deleted){
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const customerData = customer as Stripe.Customer 
    return NextResponse.json({ name: customerData.name, email: customerData.email }, { status: 200 });

  } catch (error: any) {
    console.log(error);
    return new Response("An error occured", { status: 500 });
  }
};
