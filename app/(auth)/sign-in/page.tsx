import { Suspense } from "react";
import SignInPageClient from "./SignInPageClient";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading sign-in...</div>}>
      <SignInPageClient />
    </Suspense>
  );
}
