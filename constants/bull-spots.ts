export type Hotspot = {
  id: string
  label: string
  x: number   // 0..1 balról → jobbra
  y: number   // 0..1 fentről → lefelé
  align?: 'top' | 'bottom' | 'left' | 'right'
}

// Ha a kép más útvonalon van, cseréld a require-t
export const BULL_IMAGE = require('../assets/branding/bull-head.png')

// Finomított koordináták (bal fül frissítve)
export const BULL_SPOTS: Hotspot[] = [
  { id: 'hornL', label: 'Bal szarv',  x: 0.164, y: 0.251, align: 'top' },
  { id: 'hornR', label: 'Jobb szarv', x: 0.774, y: 0.300, align: 'top' },
  { id: 'earL',  label: 'Bal fül',    x: 0.222, y: 0.408, align: 'left' },
  { id: 'earR',  label: 'Jobb fül',   x: 0.766, y: 0.416, align: 'right' },
  { id: 'eyeL',  label: 'Bal szem',   x: 0.373, y: 0.481, align: 'bottom' },
  { id: 'eyeR',  label: 'Jobb szem',  x: 0.602, y: 0.498, align: 'bottom' },
  { id: 'nose',  label: 'Orr',        x: 0.467, y: 0.626, align: 'bottom' },
  { id: 'mouth', label: 'Száj',       x: 0.474, y: 0.721, align: 'bottom' },
  { id: 'beard', label: 'Szakáll',    x: 0.467, y: 0.824, align: 'bottom' },
]

// Hotspot → útvonal mapping
export const SPOT_TO_ROUTE: Record<string, string> = {
  hornL: 'explore',
  hornR: 'courier-dashboard',
  earL: 'tracking',
  earR: 'profile',
  eyeL: 'my-packages',
  eyeR: 'notifications',
  nose: 'create-package',
  mouth: 'create-package',
  beard: 'pricing',
}
