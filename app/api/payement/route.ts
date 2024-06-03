import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

interface Data {
  title: string;
  price: number;
  image: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const data: Data = await request.json();
    console.log(data);

    const customer = await stripe.customers.create({
      email: "customer@exemple.com",
      address: {
        city: "Paris",
        country: "France",
        line1: "1 rue de la paix",
        postal_code: "75000",
        state: "IDF",
      },
      name: "John Doe",
    });
    console.log(customer);

    const amountInCents = Math.round(data.price * 100);
    if (amountInCents < 50) {
      throw new Error("Amount must be at least 50 cents");
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      mode: "payment",
      success_url: "http://localhost:3000/success?token=" + customer.id,
      cancel_url: "http://localhost:3000/cancel?token=" + customer.id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            product_data: {
              name: data.title,
            },
            currency: "EUR",
            unit_amount: amountInCents,
          },
        },
      ],
    });
    console.log(checkoutSession.url);
    return NextResponse.json(
      { msg: checkoutSession, url: checkoutSession.url },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
