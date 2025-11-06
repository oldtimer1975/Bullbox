# BullBox – Családi Élő Pilot Terv

## Cél
30–45 perces élő demo forgatókönyv valós családi szereplőkkel (küldők és futárok), amely bemutatja az MVP teljes flow-ját: csomag feladás, futár keresés és claim, QR átadás/átvétel, GPS követés, chat, értékelés, és fizetés/escrow kezelés.

## Résztvevők
- **Sender 1** (Küldő 1): Feladó, aki egy közepes csomagot szeretne küldeni
- **Sender 2** (Küldő 2): Feladó, aki biztosítással és door-to-door opcióval rendel
- **Courier 1** (Futár 1): Biciklis futár, 5 km radius
- **Courier 2** (Futár 2): Autós futár, nagyobb radius
- **Admin**: Moderátor/rendszergazda (disputa kezeléshez)

## Forgatókönyv lépések

### 1. Előkészület (5 perc)
- Minden résztvevő bejelentkezik a rendszerbe (auth)
- KYC státusz ellenőrzése (előre validált demo környezetben)
- Futárok beállítják radius-ukat és elérhetőségüket
- Wallet egyenlegek feltöltve (demo kripto/fiat)

### 2. Csomag feladás (5-7 perc)
**Sender 1:**
- Létrehoz egy közepes (M) csomagot
- Megadja pickup és delivery címeket
- Fotókat tölt fel a csomagról
- Alapértelmezett biztosítás nélkül

**Sender 2:**
- Létrehoz egy kis (S) csomagot
- Biztosítást választ (értékmegadás)
- Door-to-door opciót kér (3. emelet, lift van)
- Sürgős jelzést ad (AI surge pricing)

### 3. AI árképzés és ajánlatok (3-5 perc)
- Rendszer kiszámítja az alap árakat (km, súly, opciók)
- AI korrekció: futársűrűség, forgalom, sürgősség
- Küldők látják a javasolt árakat
- Lehetőség alkudozásra chat-ben (opcionális)

### 4. Futár keresés és claim (5 perc)
**Courier 1:**
- Böngészi az elérhető csomagokat radius-án belül
- Elfogadja Sender 1 csomagját
- Értesítés megy Sender 1-nek

**Courier 2:**
- Böngészi az opciókat
- Elfogadja Sender 2 biztosított csomagját
- Escrow aktiválódik (fizetés zárolva)

### 5. Pickup - QR átadás (5 perc)
- Futárok navigálnak a pickup címekhez (GPS követés látható)
- Küldők és futárok találkoznak
- **QR flow:**
  - Futár generál QR kódot
  - Küldő scanneli → csomag státusz: PICKED_UP
  - Chat: fotó a csomagról átvétel után

### 6. Szállítás - GPS követés és chat (5-7 perc)
- Küldők valós időben követik a futárokat
- Chat interakció:
  - Sender 2: "Hány perc múlva érkezik?"
  - Courier 2: "5 perc, már a környéken vagyok"
- Push értesítések: "Futár közeledik"

### 7. Delivery - QR átvétel (5 perc)
- Futárok megérkeznek delivery címekhez
- Címzettek találkoznak futárokkal
- **QR flow:**
  - Címzett generál QR kódot
  - Futár scanneli → csomag státusz: DELIVERED
  - Chat: fotó a sikeres átadásról

### 8. Megerősítés és értékelés (3-5 perc)
- Címzettek megerősítik az átvételt (CONFIRMED státusz)
- Escrow felszabadul → fizetés továbbítása futároknak
- Kétirányú értékelés:
  - Küldők értékelik futárokat (gyorsaság, kommunikáció)
  - Futárok értékelik küldőket (csomag állapot, pontosság)

### 9. Disputa szimuláció (5 perc - opcionális)
**Szcenárió:** Sender 1 azt állítja, hogy a csomag sérült volt
- Küldő megnyit egy disputát
- Admin panel: felülvizsgálat
- Chat log és fotók átnézése
- Admin döntés: részleges visszatérítés vagy elutasítás
- Escrow kezelés: refund vagy capture

### 10. Referral és profil metrikák (2-3 perc)
- Résztvevők megtekintik profiljukat
- Stabilitási mutatók frissültek
- Referral link megosztás (demo)
- Wallet egyenlegek ellenőrzése

## Technikai követelmények
- Stabil internet minden eszközön
- GPS engedélyek engedélyezve
- Push értesítések engedélyezve
- Kamera hozzáférés (QR scan és fotók)
- Demo wallet egyenlegek előre feltöltve

## Sikerkritériumok
- ✅ Teljes flow végigvitele megszakítás nélkül
- ✅ QR átadás/átvétel működik mindkét csomagra
- ✅ GPS követés valós időben látható
- ✅ Chat és push értesítések érkeznek
- ✅ Escrow helyesen kezelődik
- ✅ Értékelések leadhatók
- ✅ Admin disputa kezelés sikeres

## Utómunka
- Résztvevői feedback gyűjtése
- Teljesítmény és UX problémák azonosítása
- Bug lista összeállítása
- MVP finomítási feladatok priorizálása
