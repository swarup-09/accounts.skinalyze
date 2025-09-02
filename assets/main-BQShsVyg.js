import{a as c}from"./appwrite-BakUkQmp.js";const e=document.getElementById("verifyBtn"),a=document.getElementById("status");e.addEventListener("click",async()=>{const t=new URLSearchParams(window.location.search),i=t.get("userId"),n=t.get("secret");if(!i||!n){s("Invalid verification link.","red");return}e.disabled=!0,e.innerHTML=`
    <svg class="animate-spin h-5 w-5 mr-2 inline text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg> Verifying...
  `,s(" Verifying, please wait...","yellow");try{await c.updateVerification(i,n),s("✅ Your account has been verified successfully!","green"),e.innerHTML="Verified ✅",e.classList.add("cursor-not-allowed")}catch(r){s("❌ Verification failed: "+(r.message||r),"red"),e.innerHTML="Verify Account",e.disabled=!1}});function s(t,i){a.innerText=t,a.className=`mt-6 font-semibold text-${i}-600 transition-opacity duration-500 opacity-0`,setTimeout(()=>{a.classList.add("opacity-100")},50)}
