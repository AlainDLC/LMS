// app/cancel/page.js

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was not processed. Please try again.</p>
      <Link href="http://localhost:3000/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
