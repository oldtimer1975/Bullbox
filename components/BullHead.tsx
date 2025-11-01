import React from 'react';
import Svg, { Ellipse, Circle, Path } from 'react-native-svg';

type BullHeadProps = {
  width?: number;
  height?: number;
};

const BullHead: React.FC<BullHeadProps> = ({ width = 320, height = 400 }) => (
  <Svg width={width} height={height} viewBox="0 0 320 400">
    {/* Fej */}
    <Ellipse cx="160" cy="170" rx="95" ry="110" fill="#ff2a2a" stroke="#b80000" strokeWidth="8"/>
    {/* Orr */}
    <Ellipse cx="160" cy="285" rx="40" ry="30" fill="#ffe6e6" stroke="#b80000" strokeWidth="6"/>
    {/* Szarvak (sárga, RedBull stílus) */}
    <Path d="M60,80 Q15,30 100,110" stroke="#FFD700" strokeWidth="18" fill="none" strokeLinecap="round"/>
    <Path d="M260,80 Q305,30 220,110" stroke="#FFD700" strokeWidth="18" fill="none" strokeLinecap="round"/>
    {/* Fülek (piros, pici arcpír) */}
    <Ellipse cx="60" cy="140" rx="25" ry="40" fill="#ff2a2a" stroke="#b80000" strokeWidth="6" rotation="-18" origin="60,140"/>
    <Ellipse cx="260" cy="140" rx="25" ry="40" fill="#ff2a2a" stroke="#b80000" strokeWidth="6" rotation="18" origin="260,140"/>
    {/* Szemek (fehér, nagy, kedves) */}
    <Ellipse cx="120" cy="180" rx="18" ry="24" fill="#fff" />
    <Ellipse cx="200" cy="180" rx="18" ry="24" fill="#fff" />
    {/* Pupillák (fekete, pici fényfolt) */}
    <Circle cx="120" cy="190" r="7" fill="#222" />
    <Circle cx="200" cy="190" r="7" fill="#222" />
    <Circle cx="125" cy="185" r="3" fill="#fff" opacity={0.7}/>
    <Circle cx="205" cy="185" r="3" fill="#fff" opacity={0.7}/>
    {/* Mosoly (piros, vidám) */}
    <Path d="M130,235 Q160,265 190,235" stroke="#b80000" strokeWidth="6" fill="none" strokeLinecap="round"/>
    {/* Arcpír (rózsaszín) */}
    <Ellipse cx="100" cy="215" rx="13" ry="7" fill="#fa82a2" opacity="0.35"/>
    <Ellipse cx="220" cy="215" rx="13" ry="7" fill="#fa82a2" opacity="0.35"/>
    {/* Kedves szemöldök (sárga) */}
    <Path d="M105,162 Q120,150 135,162" stroke="#FFD700" strokeWidth="4" fill="none"/>
    <Path d="M185,162 Q200,150 215,162" stroke="#FFD700" strokeWidth="4" fill="none"/>
    {/* Fülcimpa árnyék */}
    <Ellipse cx="70" cy="160" rx="7" ry="15" fill="#b80000" opacity="0.3"/>
    <Ellipse cx="250" cy="160" rx="7" ry="15" fill="#b80000" opacity="0.3"/>
    {/* Vicces farokbojt (a fej mellett egy kis szimbolikus szőrcsomó - RedBull utalás) */}
    <Path d="M140,330 Q160,350 180,330" stroke="#222" strokeWidth="7" fill="none" strokeLinecap="round"/>
  </Svg>
);

export default BullHead;
