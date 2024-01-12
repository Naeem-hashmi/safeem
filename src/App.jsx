// App.js
import React from "react";
import { signInWithGoogle } from "./firebase";
import GoogleLogin from "./GoogleLogin";
import Chat from "./Chat";

function App() {
  return (
    <div>
      <Chat/>
    </div>
  );
}

export default App;
