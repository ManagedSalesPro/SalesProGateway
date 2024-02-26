import { signIn } from "next-auth/react";
import config from "../../../config.js";
                
const ButtonBetaSignIn = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
      Beta Sign In
    </button>
  );
};
                
export default ButtonBetaSignIn;