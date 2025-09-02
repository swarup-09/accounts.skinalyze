import { account } from "./appwrite.js";


const verifyBtn = document.getElementById("verifyBtn");
const statusEl = document.getElementById("status");

verifyBtn.addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  if (!userId || !secret) {
    showStatus("Invalid verification link.", "red");
    return;
  }

  // Disable button and show loading spinner
  verifyBtn.disabled = true;
  verifyBtn.innerHTML = `
    <svg class="animate-spin h-5 w-5 mr-2 inline text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg> Verifying...
  `;
  showStatus(" Verifying, please wait...", "yellow");

  try {
    await account.updateVerification(userId, secret);
    showStatus("✅ Your account has been verified successfully!", "green");
    verifyBtn.innerHTML = "Verified ✅";
    verifyBtn.classList.add("cursor-not-allowed");
  } catch (error) {
    showStatus("❌ Verification failed: " + (error.message || error), "red");
    verifyBtn.innerHTML = "Verify Account";
    verifyBtn.disabled = false;
  }
});

// Helper to show messages with smooth animation
function showStatus(message, color) {
  statusEl.innerText = message;
  statusEl.className = `mt-6 font-semibold text-${color}-600 transition-opacity duration-500 opacity-0`;
  setTimeout(() => {
    statusEl.classList.add("opacity-100");
  }, 50);
}
