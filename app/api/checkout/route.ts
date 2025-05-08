import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { catalog } from "@/logic/catalog";
import { mergePanels, calcTotal } from "@/logic/priceUtils";
import { QuestionnaireAnswers } from "@/types/questionnaire";

// Verplicht Node-runtime voor Stripe
export const runtime = "nodejs";

// Initialiseer Stripe met de secret key uit de environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    // Haal data uit request body
    const {
      selectedIds,
      answers,
      email,
    }: {
      selectedIds: string[];
      answers: QuestionnaireAnswers;
      email: string;
    } = await req.json();

    // Server-side validatie & prijsopbouw
    const ids = mergePanels(selectedIds);

    // Controleer of alle IDs bestaan in de catalogus en maak een omschrijving
    const selectedBiomarkers = ids.map((id) => {
      const item = catalog.find((c) => c.id === id);
      if (!item) {
        throw new Error(`Ongeldige biomarker ID: ${id}`);
      }
      return item;
    });

    // Bereken totaalprijs
    const totalAmount = calcTotal(ids);

    // Maak beschrijving van geselecteerde biomarkers
    const biomarkerNamesText = selectedBiomarkers
      .map((item) => item.name)
      .join(", ");

    // Optimaliseer metadata - bewaar alleen het essentiële in een compacte vorm
    // We gebruiken alleen de biomarker IDs (veel korter dan de volledige answers)
    // en voegen enkele belangrijke demografische gegevens toe voor rapportage
    const optimizedMetadata: Record<string, string> = {
      tests: ids.join(","), // Biomarker IDs in compacte vorm
      email: email, // Belangrijk voor klantenservice
      gender: answers.gender ? String(answers.gender) : "onbekend", // Zet om naar string
      date: new Date().toISOString().split("T")[0], // Datum van bestelling
    };

    // Maak Stripe checkout sessie met één product (de totale bloedtest)
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Gepersonaliseerde bloedtest",
                description: `Inclusief biomarkers: ${biomarkerNamesText.substring(
                  0,
                  250
                )}${biomarkerNamesText.length > 250 ? "..." : ""}`,
              },
              unit_amount: totalAmount, // Prijs in centen
            },
            quantity: 1,
          },
        ],
        customer_email: email,
        metadata: optimizedMetadata,
        success_url: `${req.nextUrl.origin}/success?sid={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.nextUrl.origin}/cancel`,
      },
      {
        // Voorkom dubbele checkout sessies bij meerdere requests
        idempotencyKey: `checkout_${email}_${Date.now()}`,
      }
    );

    // Retourneer sessie ID voor frontend
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error.message);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwerken van de betaling." },
      { status: 500 }
    );
  }
}
