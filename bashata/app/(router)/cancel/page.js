"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/membership");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h2 className="font-bold text-[24px] text-red-400 text-center">
        Payment Cancelled
      </h2>
      <p className="font-bold text-[22px] text-red-400 text-center">
        Your payment was not processed.
      </p>
      <p className="font-bold text-[20px] text-red-400 text-center">
        {" "}
        You will be redirected to the membership shortly.
      </p>
    </div>
  );
}
