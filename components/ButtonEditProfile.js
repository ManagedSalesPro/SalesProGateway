import { signIn } from "next-auth/react";
import config from "@/config";
                
const ButtonEditProfile = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
      Edit Profile
    </button>
  );
};
                
export default ButtonEditProfile;