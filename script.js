/* ======================================================================
   Compound Explorer — script.js
   Modules: DATA · UTILS · PARSERS · API · ENGINES · RENDERER · UI · INIT
   ====================================================================== */

/* ====================== 1. DATA ====================== */

const PT = [
  ["H","Hydrogen",1,1.008,2.20,"#FFFFFF",31,120,1,1,"nonmetal","1s1",[1,-1]],
  ["He","Helium",2,4.0026,null,"#D9FFFF",28,140,18,1,"noble gas","1s2",[0]],
  ["Li","Lithium",3,6.94,0.98,"#CC80FF",128,182,1,2,"alkali","[He] 2s1",[1]],
  ["Be","Beryllium",4,9.0122,1.57,"#C2FF00",96,153,2,2,"alkaline earth","[He] 2s2",[2]],
  ["B","Boron",5,10.81,2.04,"#FFB5B5",84,192,13,2,"metalloid","[He] 2s2 2p1",[3]],
  ["C","Carbon",6,12.011,2.55,"#404040",76,170,14,2,"nonmetal","[He] 2s2 2p2",[4,2,-4]],
  ["N","Nitrogen",7,14.007,3.04,"#3050F8",71,155,15,2,"nonmetal","[He] 2s2 2p3",[-3,3,5]],
  ["O","Oxygen",8,15.999,3.44,"#FF0D0D",66,152,16,2,"nonmetal","[He] 2s2 2p4",[-2]],
  ["F","Fluorine",9,18.998,3.98,"#90E050",57,147,17,2,"halogen","[He] 2s2 2p5",[-1]],
  ["Ne","Neon",10,20.180,null,"#B3E3F5",58,154,18,2,"noble gas","[He] 2s2 2p6",[0]],
  ["Na","Sodium",11,22.990,0.93,"#AB5CF2",166,227,1,3,"alkali","[Ne] 3s1",[1]],
  ["Mg","Magnesium",12,24.305,1.31,"#8AFF00",141,173,2,3,"alkaline earth","[Ne] 3s2",[2]],
  ["Al","Aluminum",13,26.982,1.61,"#BFA6A6",121,184,13,3,"metal","[Ne] 3s2 3p1",[3]],
  ["Si","Silicon",14,28.085,1.90,"#F0C8A0",111,210,14,3,"metalloid","[Ne] 3s2 3p2",[4,-4]],
  ["P","Phosphorus",15,30.974,2.19,"#FF8000",107,180,15,3,"nonmetal","[Ne] 3s2 3p3",[5,3,-3]],
  ["S","Sulfur",16,32.06,2.58,"#FFFF30",105,180,16,3,"nonmetal","[Ne] 3s2 3p4",[-2,4,6]],
  ["Cl","Chlorine",17,35.45,3.16,"#1FF01F",102,175,17,3,"halogen","[Ne] 3s2 3p5",[-1,1,3,5,7]],
  ["Ar","Argon",18,39.948,null,"#80D1E3",106,188,18,3,"noble gas","[Ne] 3s2 3p6",[0]],
  ["K","Potassium",19,39.098,0.82,"#8F40D4",203,275,1,4,"alkali","[Ar] 4s1",[1]],
  ["Ca","Calcium",20,40.078,1.00,"#3DFF00",176,231,2,4,"alkaline earth","[Ar] 4s2",[2]],
  ["Sc","Scandium",21,44.956,1.36,"#E6E6E6",170,211,3,4,"transition","[Ar] 3d1 4s2",[3]],
  ["Ti","Titanium",22,47.867,1.54,"#BFC2C7",160,187,4,4,"transition","[Ar] 3d2 4s2",[4,3]],
  ["V","Vanadium",23,50.942,1.63,"#A6A6AB",153,179,5,4,"transition","[Ar] 3d3 4s2",[5,4,3,2]],
  ["Cr","Chromium",24,51.996,1.66,"#8A99C7",139,189,6,4,"transition","[Ar] 3d5 4s1",[6,3,2]],
  ["Mn","Manganese",25,54.938,1.55,"#9C7AC7",139,197,7,4,"transition","[Ar] 3d5 4s2",[7,4,2]],
  ["Fe","Iron",26,55.845,1.83,"#E06633",132,194,8,4,"transition","[Ar] 3d6 4s2",[3,2]],
  ["Co","Cobalt",27,58.933,1.88,"#F090A0",126,192,9,4,"transition","[Ar] 3d7 4s2",[3,2]],
  ["Ni","Nickel",28,58.693,1.91,"#50D050",124,163,10,4,"transition","[Ar] 3d8 4s2",[2,3]],
  ["Cu","Copper",29,63.546,1.90,"#C88033",132,140,11,4,"transition","[Ar] 3d10 4s1",[2,1]],
  ["Zn","Zinc",30,65.38,1.65,"#7D80B0",122,139,12,4,"transition","[Ar] 3d10 4s2",[2]],
  ["Ga","Gallium",31,69.723,1.81,"#C28F8F",122,187,13,4,"metal","[Ar] 3d10 4s2 4p1",[3]],
  ["Ge","Germanium",32,72.630,2.01,"#668F8F",120,211,14,4,"metalloid","[Ar] 3d10 4s2 4p2",[4,2]],
  ["As","Arsenic",33,74.922,2.18,"#BD80E3",119,185,15,4,"metalloid","[Ar] 3d10 4s2 4p3",[3,5,-3]],
  ["Se","Selenium",34,78.971,2.55,"#FFA100",120,190,16,4,"nonmetal","[Ar] 3d10 4s2 4p4",[-2,4,6]],
  ["Br","Bromine",35,79.904,2.96,"#A62929",120,185,17,4,"halogen","[Ar] 3d10 4s2 4p5",[-1,1,5]],
  ["Kr","Krypton",36,83.798,3.00,"#5CB8D1",116,202,18,4,"noble gas","[Ar] 3d10 4s2 4p6",[0,2]],
  ["Rb","Rubidium",37,85.468,0.82,"#702EB0",220,303,1,5,"alkali","[Kr] 5s1",[1]],
  ["Sr","Strontium",38,87.62,0.95,"#00FF00",195,249,2,5,"alkaline earth","[Kr] 5s2",[2]],
  ["Y","Yttrium",39,88.906,1.22,"#94FFFF",190,219,3,5,"transition","[Kr] 4d1 5s2",[3]],
  ["Zr","Zirconium",40,91.224,1.33,"#94E0E0",175,186,4,5,"transition","[Kr] 4d2 5s2",[4]],
  ["Nb","Niobium",41,92.906,1.6,"#73C2C9",164,207,5,5,"transition","[Kr] 4d4 5s1",[5,3]],
  ["Mo","Molybdenum",42,95.95,2.16,"#54B5B5",154,209,6,5,"transition","[Kr] 4d5 5s1",[6,4,3]],
  ["Tc","Technetium",43,98,1.9,"#3B9E9E",147,209,7,5,"transition","[Kr] 4d5 5s2",[7]],
  ["Ru","Ruthenium",44,101.07,2.2,"#248F8F",146,207,8,5,"transition","[Kr] 4d7 5s1",[3,4]],
  ["Rh","Rhodium",45,102.91,2.28,"#0A7D8C",142,195,9,5,"transition","[Kr] 4d8 5s1",[3]],
  ["Pd","Palladium",46,106.42,2.20,"#006985",139,202,10,5,"transition","[Kr] 4d10",[2,4]],
  ["Ag","Silver",47,107.87,1.93,"#C0C0C0",145,172,11,5,"transition","[Kr] 4d10 5s1",[1]],
  ["Cd","Cadmium",48,112.41,1.69,"#FFD98F",144,158,12,5,"transition","[Kr] 4d10 5s2",[2]],
  ["In","Indium",49,114.82,1.78,"#A67573",142,193,13,5,"metal","[Kr] 4d10 5s2 5p1",[3]],
  ["Sn","Tin",50,118.71,1.96,"#668080",139,217,14,5,"metal","[Kr] 4d10 5s2 5p2",[4,2]],
  ["Sb","Antimony",51,121.76,2.05,"#9E63B5",139,206,15,5,"metalloid","[Kr] 4d10 5s2 5p3",[3,5,-3]],
  ["Te","Tellurium",52,127.60,2.1,"#D47A00",138,206,16,5,"metalloid","[Kr] 4d10 5s2 5p4",[-2,4,6]],
  ["I","Iodine",53,126.90,2.66,"#940094",139,198,17,5,"halogen","[Kr] 4d10 5s2 5p5",[-1,1,5,7]],
  ["Xe","Xenon",54,131.29,2.60,"#429EB0",140,216,18,5,"noble gas","[Kr] 4d10 5s2 5p6",[0,2,4,6,8]],
  ["Cs","Cesium",55,132.91,0.79,"#57178F",244,343,1,6,"alkali","[Xe] 6s1",[1]],
  ["Ba","Barium",56,137.33,0.89,"#00C900",215,268,2,6,"alkaline earth","[Xe] 6s2",[2]],
  ["La","Lanthanum",57,138.91,1.10,"#70D4FF",207,243,3,6,"lanthanide","[Xe] 5d1 6s2",[3]],
  ["Ce","Cerium",58,140.12,1.12,"#FFFFC7",204,242,0,6,"lanthanide","[Xe] 4f1 5d1 6s2",[3,4]],
  ["Pr","Praseodymium",59,140.91,1.13,"#D9FFC7",203,240,0,6,"lanthanide","[Xe] 4f3 6s2",[3]],
  ["Nd","Neodymium",60,144.24,1.14,"#C7FFC7",201,239,0,6,"lanthanide","[Xe] 4f4 6s2",[3]],
  ["Pm","Promethium",61,145,1.13,"#A3FFC7",199,238,0,6,"lanthanide","[Xe] 4f5 6s2",[3]],
  ["Sm","Samarium",62,150.36,1.17,"#8FFFC7",198,236,0,6,"lanthanide","[Xe] 4f6 6s2",[3]],
  ["Eu","Europium",63,151.96,1.2,"#61FFC7",198,235,0,6,"lanthanide","[Xe] 4f7 6s2",[3,2]],
  ["Gd","Gadolinium",64,157.25,1.20,"#45FFC7",196,234,0,6,"lanthanide","[Xe] 4f7 5d1 6s2",[3]],
  ["Tb","Terbium",65,158.93,1.2,"#30FFC7",194,233,0,6,"lanthanide","[Xe] 4f9 6s2",[3]],
  ["Dy","Dysprosium",66,162.50,1.22,"#1FFFC7",192,231,0,6,"lanthanide","[Xe] 4f10 6s2",[3]],
  ["Ho","Holmium",67,164.93,1.23,"#00FF9C",192,230,0,6,"lanthanide","[Xe] 4f11 6s2",[3]],
  ["Er","Erbium",68,167.26,1.24,"#00E675",189,229,0,6,"lanthanide","[Xe] 4f12 6s2",[3]],
  ["Tm","Thulium",69,168.93,1.25,"#00D452",190,227,0,6,"lanthanide","[Xe] 4f13 6s2",[3]],
  ["Yb","Ytterbium",70,173.05,1.1,"#00BF38",187,226,0,6,"lanthanide","[Xe] 4f14 6s2",[3,2]],
  ["Lu","Lutetium",71,174.97,1.27,"#00AB24",187,224,3,6,"lanthanide","[Xe] 4f14 5d1 6s2",[3]],
  ["Hf","Hafnium",72,178.49,1.3,"#4DC2FF",175,223,4,6,"transition","[Xe] 4f14 5d2 6s2",[4]],
  ["Ta","Tantalum",73,180.95,1.5,"#4DA6FF",170,222,5,6,"transition","[Xe] 4f14 5d3 6s2",[5]],
  ["W","Tungsten",74,183.84,2.36,"#2194D6",162,218,6,6,"transition","[Xe] 4f14 5d4 6s2",[6,4]],
  ["Re","Rhenium",75,186.21,1.9,"#267DAB",151,216,7,6,"transition","[Xe] 4f14 5d5 6s2",[7,4]],
  ["Os","Osmium",76,190.23,2.2,"#266696",144,216,8,6,"transition","[Xe] 4f14 5d6 6s2",[4,3]],
  ["Ir","Iridium",77,192.22,2.20,"#175487",141,213,9,6,"transition","[Xe] 4f14 5d7 6s2",[3,4]],
  ["Pt","Platinum",78,195.08,2.28,"#D0D0E0",136,213,10,6,"transition","[Xe] 4f14 5d9 6s1",[2,4]],
  ["Au","Gold",79,196.97,2.54,"#FFD123",136,214,11,6,"transition","[Xe] 4f14 5d10 6s1",[1,3]],
  ["Hg","Mercury",80,200.59,2.00,"#B8B8D0",132,223,12,6,"transition","[Xe] 4f14 5d10 6s2",[1,2]],
  ["Tl","Thallium",81,204.38,1.62,"#A6544D",145,196,13,6,"metal","[Hg] 6p1",[1,3]],
  ["Pb","Lead",82,207.2,2.33,"#575961",146,202,14,6,"metal","[Hg] 6p2",[2,4]],
  ["Bi","Bismuth",83,208.98,2.02,"#9E4FB5",148,207,15,6,"metal","[Hg] 6p3",[3,5]],
  ["Po","Polonium",84,209,2.0,"#AB5C00",140,197,16,6,"metalloid","[Hg] 6p4",[2,4]],
  ["At","Astatine",85,210,2.2,"#754F45",150,202,17,6,"halogen","[Hg] 6p5",[-1,1]],
  ["Rn","Radon",86,222,null,"#428296",150,220,18,6,"noble gas","[Hg] 6p6",[0]],
  ["Fr","Francium",87,223,0.7,"#420066",260,348,1,7,"alkali","[Rn] 7s1",[1]],
  ["Ra","Radium",88,226,0.9,"#007D00",221,283,2,7,"alkaline earth","[Rn] 7s2",[2]],
  ["Ac","Actinium",89,227,1.1,"#70ABFA",215,247,3,7,"actinide","[Rn] 6d1 7s2",[3]],
  ["Th","Thorium",90,232.04,1.3,"#00BAFF",206,245,0,7,"actinide","[Rn] 6d2 7s2",[4]],
  ["Pa","Protactinium",91,231.04,1.5,"#00A1FF",200,243,0,7,"actinide","[Rn] 5f2 6d1 7s2",[5,4]],
  ["U","Uranium",92,238.03,1.38,"#008FFF",196,241,0,7,"actinide","[Rn] 5f3 6d1 7s2",[6,4]],
  ["Np","Neptunium",93,237,1.36,"#0080FF",190,239,0,7,"actinide","[Rn] 5f4 6d1 7s2",[5]],
  ["Pu","Plutonium",94,244,1.28,"#006BFF",187,243,0,7,"actinide","[Rn] 5f6 7s2",[4]],
  ["Am","Americium",95,243,1.3,"#545CF2",180,244,0,7,"actinide","[Rn] 5f7 7s2",[3]],
  ["Cm","Curium",96,247,1.3,"#785CE3",169,245,0,7,"actinide","[Rn] 5f7 6d1 7s2",[3]],
  ["Bk","Berkelium",97,247,1.3,"#8A4FE3",168,244,0,7,"actinide","[Rn] 5f9 7s2",[3]],
  ["Cf","Californium",98,251,1.3,"#A136D4",168,245,0,7,"actinide","[Rn] 5f10 7s2",[3]],
  ["Es","Einsteinium",99,252,1.3,"#B31FD4",165,245,0,7,"actinide","[Rn] 5f11 7s2",[3]],
  ["Fm","Fermium",100,257,1.3,"#B31FBA",167,245,0,7,"actinide","[Rn] 5f12 7s2",[3]],
  ["Md","Mendelevium",101,258,1.3,"#B30DA6",173,246,0,7,"actinide","[Rn] 5f13 7s2",[3]],
  ["No","Nobelium",102,259,1.3,"#BD0D87",176,246,0,7,"actinide","[Rn] 5f14 7s2",[3,2]],
  ["Lr","Lawrencium",103,266,1.3,"#C70066",161,246,3,7,"actinide","[Rn] 5f14 7s2 7p1",[3]],
  ["Rf","Rutherfordium",104,267,null,"#CC0059",157,230,4,7,"transition","",[]],
  ["Db","Dubnium",105,268,null,"#D1004F",149,230,5,7,"transition","",[]],
  ["Sg","Seaborgium",106,269,null,"#D90045",143,230,6,7,"transition","",[]],
  ["Bh","Bohrium",107,270,null,"#E00038",141,230,7,7,"transition","",[]],
  ["Hs","Hassium",108,277,null,"#E6002E",134,230,8,7,"transition","",[]],
  ["Mt","Meitnerium",109,278,null,"#EB0026",129,230,9,7,"transition","",[]],
  ["Ds","Darmstadtium",110,281,null,"#EB0026",128,230,10,7,"transition","",[]],
  ["Rg","Roentgenium",111,282,null,"#EB0026",121,230,11,7,"transition","",[]],
  ["Cn","Copernicium",112,285,null,"#EB0026",122,230,12,7,"transition","",[]],
  ["Nh","Nihonium",113,286,null,"#EB0026",136,230,13,7,"metal","",[]],
  ["Fl","Flerovium",114,289,null,"#EB0026",143,230,14,7,"metal","",[]],
  ["Mc","Moscovium",115,289,null,"#EB0026",162,230,15,7,"metal","",[]],
  ["Lv","Livermorium",116,293,null,"#EB0026",175,230,16,7,"metal","",[]],
  ["Ts","Tennessine",117,294,null,"#EB0026",165,230,17,7,"halogen","",[]],
  ["Og","Oganesson",118,294,null,"#EB0026",157,230,18,7,"noble gas","",[]],
];
const EL = {};
PT.forEach(r => EL[r[0]] = {
  symbol:r[0], name:r[1], Z:r[2], mass:r[3], en:r[4], color:r[5],
  cov:r[6], vdw:r[7], group:r[8], period:r[9], category:r[10], config:r[11], ox:r[12]
});

function norm3(v){ const m=Math.hypot(...v)||1; return v.map(x=>x/m); }
function unitAnglesXZ(anglesDeg){
  return anglesDeg.map(a => { const r=a*Math.PI/180; return [Math.cos(r),0,Math.sin(r)];});
}
function tet(){ return [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]].map(norm3); }
function trigBi(){ return [[0,1,0],[0,-1,0],...unitAnglesXZ([0,120,240])]; }
function seesaw(){ return [[0,1,0],[0,-1,0],...unitAnglesXZ([0,120])]; }
function tshape(){ return [[0,1,0],[0,-1,0],[-1,0,0]]; }
function oct(){ return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]; }
function pentBi(){ return [[0,1,0],[0,-1,0],...unitAnglesXZ([0,72,144,216,288])]; }

const VSEPR = {
  "2,2": {name:"Linear",angles:[180],hybrid:"sp",dirs:[[1,0,0],[-1,0,0]]},
  "3,3": {name:"Trigonal planar",angles:[120],hybrid:"sp²",dirs:unitAnglesXZ([0,120,240])},
  "3,2": {name:"Bent",angles:[117],hybrid:"sp²",dirs:[unitAnglesXZ([0,120,240])[0], unitAnglesXZ([0,120,240])[1]], lonePairDirs:[unitAnglesXZ([0,120,240])[2]]},
  "4,4": {name:"Tetrahedral",angles:[109.5],hybrid:"sp³",dirs:tet()},
  "4,3": {name:"Trigonal pyramidal",angles:[107],hybrid:"sp³",dirs:tet().slice(0,3), lonePairDirs:[tet()[3]]},
  "4,2": {name:"Bent",angles:[104.5],hybrid:"sp³",dirs:tet().slice(0,2), lonePairDirs:tet().slice(2,4)},
  "5,5": {name:"Trigonal bipyramidal",angles:[90,120],hybrid:"sp³d",dirs:trigBi()},
  "5,4": {name:"Seesaw",angles:[90,120,180],hybrid:"sp³d",dirs:seesaw(), lonePairDirs:[[1,0,0]]},
  "5,3": {name:"T-shaped",angles:[90],hybrid:"sp³d",dirs:tshape(), lonePairDirs:[[1,0,0],[-0.5,0,0.866]]},
  "5,2": {name:"Linear",angles:[180],hybrid:"sp³d",dirs:[[0,1,0],[0,-1,0]], lonePairDirs:[[1,0,0],[-0.5,0,0.866],[-0.5,0,-0.866]]},
  "6,6": {name:"Octahedral",angles:[90],hybrid:"sp³d²",dirs:oct()},
  "6,5": {name:"Square pyramidal",angles:[90],hybrid:"sp³d²",dirs:oct().slice(0,5), lonePairDirs:[oct()[5]]},
  "6,4": {name:"Square planar",angles:[90],hybrid:"sp³d²",dirs:oct().slice(0,4), lonePairDirs:[oct()[4],oct()[5]]},
  "7,7": {name:"Pentagonal bipyramidal",angles:[72,90],hybrid:"sp³d³",dirs:pentBi()},
};

function valenceElectrons(sym){
  const g = EL[sym]?.group;
  if (!g) return 0;
  if (g>=1 && g<=2) return g;
  if (g===18) return sym==="He"?2:8;
  if (g>=13) return g-10;
  return EL[sym].ox?.[0] ?? 2;
}

const LIBRARY = {
  organic: [
    {name:"Methane", q:"methane", f:"CH4"},
    {name:"Ethanol", q:"ethanol", f:"C2H6O"},
    {name:"Benzene", q:"benzene", f:"C6H6"},
    {name:"Glucose", q:"glucose", f:"C6H12O6"},
    {name:"Caffeine", q:"caffeine", f:"C8H10N4O2"},
    {name:"Aspirin", q:"aspirin", f:"C9H8O4"}
  ],
  inorganic: [
    {name:"Water", q:"water", f:"H2O"},
    {name:"Ammonia", q:"ammonia", f:"NH3"},
    {name:"Sulfur hexafluoride", q:"SF6", f:"SF6"},
    {name:"Xenon oxydifluoride", q:"XeOF2", f:"XeOF2"},
    {name:"Sulfate", q:"sulfate", f:"SO4^2-"}
  ],
  physical: [
    {name:"Sodium chloride (lattice)", q:"NaCl", f:"NaCl", lattice:"nacl"},
    {name:"Diamond", q:"diamond", f:"C", lattice:"diamond"},
    {name:"CsCl", q:"CsCl", f:"CsCl", lattice:"cscl"}
  ],
  coordination: [
    {name:"Ferricyanide", q:"[Fe(CN)6]3-", f:"[Fe(CN)6]3-"},
    {name:"Hexamminecobalt(III)", q:"[Co(NH3)6]3+", f:"[Co(NH3)6]3+"}
  ]
};

const LATTICES = {
  nacl: {name:"Rock-salt (NaCl)", a:5.64, build: naclLattice},
  cscl: {name:"CsCl", a:4.11, build: cscClattice},
  diamond: {name:"Diamond", a:3.57, build: diamondLat}
};

function naclLattice(){
  const atoms=[], bonds=[];
  for (let x=0;x<3;x++) for (let y=0;y<3;y++) for (let z=0;z<3;z++){
    const parity=(x+y+z)%2===0;
    atoms.push({el: parity?"Na":"Cl", pos:[x-1,y-1,z-1].map(v=>v*1.4)});
  }
  return {atoms, bonds, ionic:true};
}
function cscClattice(){
  const atoms=[]; const s=1.5;
  for (let x=0;x<=1;x++) for (let y=0;y<=1;y++) for (let z=0;z<=1;z++)
    atoms.push({el:"Cl",pos:[(x-0.5)*2*s,(y-0.5)*2*s,(z-0.5)*2*s]});
  atoms.push({el:"Cs",pos:[0,0,0]});
  return {atoms,bonds:[],ionic:true};
}
function diamondLat(){
  const atoms=[], bonds=[]; const s=1.3;
  const base=[[0,0,0],[0.5,0.5,0],[0.5,0,0.5],[0,0.5,0.5]];
  const tet=[[0.25,0.25,0.25],[0.75,0.75,0.25],[0.75,0.25,0.75],[0.25,0.75,0.75]];
  const all=[...base,...tet];
  all.forEach(p=>atoms.push({el:"C",pos:p.map(v=>(v-0.375)*s*4)}));
  for (let i=0;i<atoms.length;i++) for (let j=i+1;j<atoms.length;j++){
    if (dist(atoms[i].pos,atoms[j].pos)<2.2) bonds.push({a:i,b:j,order:1});
  }
  return {atoms,bonds};
}

const KNOWN = {
  "H2O": {desc:"Water — Bent polar molecule with strong hydrogen bonding.", uses:"Solvent, biological life."},
  "NH3": {desc:"Ammonia — Trigonal pyramidal feedstock for chemical fertilizers.", uses:"Fertilizers, cleaning."},
  "CH4": {desc:"Methane — Simplest tetrahedral hydrocarbon alkane.", uses:"Fuel gas."},
  "SF6": {desc:"Sulfur hexafluoride — Inert octahedral hypervalent insulator.", uses:"Electrical gear."}
};

/* ====================== 2. UTILS ====================== */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

function dist(a,b){ return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);}
function debounce(fn, ms){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms);};}
function toSubscript(s){
  return String(s).replace(/([A-Za-z\)\]])(\d+)/g, (_,a,n)=>`${a}<sub class="sub">${n}</sub>`)
          .replace(/\^(\d*)([+-])/g,(_,n,s)=>`<sup class="sup">${n||""}${s}</sup>`);
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function toast(msg, ms=2800){
  const t=$("#toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove("show"), ms);
}

const CACHE = {};
async function fetchWithTimeout(url, ms=7000){
  const ctrl = new AbortController();
  const to = setTimeout(()=>ctrl.abort(), ms);
  try{
    const res = await fetch(url, {signal: ctrl.signal});
    clearTimeout(to);
    if (!res.ok) throw new Error("HTTP "+res.status);
    return res;
  }catch(e){ clearTimeout(to); throw e;}
}

/* ====================== 3. PARSERS ====================== */
function parseFormula(input){
  if (!input) return null;
  let s = String(input).trim();
  let charge = 0;
  const chM = s.match(/(?:\^?(\d*)([+-]))$/);
  if (chM){
    const n = chM[1]?parseInt(chM[1],10):1;
    charge = (chM[2]==="+"?1:-1)*n;
    s = s.slice(0, chM.index);
  }
  s = s.replace(/^\[(.+)\]$/,"$1");

  const parts = s.split(/[·⋅.]/);
  const totals = {};
  for (let part of parts){
    const prefMatch = part.match(/^(\d+)/);
    const mult = prefMatch?parseInt(prefMatch[1],10):1;
    if (prefMatch) part = part.slice(prefMatch[0].length);
    const parsed = parseGroup(part);
    if (!parsed) return null;
    for (const [el,c] of Object.entries(parsed)) totals[el]=(totals[el]||0)+c*mult;
  }
  return { counts: totals, charge };
}

function parseGroup(str){
  const res = {};
  const stack = [res];
  let i = 0;
  while (i < str.length){
    const c = str[i];
    if (c==="(" || c==="[") { stack.push({}); i++; continue;}
    if (c===")" || c==="]"){
      const top = stack.pop();
      i++;
      let num = "";
      while (i<str.length && /\d/.test(str[i])){ num+=str[i]; i++;}
      const mult = num?parseInt(num,10):1;
      const parent = stack[stack.length-1];
      for (const [el,c2] of Object.entries(top)) parent[el]=(parent[el]||0)+c2*mult;
      continue;
    }
    const m = str.slice(i).match(/^([A-Z][a-z]?)(\d*)/);
    if (!m) return null;
    const el = m[1]; const cnt = m[2]?parseInt(m[2],10):1;
    if (!EL[el]) return null;
    stack[stack.length-1][el] = (stack[stack.length-1][el]||0)+cnt;
    i += m[0].length;
  }
  return res;
}

function parseSMILES(sm){
  const atoms=[]; const bonds=[];
  let i=0; let order=1; const stack=[]; let prev=-1;
  while (i<sm.length){
    const c=sm[i];
    if (c==="=") { order=2; i++; continue; }
    if (c==="#") { order=3; i++; continue; }
    if (c==="-") { order=1; i++; continue; }
    if (c==="(") { stack.push(prev); i++; continue; }
    if (c===")") { prev=stack.pop(); i++; continue; }
    if (c==="["){
      const end=sm.indexOf("]",i);
      const inside=sm.slice(i+1,end);
      const em=inside.match(/^([A-Z][a-z]?)/);
      if (em && EL[em[1]]){
        const ai=atoms.length; atoms.push({el:em[1]});
        if (prev>=0) bonds.push({a:prev,b:ai,order}); order=1; prev=ai;
      }
      i=end+1; continue;
    }
    const m=sm.slice(i).match(/^(Br|Cl|[CNOPSFI]|[cnops])/);
    if (m){
      let el=m[1]; const aromatic=/[a-z]/.test(el); el=el[0].toUpperCase()+el.slice(1);
      const ai=atoms.length; atoms.push({el,aromatic});
      if (prev>=0) bonds.push({a:prev,b:ai,order: aromatic?1.5:order});
      order=1; prev=ai; i+=m[0].length; continue;
    }
    i++;
  }
  return {atoms,bonds};
}

function classify(counts, charge){
  if (!counts) return "unknown";
  const metals = Object.keys(counts).filter(e=>["metal","alkali","alkaline earth","transition"].includes(EL[e]?.category));
  if (charge !== 0) return "ionic";
  if (metals.length && counts.C) return "organometallic";
  if (metals.length) return "ionic / metallic";
  if (counts.C && counts.H) return "organic";
  return "inorganic";
}

function molarMass(counts){
  let m=0; for (const [el,c] of Object.entries(counts||{})) m += (EL[el]?.mass||0)*c;
  return Math.round(m*1000)/1000;
}

/* ====================== 4. API LAYER ====================== */
const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

async function pubchemCID(q){
  const key = "cid:"+q; if (CACHE[key]) return CACHE[key];
  const encoded = encodeURIComponent(q);
  const urls = [
    `${PUBCHEM}/compound/name/${encoded}/cids/JSON`,
    `${PUBCHEM}/compound/smiles/${encoded}/cids/JSON`,
    `${PUBCHEM}/compound/formula/${encoded}/cids/JSON`
  ];
  for (const u of urls){
    try{
      const r = await fetchWithTimeout(u, 5000);
      const j = await r.json();
      const cid = j?.IdentifierList?.CID?.[0];
      if (cid){ CACHE[key]=cid; return cid; }
    }catch(e){}
  }
  return null;
}

async function pubchemAutocomplete(q){
  try{
    const r = await fetchWithTimeout(`https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${encodeURIComponent(q)}/json?limit=8`, 3000);
    const j = await r.json();
    return j?.dictionary_terms?.compound || [];
  }catch(e){ return []; }
}

async function pubchemProps(cid){
  try{
    const r = await fetchWithTimeout(`${PUBCHEM}/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,IUPACName,InChI,InChIKey,Charge/JSON`, 5000);
    const j = await r.json();
    return j?.PropertyTable?.Properties?.[0] || {};
  }catch(e){ return {}; }
}

async function pubchemSDF(cid){
  for (const dim of ["3d","2d"]){
    try{
      const r = await fetchWithTimeout(`${PUBCHEM}/compound/cid/${cid}/SDF?record_type=${dim}`, 6000);
      const txt = await r.text();
      if (txt && txt.includes("V2000")) return {sdf:txt, dim};
    }catch(e){}
  }
  return null;
}

function parseSDF(sdf){
  const lines = sdf.split(/\r?\n/);
  const header = lines[3] || "";
  const nAtoms = parseInt(header.slice(0,3).trim(),10);
  const nBonds = parseInt(header.slice(3,6).trim(),10);
  const atoms=[], bonds=[];
  for (let i=0;i<nAtoms;i++){
    const ln=lines[4+i];
    const x=parseFloat(ln.slice(0,10)), y=parseFloat(ln.slice(10,20)), z=parseFloat(ln.slice(20,30));
    const el=ln.slice(31,34).trim();
    atoms.push({el, pos:[x,y,z]});
  }
  for (let i=0;i<nBonds;i++){
    const ln=lines[4+nAtoms+i];
    const a=parseInt(ln.slice(0,3).trim(),10)-1;
    const b=parseInt(ln.slice(3,6).trim(),10)-1;
    const o=parseInt(ln.slice(6,9).trim(),10);
    bonds.push({a,b,order: o===4?1.5:o});
  }
  return {atoms, bonds};
}

/* ====================== 5. ENGINES ====================== */
function vseprBuild(formulaInput){
  const parsed = parseFormula(formulaInput);
  if (!parsed) return null;
  const counts = {...parsed.counts};
  const charge = parsed.charge;
  const nonH = Object.keys(counts).filter(e=>e!=="H");
  if (nonH.length===0) return null;

  let central = null; let minEN = 999;
  nonH.forEach(e=>{
    if (counts[e]===1){
      const en = EL[e].en ?? 2.5;
      if (en < minEN){ minEN=en; central=e; }
    }
  });
  if (!central) central = nonH[0];

  const ligCounts = {...counts}; ligCounts[central]--;
  if (ligCounts[central]<=0) delete ligCounts[central];
  const ligands = [];
  for (const [el,c] of Object.entries(ligCounts))
    for (let k=0;k<c;k++) ligands.push(el);
  if (ligands.length===0) return null;

  let ve = valenceElectrons(central) - charge;
  const bonding = ligands.length;
  const lonePairs = Math.max(0, Math.floor((ve - bonding)/2));
  const steric = bonding + lonePairs;
  const key = `${steric},${bonding}`;
  const geo = VSEPR[key];
  if (!geo) return null;

  const atoms = [{el: central, pos:[0,0,0]}];
  const centralR = (EL[central].cov||80)/100;
  for (let i=0;i<ligands.length;i++){
    const dir = norm3(geo.dirs[i]);
    const ligR = (EL[ligands[i]].cov||70)/100;
    const d = (centralR + ligR) * 1.25;
    atoms.push({el: ligands[i], pos:[dir[0]*d, dir[1]*d, dir[2]*d]});
  }
  const bonds = ligands.map((_,i)=>({a:0,b:i+1,order:1}));
  
  let polVec=[0,0,0];
  const centralEN = EL[central].en||2.5;
  for (let i=1;i<atoms.length;i++){
    const diff = (EL[atoms[i].el].en||2.5) - centralEN;
    polVec[0]+=atoms[i].pos[0]*diff;
    polVec[1]+=atoms[i].pos[1]*diff;
    polVec[2]+=atoms[i].pos[2]*diff;
  }

  return {
    atoms, bonds, lonePairDirs: geo.lonePairDirs || [], central,
    geometry: geo.name, hybridization: geo.hybrid, bondAngles: geo.angles,
    stericNumber: steric, lonePairs, charge,
    polar: Math.hypot(...polVec)>0.01, dipoleVec: polVec,
    counts: parsed.counts
  };
}

/* ====================== 6. RENDERER ====================== */
const THREE_READY = () => (typeof THREE !== "undefined");

const Scene = {
  renderer: null, scene: null, camera: null, controls: null, labelRenderer: null,
  molGroup: null, raycaster: null, mouse: null, hoverTip: null,
  measureAtoms: [], styleMode: "ball-stick", showLabels: false, showLP: true, showDipole: true,
  autoRotate: false, compound: null,

  init(container){
    const w = container.clientWidth, h = container.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, w/h, 0.1, 1000);
    this.camera.position.set(6, 4, 7);

    this.renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w,h);
    container.appendChild(this.renderer.domElement);

    this.labelRenderer = new THREE.CSS2DRenderer();
    this.labelRenderer.setSize(w,h);
    this.labelRenderer.domElement.style.cssText = "position:absolute;top:0;pointer-events:none;";
    container.appendChild(this.labelRenderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.applyThemeLighting();
    this.molGroup = new THREE.Group();
    this.scene.add(this.molGroup);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.hoverTip = document.createElement("div");
    this.hoverTip.className="measure-readout";
    this.hoverTip.style.display="none";
    container.appendChild(this.hoverTip);

    this.renderer.domElement.addEventListener("pointermove", e=>this.onPointer(e, container));
    this.renderer.domElement.addEventListener("click", e=>this.onClick(e, container));

    window.addEventListener("resize", () => {
      const w2 = container.clientWidth, h2 = container.clientHeight;
      this.camera.aspect = w2/h2;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w2,h2);
      this.labelRenderer.setSize(w2,h2);
    });
    this._loop();
  },

  applyThemeLighting(){
    const toRemove = this.scene.children.filter(c => c.isLight);
    toRemove.forEach(c => this.scene.remove(c));
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const d1 = new THREE.DirectionalLight(0xffffff, 0.8);
    d1.position.set(5,8,5);
    this.scene.add(d1);
  },

  _loop(){
    requestAnimationFrame(()=>this._loop());
    if (this.autoRotate && this.molGroup) this.molGroup.rotation.y += 0.005;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  },

  clear(){
    while (this.molGroup.children.length) this.molGroup.remove(this.molGroup.children[0]);
    this.measureAtoms=[];
  },

  render(compound){
    this.compound = compound;
    this.clear();
    const {atoms, bonds, lonePairDirs, dipoleVec} = compound;

    const cx = atoms.reduce((s,a)=>s+a.pos[0],0)/atoms.length;
    const cy = atoms.reduce((s,a)=>s+a.pos[1],0)/atoms.length;
    const cz = atoms.reduce((s,a)=>s+a.pos[2],0)/atoms.length;
    const centered = atoms.map(a=>({...a, pos:[a.pos[0]-cx, a.pos[1]-cy, a.pos[2]-cz]}));

    const atomMeshes = [];
    centered.forEach((a, idx)=>{
      const el = EL[a.el] || {color:"#999", vdw:150, cov:70};
      let radius = (el.cov/100)*0.6;
      if (this.styleMode==="space-fill") radius = (el.vdw/100)*0.85;
      if (this.styleMode==="stick") radius = 0.15;
      
      const geom = new THREE.SphereGeometry(radius, 24, 20);
      const mat = new THREE.MeshStandardMaterial({color: el.color, roughness:0.3});
      const m = new THREE.Mesh(geom, mat);
      m.position.set(...a.pos);
      m.userData = {atomIndex: idx, el: a.el};
      this.molGroup.add(m);
      atomMeshes.push(m);

      if (this.showLabels){
        const div=document.createElement("div");
        div.textContent=a.el;
        div.style.cssText="background:rgba(0,0,0,.7);color:#fff;padding:1px 4px;border-radius:4px;font-size:11px;";
        const lbl = new THREE.CSS2DObject(div);
        lbl.position.set(0, radius+0.15, 0);
        m.add(lbl);
      }
    });

    // FIXED CYLINDER ALIGNMENT
    bonds.forEach(b=>{
      const start = new THREE.Vector3(...centered[b.a].pos);
      const end = new THREE.Vector3(...centered[b.b].pos);
      const dir = end.clone().sub(start);
      const len = dir.length();
      
      if (len < 0.001) return;

      const geom = new THREE.CylinderGeometry(0.08, 0.08, len, 12);
      const mat = new THREE.MeshStandardMaterial({color: 0xbbbbbb, roughness:0.4});
      const mesh = new THREE.Mesh(geom, mat);
      
      mesh.position.copy(start.clone().add(end).multiplyScalar(0.5));
      const axis = new THREE.Vector3(0, 1, 0);
      mesh.quaternion.setFromUnitVectors(axis, dir.clone().normalize());
      this.molGroup.add(mesh);
    });

    if (this.showLP && lonePairDirs && atomMeshes[0]){
      lonePairDirs.forEach(d=>{
        const g = new THREE.SphereGeometry(0.22, 16, 12);
        const mat = new THREE.MeshStandardMaterial({color:0x30e6ff, transparent:true, opacity:0.4});
        const m = new THREE.Mesh(g, mat);
        m.position.set(d[0]*0.8 + atomMeshes[0].position.x, d[1]*0.8 + atomMeshes[0].position.y, d[2]*0.8 + atomMeshes[0].position.z);
        this.molGroup.add(m);
      });
    }

    if (this.showDipole && dipoleVec){
      const mag = Math.hypot(...dipoleVec);
      if (mag>0.05){
        const arrow = new THREE.ArrowHelper(new THREE.Vector3(...dipoleVec).normalize(), new THREE.Vector3(0,0,0), Math.min(mag*0.5+1.5,3), 0xff4df0);
        this.molGroup.add(arrow);
      }
    }

    this.resetView();
  },

  resetView(){
    const box = new THREE.Box3().setFromObject(this.molGroup);
    const size = new THREE.Vector3(); box.getSize(size);
    const maxD = Math.max(size.x, size.y, size.z, 1);
    this.camera.position.set(maxD*1.8, maxD*1.2, maxD*1.8);
    this.controls.target.set(0,0,0);
    this.controls.update();
  },

  setStyle(mode){ this.styleMode = mode; if (this.compound) this.render(this.compound); },
  setLabels(v){ this.showLabels = v; if (this.compound) this.render(this.compound);},
  setLP(v){ this.showLP = v; if (this.compound) this.render(this.compound);},
  setDipole(v){ this.showDipole = v; if (this.compound) this.render(this.compound);},
  setRotate(v){ this.autoRotate = v; },

  onPointer(e, container){
    const rect = container.getBoundingClientRect();
    this.mouse.x = ((e.clientX-rect.left)/rect.width)*2-1;
    this.mouse.y = -((e.clientY-rect.top)/rect.height)*2+1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.molGroup.children.filter(m=>m.userData?.el));
    if (hits[0]){
      const u = hits[0].object.userData;
      const el = EL[u.el] || {name:u.el, Z:"?"};
      this.hoverTip.innerHTML = `<strong>${u.el}</strong> ${el.name}`;
      this.hoverTip.style.display="block";
      this.hoverTip.style.left = (e.clientX-rect.left+12)+"px";
      this.hoverTip.style.top = (e.clientY-rect.top+12)+"px";
    } else { this.hoverTip.style.display="none"; }
  },

  onClick(e, container){
    if (!this.measureMode) return;
    const rect = container.getBoundingClientRect();
    this.mouse.x = ((e.clientX-rect.left)/rect.width)*2-1;
    this.mouse.y = -((e.clientY-rect.top)/rect.height)*2+1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.molGroup.children.filter(m=>m.userData?.el));
    if (!hits[0]) return;
    this.measureAtoms.push(hits[0].object);
    if (this.measureAtoms.length===2){
      const d = this.measureAtoms[0].position.distanceTo(this.measureAtoms[1].position);
      $("#measureReadout").textContent = `${this.measureAtoms[0].userData.el}–${this.measureAtoms[1].userData.el} = ${d.toFixed(3)} Å`;
      this.measureAtoms = [];
    }
  }
};

/* FIXED 2D PROJECTION */
function render2D(compound){
  const svgDiv = $("#svg2d"); svgDiv.innerHTML="";
  const {atoms,bonds} = compound;
  const xs=atoms.map(a=>a.pos[0]), ys=atoms.map(a=>a.pos[1]);
  const minX=Math.min(...xs), maxX=Math.max(...xs);
  const minY=Math.min(...ys), maxY=Math.max(...ys);
  const W=520, H=420, pad=40;
  const sx=(W-2*pad)/Math.max(0.01,maxX-minX);
  const sy=(H-2*pad)/Math.max(0.01,maxY-minY);
  const s=Math.min(sx,sy);

  const px = x => pad + (x - minX) * s;
  const py = y => H - pad - (y - minY) * s;

  let svg=`<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg">`;
  bonds.forEach(b=>{
    const a1=atoms[b.a].pos, a2=atoms[b.b].pos;
    svg+=`<line x1="${px(a1[0])}" y1="${py(a1[1])}" x2="${px(a2[0])}" y2="${py(a2[1])}" stroke="currentColor" stroke-width="2" stroke-opacity="0.8"/>`;
  });
  atoms.forEach(a=>{
    const el=EL[a.el]||{color:"#999"};
    svg+=`<circle cx="${px(a.pos[0])}" cy="${py(a.pos[1])}" r="12" fill="${el.color}" stroke="rgba(0,0,0,.3)"/>`;
    svg+=`<text x="${px(a.pos[0])}" y="${py(a.pos[1])+4}" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#111">${a.el}</text>`;
  });
  svg+=`</svg>`;
  svgDiv.innerHTML=svg;
}

/* Hero scene */
function initHeroScene(){
  const el = $("#heroStage");
  if (!el || !THREE_READY()) return;
  const w = el.clientWidth, h = el.clientHeight;
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100); cam.position.set(0,0,6);
  const r = new THREE.WebGLRenderer({antialias:true, alpha:true});
  r.setSize(w,h);
  el.appendChild(r.domElement);
  sc.add(new THREE.AmbientLight(0xffffff, 0.8));
  
  const g = new THREE.Group(); sc.add(g);
  for (let i=0;i<6;i++){
    const a = (i/6)*Math.PI*2;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.3,16,16), new THREE.MeshStandardMaterial({color:0x30e6ff}));
    m.position.set(Math.cos(a)*1.4, Math.sin(a)*1.4, 0);
    g.add(m);
  }
  function loop(){
    requestAnimationFrame(loop);
    g.rotation.y += 0.01;
    r.render(sc,cam);
  }
  loop();
}

/* ====================== 7. UI & CONTROLS ====================== */
const STATE = {
  current: null,
  tier: null,
  theme: localStorage.getItem("ce-theme") || "dark",
  recents: JSON.parse(localStorage.getItem("ce-recents") || "[]"),
  libCat: "organic"
};

function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ce-theme", theme);
  $("#themeIcon").textContent = theme==="dark"?"◐":"☀";
  STATE.theme = theme;
}

function renderLibrary(){
  const grid = $("#libGrid");
  const items = LIBRARY[STATE.libCat] || [];
  grid.innerHTML = items.map(it=>`
    <button class="lib-card" data-q="${escapeHtml(it.q)}" data-lattice="${it.lattice||""}">
      <div class="lc-name">${escapeHtml(it.name)}</div>
      <div class="lc-formula">${toSubscript(it.f)}</div>
    </button>
  `).join("");
  $$(".lib-card", grid).forEach(c=>{
    c.addEventListener("click", ()=>{
      const q=c.dataset.q, lat=c.dataset.lattice;
      if (lat) resolveLattice(lat, q); else runSearch(q);
    });
  });
}

function pushRecent(q){
  STATE.recents = [q, ...STATE.recents.filter(x=>x!==q)].slice(0,6);
  localStorage.setItem("ce-recents", JSON.stringify(STATE.recents));
}

async function runSearch(q){
  q = q.trim(); if (!q) return;
  showWorkspace(); showLoader(true); pushRecent(q);

  try{
    const cid = await pubchemCID(q);
    if (cid){
      const [props, sdf] = await Promise.all([pubchemProps(cid), pubchemSDF(cid)]);
      if (sdf?.sdf){
        const geom = parseSDF(sdf.sdf);
        const compound = {
          atoms: geom.atoms, bonds: geom.bonds, source:"pubchem", cid, props, query:q,
          counts: parseFormula(props.MolecularFormula)?.counts || {}
        };
        STATE.tier="pubchem"; showResult(compound); return;
      }
    }
  }catch(e){}

  const compound = vseprBuild(q);
  if (compound){
    compound.query = q; compound.source="vsepr";
    STATE.tier="vsepr"; showResult(compound); return;
  }

  showLoader(false);
  $("#emptyHint").hidden=false;
}

function resolveLattice(key, q){
  const lat = LATTICES[key]; if (!lat){ runSearch(q); return;}
  const built = lat.build();
  STATE.tier="lattice";
  showResult({
    atoms: built.atoms, bonds: built.bonds, source:"lattice", query:q, counts: {}
  });
}

function showLoader(v){ $("#loader").hidden=!v; $("#emptyHint").hidden=true; }
function showWorkspace(){ $("#hero").hidden=true; $("#workspace").hidden=false; if (!Scene.renderer && THREE_READY()) Scene.init($("#stage")); }
function showHero(){ $("#workspace").hidden=true; $("#hero").hidden=false; }

function showResult(compound){
  STATE.current = compound;
  showLoader(false);
  $("#compoundName").textContent = compound.props?.IUPACName || compound.query;
  $("#compoundFormula").innerHTML = toSubscript(compound.props?.MolecularFormula || compound.query);
  $("#tierText").textContent = STATE.tier;
  Scene.render(compound);
  render2D(compound);
  renderPanel(compound);
}

function renderPanel(c){
  $("[data-pane='overview']").innerHTML = `
    <h4>Details</h4>
    <div class="kv"><span class="k">Class</span><span class="v">${classify(c.counts, c.charge||0)}</span></div>
    <div class="kv"><span class="k">Molar Mass</span><span class="v">${molarMass(c.counts)} g/mol</span></div>
  `;
}

function bindUI(){
  $("#themeToggle").addEventListener("click", () => applyTheme(STATE.theme==="dark"?"light":"dark"));
  $(".brand").addEventListener("click", showHero);
  $("#backBtn").addEventListener("click", showHero);

  $$(".lib-tab").forEach(t=>t.addEventListener("click", ()=>{     $$
(".lib-tab").forEach(x=>x.classList.toggle("active", x===t));
    STATE.libCat = t.dataset.cat; renderLibrary();
  }));

  const input = $("#searchInput");
  const submit = ()=>runSearch(input.value);
  $("#searchBtn").addEventListener("click", submit);   input.addEventListener("keydown", e=>{ if (e.key==="Enter") submit(); });    $$(".ptab").forEach(t=>t.addEventListener("click", ()=>{
    $$(".ptab").forEach(x=>x.classList.toggle("active", x===t));     $$
(".pane").forEach(p=>p.classList.toggle("active", p.dataset.pane===t.dataset.tab));
  }));
}

function boot(){
  applyTheme(STATE.theme);
  renderLibrary();
  bindUI();
  if (THREE_READY()) initHeroScene();
}

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", boot);
} else { boot(); }
