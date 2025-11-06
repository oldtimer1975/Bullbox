# SPEC Addendum – Járműkorlátok, Door‑to‑door, Cipelés

## Járműtípusok és korlátok

### vehicle_type enum
- `foot` - Gyalogos
- `bike` - Kerékpár
- `scooter` - Roller/elektromos roller
- `car` - Személyautó
- `van` - Kisbusz/furgon

### Alapértelmezett max kapacitások járműtípusonként

| vehicle_type | max_weight (kg) | max_dimensions (cm) | max_size_enum |
|--------------|-----------------|---------------------|---------------|
| foot         | 5               | 40×30×30            | S             |
| bike         | 15              | 60×40×40            | M             |
| scooter      | 10              | 50×35×35            | S-M           |
| car          | 50              | 100×80×60           | L             |
| van          | 200             | 150×120×100         | L+            |

**Megjegyzések:**
- Futár profiljában tárolva: `vehicle_type` + opcionális `custom_max_weight` és `custom_max_dimensions`
- Ha custom értékek nincsenek megadva, a táblázat szerinti default-ok érvényesek
- Claim guard: csomag csak akkor claimelhető, ha a futár járműve megfelel a csomag követelményeinek

## Door-to-door és cipelési opciók

### delivery_options objektum (Package model bővítés)
```typescript
delivery_options: {
  door_to_door: boolean         // Házhoz megy-e (vs. utcai találkozó)
  floors?: number                // Hány emelet (0 = földszint)
  elevator: boolean              // Van-e lift
  carry_assist_required: boolean // Nehéz csomag, segítség kell
  stairs_fee?: number            // Kiszámított emeletdíj (Ft)
  door2door_fee?: number         // Door-to-door feláár (Ft)
  carry_assist_fee?: number      // Cipelési díj (Ft)
}
```

### Árképzési bővítés

**Alapértelmezett díjak:**
- `stairs_fee`: 200 Ft/emelet (ha nincs lift)
- `door2door_fee`: 800 Ft (fix)
- `carry_assist_fee`: 2000 Ft (fix, nehéz csomaghoz)
- `insurance_fee`: érték * 0.0015 (1.5‰), minimum 500 Ft

**Képlet bővítés:**
```
total_price = base_price 
            + (km * km_fee) 
            + (kg * kg_fee) 
            + stairs_fee 
            + door2door_fee 
            + carry_assist_fee 
            + insurance_fee 
            + surge_multiplier
```

**Példa számítás:**
- Csomag: 10 kg, 8 km, biztosítás 50 000 Ft, 3. emelet (nincs lift), door-to-door, nem kell cipelési segítség
- base_price: 1000 Ft
- km_fee: 8 * 150 = 1200 Ft
- kg_fee: 10 * 50 = 500 Ft
- stairs_fee: 3 * 200 = 600 Ft
- door2door_fee: 800 Ft
- carry_assist_fee: 0 Ft
- insurance_fee: max(50000 * 0.0015, 500) = 500 Ft
- surge_multiplier: 1.0 (nincs surge)
- **Összesen: 4600 Ft**

## Claim guard logika

**Futár csak akkor claimelhet csomagot, ha:**
1. A csomag a futár radius-án belül van (pickup és delivery között)
2. A futár vehicle_type megfelel a csomag size és weight követelményeinek
3. Ha door-to-door, a futár elfogadja ezt az opciót (profil setting)
4. Ha carry_assist_required, a futár vállalni tudja (profil setting vagy vehicle alapján)

**UI/UX:**
- Csomag kártyán badge-ek: 🚪 door-to-door, 🪜 stairs (X emelet), 💪 carry assist
- Futár filter: "Csak számomra megfelelő csomagok" (vehicle + settings alapján)
- AI ár breakdown: külön sorok az opcióknál (pl. "+600 Ft emeletdíj")

## Profil bővítések

### CourierProfile táblában:
```typescript
vehicle_type: enum              // Választott jármű
custom_max_weight?: number      // Opcionális override
custom_max_dimensions?: string  // Opcionális override (JSON vagy string)
accepts_door_to_door: boolean   // Vállalja-e házhoz menést
accepts_carry_assist: boolean   // Vállalja-e nehéz csomag cipelését
work_radius_km: number          // Munka radius (km)
available: boolean              // Jelenleg elérhető-e
```

### Package táblában:
```typescript
size: enum('S','M','L')
weight_kg: number
dimensions_cm?: string          // Opcionális, JSON: {length, width, height}
delivery_options: {             // JSON objektum
  door_to_door: boolean
  floors?: number
  elevator: boolean
  carry_assist_required: boolean
  stairs_fee?: number
  door2door_fee?: number
  carry_assist_fee?: number
}
```

## Implementációs notes
- Validation: ha `floors > 0` és `elevator = false`, akkor `stairs_fee` automatikusan számolódik
- AI pricing: figyelembe veszi a futár elérhetőséget (vehicle + opciók) a surge korrekcióhoz
- Admin panel: override lehetőség a default díjakra (globális config vagy per-package)
- I18n: badge-ek és opciók nevei HU/EN nyelveken
