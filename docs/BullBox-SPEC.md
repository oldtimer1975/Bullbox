# BullBox – Közösségi csomagküldő (MVP SPEC)

## 1) Termék fókusz
- Célrégió: Globális; Platform: Webapp (HU/EN)
- Központi élmény: gyors és rugalmas közösségi kézbesítés, AI‑os árképzéssel, kriptós/fiatos pénztárcával, teljes KYC és escrow mellett.

## 2) Szereplők és szerepek
- Sender (küldő) • Courier (futár) • Admin (moderátor)

## 3) KYC, biztonság, megfelelés
- Teljes KYC (ID + selfie) • GDPR (export/törlés) • Fraud jelek • Tiltott tartalom deklaráció

## 4) Fizetés és wallet
- Hibrid: FIAT (custodial, Revolut cél) + kriptó (non‑custodial)
- Escrow: fizetés zárolás → QR/confirm → felszabadítás; disputa = admin

## 5) Árképzés (AI + formula)
- price = base + km*km_fee + kg*kg_fee + stairs + door2door + insurance + surge
- AI korrekció: futársűrűség, forgalom, sürgősség • Alkudozás chatben, „Véglegesítés" gomb

## 6) Biztosítás (opció)
- Érték alapú díj (min díj) • Policy snapshot • Manuális claim MVP-ben

## 7) Funkciók (MVP)
- Auth+KYC • User/Courier profil (radius, availability) • Package CRUD (cím, geo, fotók, opciók)
- Claim & státuszok: CREATED→CLAIMED→PICKED_UP→IN_TRANSIT→DELIVERED→CONFIRMED (+DISPUTED)
- QR átadás/átvétel • GPS követés • Chat (szöveg+fotó) • Push • AI asszisztens • Kétirányú értékelés
- Referral keret • Admin panel (override, disputa)

## 8) Nem‑funkcionális
- Indexek, pagináció • Rate‑limit, input validálás • Log+Audit • I18n HU/EN • Alap hibakezelés

## 9) Adatmodell (váz)
- User, CourierProfile, Package (dimensions+delivery_options), ChatMessage, Rating, Referral,
  WalletAccount, EscrowTransaction, AuditLog, NotificationToken
- Enumok: size(S|M|L), status, kyc_status

## 10) UI váz
- Discover, My Packages, Courier, Wallet, Referral, Profile, Admin • Csomag kártya badge-ekkel

(Alátámasztó részletek: lásd addendum fájlokat ebben a PR-ben.)
