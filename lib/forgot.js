import { account } from "./appwrite.js";

const resetBtn = document.getElementById("resetBtn");
const statusEl = document.getElementById("status");

resetBtn.addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!userId || !secret) {
    showStatus("❌ Invalid reset link.", "red");
    return;
  }

  if (!password || password.length < 6) {
    showStatus("⚠️ Password must be at least 6 characters.", "yellow");
    return;
  }

  if (password !== confirmPassword) {
    showStatus("❌ Passwords do not match.", "red");
    return;
  }

  // Disable button + show spinner
  resetBtn.disabled = true;
  resetBtn.innerHTML = `
    <svg class="animate-spin h-5 w-5 mr-2 inline text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg> Resetting...
  `;

  try {
    await account.updateRecovery(userId, secret, password, confirmPassword);
    showStatus("✅ Password has been reset successfully!", "green");
    resetBtn.innerHTML = "Password Reset ✅";
    resetBtn.classList.add("cursor-not-allowed");
  } catch (error) {
    showStatus("❌ Reset failed: " + (error.message || error), "red");
    resetBtn.innerHTML = "Reset Password";
    resetBtn.disabled = false;
  }
});

function showStatus(message, color) {
  statusEl.innerText = message;
  statusEl.className = `mt-6 font-semibold text-${color}-600 transition-opacity duration-500 opacity-0`;
  setTimeout(() => {
    statusEl.classList.add("opacity-100");
  }, 50);
}
