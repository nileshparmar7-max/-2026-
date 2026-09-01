# વટવા નગર — Complete Registration Website

આ packageમાં:
- Public Gujarati event website
- Working registration form
- Google Sheets backend (Apps Script)
- Admin dashboard + password
- CSV export
- Registration ID
- WhatsApp confirmation link

## ભાગ 1 — Google Sheet + Apps Script

1. Google Driveમાં નવી Google Sheet બનાવો, ઉદાહરણ: `Vatva Yuva Sammelan 2026`.
2. Sheetમાં `Extensions → Apps Script` ખોલો.
3. packageની `google-apps-script/Code.gs`ની આખી contents Apps Script editorમાં paste કરો.
4. આ line બદલો:
   `ADMIN_PASSWORD: 'CHANGE_THIS_TO_A_STRONG_PASSWORD'`
   અને strong password મૂકો.
5. `SHEET_NAME` સામાન્ય રીતે `Registrations` જ રાખો.
6. Apps Scriptમાં **Deploy → New deployment**.
7. Type: **Web app**.
8. Execute as: **Me**.
9. Who has access: **Anyone**.
10. Deploy કરો અને મળેલો **Web app URL** copy કરો. તે `https://script.google.com/macros/s/.../exec` જેવો હશે.

> આ URL public API endpoint છે; registration માટે તે જરૂરી છે. Admin data માટે password backendમાં verify થાય છે.

## ભાગ 2 — Website URL જોડવો

`app.js`માં:
`backendUrl: 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'`
ને તમારા Apps Script Web App URLથી બદલો.

`admin.js`માં પણ:
`const BACKEND='PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
ને એ જ URLથી બદલો.

`app.js`માં event date/time/venue બદલો.

## ભાગ 3 — Contact number

Public pageના event cardમાં actual contact number મૂકવા માટે `index.html` અથવા `app.js`નું contacts text બદલો.

## ભાગ 4 — WhatsApp confirmation

Registration સફળ થયા પછી visitorના WhatsApp/mobile number પરથી WhatsApp chat ખોલે છે અને confirmation message pre-filled હોય છે; visitorને **Send** દબાવવું પડે છે.

### True automatic WhatsApp message
સંપૂર્ણ automatic message માટે Meta WhatsApp Cloud API / WhatsApp Business API અને approved template જરૂરી છે. તે માટે API credentials server-side રાખવા અને Apps Scriptમાં API call ઉમેરવી પડશે; browserમાં secret token મૂકશો નહીં.

## ભાગ 5 — Admin Dashboard

Live website સાથે `admin.html` પણ deploy થશે. Vercel URLમાં `/admin.html` ખોલો.

ઉદાહરણ:
`https://your-domain.vercel.app/admin.html`

Apps Scriptનું admin password નાખો. Dashboardમાં:
- Total registrations
- Today's registrations
- WhatsApp count
- Search
- Refresh
- CSV Download
- Logout

## ભાગ 6 — Vercel deploy

GitHub repositoryમાં આખું folder upload કરો, પછી Vercel → Add New Project → GitHub repository → Import → Deploy.

દર વખતે GitHubમાં file edit કરીને **Commit changes** કરશો ત્યારે Vercel નવી version deploy કરશે.

## Important security

1. Admin password `Code.gs`માં strong અને unique રાખો.
2. Google Sheet public share ન કરો.
3. Admin password `admin.js`માં ક્યારેય hard-code ન કરો.
4. True automatic WhatsApp માટે API secret frontendમાં ન મૂકો.
5. Productionમાં Google Sheet access માત્ર owner/account સુધી મર્યાદિત રાખો.
