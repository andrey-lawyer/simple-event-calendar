import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { checkUserByEmail, validateToken } from "./apiCheckStorage";

export async function checkUserAndToken(router: AppRouterInstance) {
  const userEmail = localStorage.getItem("registeredUserEmail");
  const userToken = localStorage.getItem("authToken");

  if (!userEmail) {
    router.push("/register");
    return;
  }

  if (!userToken) {
    router.push("/login");
    return;
  }

  try {
    const userExists = await checkUserByEmail(userEmail);
    if (!userExists) {
      router.push("/register");
      return;
    } else {
      const tokenValidationResult = await validateToken(userToken);
      if (!tokenValidationResult || !tokenValidationResult?.success) {
        router.push("/login");
      } else {
        console.log("Token is valid");
      }
    }
  } catch (error) {
    console.error(error);
  }
}
