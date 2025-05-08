import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

// Verplicht Node-runtime voor Stripe
export const runtime = "nodejs";

// Initialiseer Stripe met de secret key uit de environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function GET(req: NextRequest) {
  try {
    // Haal sessie ID uit URL parameters
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sid");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Geen sessie ID opgegeven" },
        { status: 400 }
      );
    }

    // Haal sessie op van Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Controleer de status van de sessie
    const isSuccessful = session.payment_status === "paid";

    return NextResponse.json({
      isSuccessful,
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      // Alleen metadata terugsturen als de betaling succesvol was
      metadata: isSuccessful ? session.metadata : null,
    });
  } catch (error: any) {
    console.error("Verify session error:", error.message);

    // Als de sessie niet bestaat, stuur een specifieke foutcode
    if (error.code === "resource_missing") {
      return NextResponse.json(
        { error: "Ongeldige sessie ID" },
        { status: 404 }
      );
    }

    // Algemene fout
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verifiëren van de sessie" },
      { status: 500 }
    );
  }
}
