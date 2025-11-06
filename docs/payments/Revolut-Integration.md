# Revolut integráció – MVP terv

Cél: FIAT fizetések Revolut Business/Merchant segítségével, escrow jelleggel (Delayed Capture), kriptó non‑custodial külön út.

## Folyamat
1) Checkout: Hosted Checkout / client tokenizáció → AUTH (előengedélyezés)
2) Kézbesítés után: CAPTURE → kifizethető rész belső főkönyvre kerül
3) Disputa: CANCEL/REFUND a státusz szerint (admin panelből)
4) Kifizetések futároknak: bank transfer API (Revolut Business), on‑us gyorsítás Revolut számlára
5) Webhookok: payment.authorized, payment.captured, payment.cancelled, refund.created → EscrowTransaction állapotok

## Megfelelés
- ÁSZF, GDPR, AML/CTF irányelvek • Tiltott listák betartása • Fallback PSP (Stripe/Adyen) ha szükséges
