"use client"

import ButtonBetaSignIn from "./ButtonBetaSignIn.js";

const SignInPageMain = () => {
    return (
        <main className="bg-white h-screen flex justify-center items-center">
            <div className="bg-gray-300 p-10 rounded-lg flex justify-center items-center">
                <ButtonBetaSignIn className="btn btn-primary btn-wide">Beta Sign In</ButtonBetaSignIn>
            </div>
        </main>
    );
};

export default SignInPageMain;
