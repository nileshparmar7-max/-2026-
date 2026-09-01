const CONFIG={
  backendUrl:'https://script.google.com/macros/s/AKfycbwUkI9NE2sIOtRkw-hxq5ehqATqY07n2kpa7tGupxyyvrjP7wlp1Btr7ssGHEqIFuPCRA/exec',
  event:{name:'યુવા સંમેલન 2026',area:'વટવા નગર',date:'તમારી તારીખ અહીં',time:'તમારો સમય અહીં',venue:'વટવા નગર, અમદાવાદ'},
  confirmation:{sender:'યુવા સંમેલન 2026 – વટવા નગર',adminWhatsapp:'PASTE_ADMIN_WHATSAPP_NUMBER'}
};
const $=s=>document.querySelector(s);
['eventDate','eventTime','eventVenue'].forEach(k=>{const e=$('#'+k); if(e)e.textContent=CONFIG.event[{eventDate:'date',eventTime:'time',eventVenue:'venue'}[k]]});
const contacts=$('#contacts'); if(contacts) contacts.textContent='સંપર્ક નંબર માટે આયોજકનો નંબર અહીં મૂકો';
const form=$('#registrationForm'), success=$('#success'), submitBtn=form?.querySelector('.submit-btn');
function digits(v){return String(v||'').replace(/\D/g,'')}
function waNumber(phone){let n=digits(phone); if(n.length===10)n='91'+n; return n}
function buildMessage(d){return `નમસ્તે ${d.name},\n\nતમારી *${CONFIG.event.name}* માટેની નોંધણી પ્રાપ્ત થઈ છે.\n📍 ${CONFIG.event.area}\n📅 ${CONFIG.event.date}\n🕘 ${CONFIG.event.time}\n\nનોંધણી ID: ${d.registrationId}\n\nઆભાર! 🇮🇳`}
form?.addEventListener('submit',async e=>{e.preventDefault(); if(CONFIG.backendUrl.includes('PASTE_')){alert('પહેલા app.js માં Google Apps Script Web App URL મૂકો.');return} submitBtn.disabled=true; submitBtn.textContent='સબમિટ થઈ રહ્યું છે...'; const fd=new FormData(form); const data=Object.fromEntries(fd.entries()); data.action='register'; try{const r=await fetch(CONFIG.backendUrl,{method:'POST',body:JSON.stringify(data)}); const out=await r.json(); if(!out.ok)throw new Error(out.error||'Registration failed'); data.registrationId=out.registrationId; success.textContent=`નોંધણી સફળ! તમારો Registration ID: ${out.registrationId}`; success.style.display='block'; form.reset(); const msg=encodeURIComponent(buildMessage(data)); const phone=waNumber(data.whatsapp||data.phone); if(phone.length>=12){setTimeout(()=>window.open(`https://wa.me/${phone}?text=${msg}`,'_blank'),500)} }catch(err){alert('નોંધણી થઈ શકી નથી: '+err.message)}finally{submitBtn.disabled=false;submitBtn.textContent='રજિસ્ટર કરો'}});
