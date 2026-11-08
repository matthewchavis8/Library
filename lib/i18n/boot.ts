// Runs before the page paints: hide it briefly if a non English language is saved,
// so the page never flashes English before switching.
export const STORAGE_KEY = "lang";

export const languageBootScript = `try{var l=localStorage.getItem("${STORAGE_KEY}");if(l&&l!=="en"){var d=document.documentElement;d.lang=l;d.classList.add("i18n-pending");setTimeout(function(){d.classList.remove("i18n-pending")},1500)}}catch(e){}`;
