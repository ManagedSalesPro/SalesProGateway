import { signIn } from "next-auth/react";
import config from "@/config";
                
const ButtonBetaSignOn = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => signIn(undefined, { callbackUrl: config.callbackUrl })}
    >
      Login
    </button>
  );
};
                
export default ButtonBetaSignOn;