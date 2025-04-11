{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import React, \{ useState \} from "react"\
\
// Main App Component\
const SpineMetastasisApp = () => \{\
  const [currentScreen, setCurrentScreen] = useState("home")\
  const [sinsScore, setSinsScore] = useState(0)\
  const [rtsScore, setRtsScore] = useState(0)\
  const [esccGrade, setEsccGrade] = useState(null)\
  const [nomsData, setNomsData] = useState(\{\
    neurologic: null,\
    oncologic: null,\
    mechanical: null,\
    systemic: null\
  \})\
\
  // Reset all scores when returning to home\
  const goHome = () => \{\
    setSinsScore(0)\
    setRtsScore(0)\
    setEsccGrade(null)\
    setNomsData(\{\
      neurologic: null,\
      oncologic: null,\
      mechanical: null,\
      systemic: null\
    \})\
    setCurrentScreen("home")\
  \}\
\
  // Render different screens based on currentScreen state\
  const renderScreen = () => \{\
    switch (currentScreen) \{\
      case "home":\
        return <HomeScreen setCurrentScreen=\{setCurrentScreen\} />\
      case "sins":\
        return (\
          <SINSScreen\
            sinsScore=\{sinsScore\}\
            setSinsScore=\{setSinsScore\}\
            goHome=\{goHome\}\
          />\
        )\
      case "rts":\
        return (\
          <RTSScreen\
            rtsScore=\{rtsScore\}\
            setRtsScore=\{setRtsScore\}\
            goHome=\{goHome\}\
          />\
        )\
      case "escc":\
        return (\
          <ESCCScreen\
            esccGrade=\{esccGrade\}\
            setEsccGrade=\{setEsccGrade\}\
            goHome=\{goHome\}\
          />\
        )\
      case "noms":\
        return (\
          <NOMSScreen\
            nomsData=\{nomsData\}\
            setNomsData=\{setNomsData\}\
            goHome=\{goHome\}\
          />\
        )\
      default:\
        return <HomeScreen setCurrentScreen=\{setCurrentScreen\} />\
    \}\
  \}\
\
  return (\
    <div className="flex flex-col min-h-screen bg-gray-100">\
      \{/* Header */\}\
      <header className="bg-gray-800 text-white p-4">\
        <h1 className="text-2xl font-bold text-center">\
          NeurosurgerySpine.healthcenter\
        </h1>\
        <p className="text-center text-gray-300 italic">\
          Solutions avanc\'e9es pour la chirurgie vert\'e9brale\
        </p>\
      </header>\
\
      \{/* Main Content */\}\
      <main className="flex-grow p-4">\{renderScreen()\}</main>\
\
      \{/* Footer */\}\
      <footer className="bg-gray-200 p-2 text-center text-sm text-gray-600">\
        \'a9 \{new Date().getFullYear()\} NeurosurgerySpine.healthcenter - Tous\
        droits r\'e9serv\'e9s\
      </footer>\
    </div>\
  )\
\}\
\
// Home Screen Component\
const HomeScreen = (\{ setCurrentScreen \}) => \{\
  return (\
    <div className="flex flex-col items-center justify-center p-4">\
      <h2 className="text-3xl font-bold mb-8 text-center">\
        Bienvenue dans notre suite d'applications\
      </h2>\
      <p className="text-xl mb-12 text-center">\
        S\'e9lectionnez l'application que vous souhaitez utiliser\
      </p>\
\
      <div className="grid grid-cols-2 gap-4 max-w-2xl">\
        \{/* SINS Module */\}\
        <PuzzlePiece\
          color="bg-green-500"\
          title="Score d'Instabilit\'e9 (SINS)"\
          onClick=\{() => setCurrentScreen("sins")\}\
        />\
\
        \{/* RTS Module */\}\
        <PuzzlePiece\
          color="bg-red-500"\
          title="Score de Tokuhashi R\'e9vis\'e9 (RTS)"\
          onClick=\{() => setCurrentScreen("rts")\}\
        />\
\
        \{/* ESCC Module */\}\
        <PuzzlePiece\
          color="bg-blue-500"\
          title="\'c9chelle de Bilsky (ESCC)"\
          onClick=\{() => setCurrentScreen("escc")\}\
        />\
\
        \{/* NOMS Module */\}\
        <PuzzlePiece\
          color="bg-yellow-500"\
          title="Framework NOMS"\
          onClick=\{() => setCurrentScreen("noms")\}\
        />\
      </div>\
    </div>\
  )\
\}\
\
// Puzzle Piece Component\
const PuzzlePiece = (\{ color, title, onClick \}) => \{\
  return (\
    <button\
      onClick=\{onClick\}\
      className=\{`$\{color\} hover:opacity-90 rounded-lg p-6 flex flex-col items-center justify-center h-48 text-white shadow-lg transition-transform transform hover:scale-105`\}\
    >\
      <div className="text-xl font-bold text-center">\{title\}</div>\
    </button>\
  )\
\}\
\
// SINS Score Screen\
const SINSScreen = (\{ sinsScore, setSinsScore, goHome \}) => \{\
  const [answers, setAnswers] = useState(\{\
    location: null,\
    pain: null,\
    boneType: null,\
    alignment: null,\
    collapse: null,\
    involvement: null\
  \})\
\
  // Calculate score whenever answers change\
  React.useEffect(() => \{\
    const total = Object.values(answers).reduce(\
      (sum, value) => sum + (value !== null ? value : 0),\
      0\
    )\
    setSinsScore(total)\
  \}, [answers, setSinsScore])\
\
  const handleChange = (category, value) => \{\
    setAnswers(prev => (\{ ...prev, [category]: parseInt(value) \}))\
  \}\
\
  // Interpret SINS score\
  const interpretSins = () => \{\
    if (sinsScore >= 13) \{\
      return \{\
        stability: "Tr\'e8s instable",\
        recommendation:\
          "Consultation en chirurgie du rachis fortement recommand\'e9e pour envisager une stabilisation.",\
        class: "bg-red-100 border-red-500 text-red-800"\
      \}\
    \} else if (sinsScore >= 7) \{\
      return \{\
        stability: "Potentiellement instable",\
        recommendation: "Consultation en chirurgie du rachis recommand\'e9e.",\
        class: "bg-yellow-100 border-yellow-500 text-yellow-800"\
      \}\
    \} else \{\
      return \{\
        stability: "Stable",\
        recommendation:\
          "Traitement conservateur peut \'eatre envisag\'e9. Surveillance r\'e9guli\'e8re recommand\'e9e.",\
        class: "bg-green-100 border-green-500 text-green-800"\
      \}\
    \}\
  \}\
\
  const interpretation = interpretSins()\
  const allQuestionsAnswered = Object.values(answers).every(a => a !== null)\
\
  return (\
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">\
      <h2 className="text-2xl font-bold text-center mb-6">\
        Score d'Instabilit\'e9 N\'e9oplasique du Rachis (SINS)\
      </h2>\
\
      <div className="space-y-6">\
        \{/* Location */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">Localisation</h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="location"\
              value="3"\
              checked=\{answers.location === 3\}\
              onChange=\{() => handleChange("location", 3)\}\
              label="Jonctionnelle (O-C2; C7-T2; T11-L1; L5-S1)"\
            />\
            <RadioOption\
              name="location"\
              value="2"\
              checked=\{answers.location === 2\}\
              onChange=\{() => handleChange("location", 2)\}\
              label="Mobile (C3-6; L2-4)"\
            />\
            <RadioOption\
              name="location"\
              value="1"\
              checked=\{answers.location === 1\}\
              onChange=\{() => handleChange("location", 1)\}\
              label="Semi-rigide (T3-10)"\
            />\
            <RadioOption\
              name="location"\
              value="0"\
              checked=\{answers.location === 0\}\
              onChange=\{() => handleChange("location", 0)\}\
              label="Rigide (S2-S5)"\
            />\
          </div>\
        </div>\
\
        \{/* Pain */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">Douleur m\'e9canique</h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="pain"\
              value="3"\
              checked=\{answers.pain === 3\}\
              onChange=\{() => handleChange("pain", 3)\}\
              label="Oui"\
            />\
            <RadioOption\
              name="pain"\
              value="2"\
              checked=\{answers.pain === 2\}\
              onChange=\{() => handleChange("pain", 2)\}\
              label="Non"\
            />\
            <RadioOption\
              name="pain"\
              value="1"\
              checked=\{answers.pain === 1\}\
              onChange=\{() => handleChange("pain", 1)\}\
              label="L\'e9sion indolore"\
            />\
          </div>\
        </div>\
\
        \{/* Bone Lesion */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">Type de l\'e9sion osseuse</h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="boneType"\
              value="2"\
              checked=\{answers.boneType === 2\}\
              onChange=\{() => handleChange("boneType", 2)\}\
              label="Lytique"\
            />\
            <RadioOption\
              name="boneType"\
              value="1"\
              checked=\{answers.boneType === 1\}\
              onChange=\{() => handleChange("boneType", 1)\}\
              label="Mixte (lytique/blastique)"\
            />\
            <RadioOption\
              name="boneType"\
              value="0"\
              checked=\{answers.boneType === 0\}\
              onChange=\{() => handleChange("boneType", 0)\}\
              label="Blastique"\
            />\
          </div>\
        </div>\
\
        \{/* Alignment */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">\
            Alignement radiographique du rachis\
          </h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="alignment"\
              value="4"\
              checked=\{answers.alignment === 4\}\
              onChange=\{() => handleChange("alignment", 4)\}\
              label="Subluxation/translation pr\'e9sente"\
            />\
            <RadioOption\
              name="alignment"\
              value="2"\
              checked=\{answers.alignment === 2\}\
              onChange=\{() => handleChange("alignment", 2)\}\
              label="D\'e9formation (cyphose/scoliose)"\
            />\
            <RadioOption\
              name="alignment"\
              value="0"\
              checked=\{answers.alignment === 0\}\
              onChange=\{() => handleChange("alignment", 0)\}\
              label="Normal"\
            />\
          </div>\
        </div>\
\
        \{/* Vertebral Body Collapse */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">\
            Effondrement du corps vert\'e9bral\
          </h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="collapse"\
              value="3"\
              checked=\{answers.collapse === 3\}\
              onChange=\{() => handleChange("collapse", 3)\}\
              label=">50% d'effondrement"\
            />\
            <RadioOption\
              name="collapse"\
              value="2"\
              checked=\{answers.collapse === 2\}\
              onChange=\{() => handleChange("collapse", 2)\}\
              label="<50% d'effondrement"\
            />\
            <RadioOption\
              name="collapse"\
              value="1"\
              checked=\{answers.collapse === 1\}\
              onChange=\{() => handleChange("collapse", 1)\}\
              label="Pas d'effondrement avec >50% du corps impliqu\'e9"\
            />\
            <RadioOption\
              name="collapse"\
              value="0"\
              checked=\{answers.collapse === 0\}\
              onChange=\{() => handleChange("collapse", 0)\}\
              label="Aucun des cas ci-dessus"\
            />\
          </div>\
        </div>\
\
        \{/* Posterolateral Involvement */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">Atteinte post\'e9rolat\'e9rale</h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="involvement"\
              value="3"\
              checked=\{answers.involvement === 3\}\
              onChange=\{() => handleChange("involvement", 3)\}\
              label="Bilat\'e9rale"\
            />\
            <RadioOption\
              name="involvement"\
              value="1"\
              checked=\{answers.involvement === 1\}\
              onChange=\{() => handleChange("involvement", 1)\}\
              label="Unilat\'e9rale"\
            />\
            <RadioOption\
              name="involvement"\
              value="0"\
              checked=\{answers.involvement === 0\}\
              onChange=\{() => handleChange("involvement", 0)\}\
              label="Aucune des deux"\
            />\
          </div>\
        </div>\
\
        \{/* Results */\}\
        <div className="mt-8">\
          <div className="flex justify-between items-center mb-4">\
            <h3 className="text-xl font-bold">Score SINS total:</h3>\
            <span className="text-2xl font-bold">\{sinsScore\}</span>\
          </div>\
\
          \{allQuestionsAnswered && (\
            <div\
              className=\{`p-4 rounded-lg border $\{interpretation.class\} mt-4`\}\
            >\
              <h4 className="font-bold mb-2">Interpr\'e9tation:</h4>\
              <p className="font-semibold">\
                Stabilit\'e9: \{interpretation.stability\}\
              </p>\
              <p className="mt-1">\
                Recommandation: \{interpretation.recommendation\}\
              </p>\
              <div className="mt-4 text-sm">\
                <p className="italic">\
                  Note: Ce score est un outil d'aide \'e0 la d\'e9cision et ne\
                  remplace pas le jugement clinique. Consultez toujours un\
                  sp\'e9cialiste pour une \'e9valuation compl\'e8te.\
                </p>\
              </div>\
            </div>\
          )\}\
        </div>\
\
        \{/* Navigation Button */\}\
        <div className="flex justify-center mt-8">\
          <button\
            onClick=\{goHome\}\
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"\
          >\
            Retour \'e0 l'accueil\
          </button>\
        </div>\
      </div>\
    </div>\
  )\
\}\
\
// Revised Tokuhashi Score (RTS) Screen\
const RTSScreen = (\{ rtsScore, setRtsScore, goHome \}) => \{\
  const [answers, setAnswers] = useState(\{\
    generalCondition: null,\
    extraspinalMets: null,\
    spinalMets: null,\
    organMets: null,\
    primarySite: null,\
    palsy: null\
  \})\
\
  // Calculate score whenever answers change\
  React.useEffect(() => \{\
    const total = Object.values(answers).reduce(\
      (sum, value) => sum + (value !== null ? value : 0),\
      0\
    )\
    setRtsScore(total)\
  \}, [answers, setRtsScore])\
\
  const handleChange = (category, value) => \{\
    setAnswers(prev => (\{ ...prev, [category]: parseInt(value) \}))\
  \}\
\
  // Interpret RTS score\
  const interpretRts = () => \{\
    if (rtsScore >= 12) \{\
      return \{\
        survival: "Plus de 12 mois",\
        recommendation:\
          "Traitement chirurgical avec intention curative si techniquement faisable.",\
        class: "bg-green-100 border-green-500 text-green-800"\
      \}\
    \} else if (rtsScore >= 9) \{\
      return \{\
        survival: "6 \'e0 12 mois",\
        recommendation:\
          "Traitement chirurgical palliatif. Consid\'e9rer une d\'e9compression avec stabilisation.",\
        class: "bg-yellow-100 border-yellow-500 text-yellow-800"\
      \}\
    \} else \{\
      return \{\
        survival: "Moins de 6 mois",\
        recommendation:\
          "Traitement conservateur ou radioth\'e9rapie seule. Chirurgie uniquement en cas de compression m\'e9dullaire aigu\'eb en l'absence d'autres options.",\
        class: "bg-red-100 border-red-500 text-red-800"\
      \}\
    \}\
  \}\
\
  const interpretation = interpretRts()\
  const allQuestionsAnswered = Object.values(answers).every(a => a !== null)\
\
  return (\
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">\
      <h2 className="text-2xl font-bold text-center mb-6">\
        Score de Tokuhashi R\'e9vis\'e9 (RTS)\
      </h2>\
\
      <div className="space-y-6">\
        \{/* General Condition */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">\
            \'c9tat g\'e9n\'e9ral (statut de performance)\
          </h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="generalCondition"\
              value="0"\
              checked=\{answers.generalCondition === 0\}\
              onChange=\{() => handleChange("generalCondition", 0)\}\
              label="Mauvais (PS 10-40%)"\
            />\
            <RadioOption\
              name="generalCondition"\
              value="1"\
              checked=\{answers.generalCondition === 1\}\
              onChange=\{() => handleChange("generalCondition", 1)\}\
              label="Mod\'e9r\'e9 (PS 50-70%)"\
            />\
            <RadioOption\
              name="generalCondition"\
              value="2"\
              checked=\{answers.generalCondition === 2\}\
              onChange=\{() => handleChange("generalCondition", 2)\}\
              label="Bon (PS 80-100%)"\
            />\
          </div>\
        </div>\
\
        \{/* Extraspinal Bone Metastases */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">\
            Nombre de foyers m\'e9tastatiques osseux extrarachidiens\
          </h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="extraspinalMets"\
              value="0"\
              checked=\{answers.extraspinalMets === 0\}\
              onChange=\{() => handleChange("extraspinalMets", 0)\}\
              label="\uc0\u8805 3"\
            />\
            <RadioOption\
              name="extraspinalMets"\
              value="1"\
              checked=\{answers.extraspinalMets === 1\}\
              onChange=\{() => handleChange("extraspinalMets", 1)\}\
              label="1-2"\
            />\
            <RadioOption\
              name="extraspinalMets"\
              value="2"\
              checked=\{answers.extraspinalMets === 2\}\
              onChange=\{() => handleChange("extraspinalMets", 2)\}\
              label="0"\
            />\
          </div>\
        </div>\
\
        \{/* Spinal Metastases */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">\
            Nombre de m\'e9tastases dans le corps vert\'e9bral\
          </h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="spinalMets"\
              value="0"\
              checked=\{answers.spinalMets === 0\}\
              onChange=\{() => handleChange("spinalMets", 0)\}\
              label="\uc0\u8805 3"\
            />\
            <RadioOption\
              name="spinalMets"\
              value="1"\
              checked=\{answers.spinalMets === 1\}\
              onChange=\{() => handleChange("spinalMets", 1)\}\
              label="1-2"\
            />\
            <RadioOption\
              name="spinalMets"\
              value="2"\
              checked=\{answers.spinalMets === 2\}\
              onChange=\{() => handleChange("spinalMets", 2)\}\
              label="0"\
            />\
          </div>\
        </div>\
\
        \{/* Metastases to Major Internal Organs */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">\
            M\'e9tastases aux organes internes majeurs\
          </h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="organMets"\
              value="0"\
              checked=\{answers.organMets === 0\}\
              onChange=\{() => handleChange("organMets", 0)\}\
              label="Non r\'e9s\'e9cables"\
            />\
            <RadioOption\
              name="organMets"\
              value="1"\
              checked=\{answers.organMets === 1\}\
              onChange=\{() => handleChange("organMets", 1)\}\
              label="R\'e9s\'e9cables"\
            />\
            <RadioOption\
              name="organMets"\
              value="2"\
              checked=\{answers.organMets === 2\}\
              onChange=\{() => handleChange("organMets", 2)\}\
              label="Aucune"\
            />\
          </div>\
        </div>\
\
        \{/* Primary Site of Cancer */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">Site primaire du cancer</h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="primarySite"\
              value="0"\
              checked=\{answers.primarySite === 0\}\
              onChange=\{() => handleChange("primarySite", 0)\}\
              label="Poumon, ost\'e9osarcome, estomac, vessie, \'9csophage, pancr\'e9as"\
            />\
            <RadioOption\
              name="primarySite"\
              value="1"\
              checked=\{answers.primarySite === 1\}\
              onChange=\{() => handleChange("primarySite", 1)\}\
              label="Foie, v\'e9sicule biliaire, non identifi\'e9"\
            />\
            <RadioOption\
              name="primarySite"\
              value="2"\
              checked=\{answers.primarySite === 2\}\
              onChange=\{() => handleChange("primarySite", 2)\}\
              label="Autres"\
            />\
            <RadioOption\
              name="primarySite"\
              value="3"\
              checked=\{answers.primarySite === 3\}\
              onChange=\{() => handleChange("primarySite", 3)\}\
              label="Rein, ut\'e9rus"\
            />\
            <RadioOption\
              name="primarySite"\
              value="4"\
              checked=\{answers.primarySite === 4\}\
              onChange=\{() => handleChange("primarySite", 4)\}\
              label="Rectum"\
            />\
            <RadioOption\
              name="primarySite"\
              value="5"\
              checked=\{answers.primarySite === 5\}\
              onChange=\{() => handleChange("primarySite", 5)\}\
              label="Thyro\'efde, sein, prostate, tumeur carcino\'efde"\
            />\
          </div>\
        </div>\
\
        \{/* Palsy */\}\
        <div className="border-b pb-4">\
          <h3 className="font-semibold mb-2">Paralysie</h3>\
          <div className="space-y-2">\
            <RadioOption\
              name="palsy"\
              value="0"\
              checked=\{answers.palsy === 0\}\
              onChange=\{() => handleChange("palsy", 0)\}\
              label="Compl\'e8te (Frankel A, B)"\
            />\
            <RadioOption\
              name="palsy"\
              value="1"\
              checked=\{answers.palsy === 1\}\
              onChange=\{() => handleChange("palsy", 1)\}\
              label="Incompl\'e8te (Frankel C, D)"\
            />\
            <RadioOption\
              name="palsy"\
              value="2"\
              checked=\{answers.palsy === 2\}\
              onChange=\{() => handleChange("palsy", 2)\}\
              label="Aucune (Frankel E)"\
            />\
          </div>\
        </div>\
\
        \{/* Results */\}\
        <div className="mt-8">\
          <div className="flex justify-between items-center mb-4">\
            <h3 className="text-xl font-bold">Score RTS total:</h3>\
            <span className="text-2xl font-bold">\{rtsScore\}</span>\
          </div>\
\
          \{allQuestionsAnswered && (\
            <div\
              className=\{`p-4 rounded-lg border $\{interpretation.class\} mt-4`\}\
            >\
              <h4 className="font-bold mb-2">Interpr\'e9tation:</h4>\
              <p className="font-semibold">\
                Survie estim\'e9e: \{interpretation.survival\}\
              </p>\
              <p className="mt-1">\
                Recommandation: \{interpretation.recommendation\}\
              </p>\
              <div className="mt-4 text-sm">\
                <p className="italic">\
                  Note: Ce score est un outil pronostique et d'aide \'e0 la\
                  d\'e9cision. La prise en charge doit \'eatre individualis\'e9e selon le\
                  contexte clinique.\
                </p>\
              </div>\
            </div>\
          )\}\
        </div>\
\
        \{/* Navigation Button */\}\
        <div className="flex justify-center mt-8">\
          <button\
            onClick=\{goHome\}\
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"\
          >\
            Retour \'e0 l'accueil\
          </button>\
        </div>\
      </div>\
    </div>\
  )\
\}\
\
// ESCC (Bilsky) Score Screen\
const ESCCScreen = (\{ esccGrade, setEsccGrade, goHome \}) => \{\
  const handleGradeSelect = grade => \{\
    setEsccGrade(grade)\
  \}\
\
  // Interpret ESCC grade\
  const interpretEscc = () => \{\
    switch (esccGrade) \{\
      case 0:\
        return \{\
          description: "Pas de maladie \'e9pidural m\'e9tastatique",\
          recommendation:\
            "Surveillance et traitement syst\'e9mique selon l'indication primaire.",\
          class: "bg-green-100 border-green-500 text-green-800"\
        \}\
      case "1a":\
        return \{\
          description:\
            "Maladie \'e9pidurale m\'e9tastatique sans indentation du sac dural",\
          recommendation:\
            "Consid\'e9rer une radioth\'e9rapie pr\'e9ventive. Surveillance rapproch\'e9e.",\
          class: "bg-green-100 border-green-500 text-green-800"\
        \}\
      case "1b":\
        return \{\
          description:\
            "Maladie \'e9pidurale m\'e9tastatique avec indentation du sac dural, sans contact avec la moelle \'e9pini\'e8re",\
          recommendation:\
            "Radioth\'e9rapie recommand\'e9e. \'c9valuation neurologique r\'e9guli\'e8re.",\
          class: "bg-yellow-100 border-yellow-500 text-yellow-800"\
        \}\
      case "1c":\
        return \{\
          description:\
            "Maladie \'e9pidurale m\'e9tastatique touchant la moelle \'e9pini\'e8re sans compression ni d\'e9placement",\
          recommendation:\
            "Radioth\'e9rapie urgente. Consid\'e9rer une d\'e9compression chirurgicale si progression rapide.",\
          class: "bg-yellow-100 border-yellow-500 text-yellow-800"\
        \}\
      case 2:\
        return \{\
          description:\
            "Compression m\'e9tastatique \'e9pidurale de la moelle \'e9pini\'e8re avec du LCR encore visible au site de compression",\
          recommendation:\
            "D\'e9compression chirurgicale fortement recommand\'e9e, suivie de radioth\'e9rapie. Traitement st\'e9ro\'efdien en urgence.",\
          class: "bg-red-100 border-red-500 text-red-800"\
        \}\
      case 3:\
        return \{\
          description:\
            "Compression m\'e9tastatique \'e9pidurale de la moelle \'e9pini\'e8re sans LCR visible au site de compression",\
          recommendation:\
            "D\'e9compression chirurgicale urgente, suivie de radioth\'e9rapie. Traitement st\'e9ro\'efdien \'e0 haute dose en urgence.",\
          class: "bg-red-100 border-red-500 text-red-800"\
        \}\
      default:\
        return \{\
          description: "",\
          recommendation: "",\
          class: ""\
        \}\
    \}\
  \}\
\
  const interpretation = interpretEscc()\
\
  return (\
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">\
      <h2 className="text-2xl font-bold text-center mb-6">\
        \'c9chelle de Compression \'c9pidurale de la Moelle \'c9pini\'e8re (ESCC) / \'c9chelle\
        de Bilsky\
      </h2>\
\
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">\
        \{/* Grade Images and Selection */\}\
        <div className="flex flex-col">\
          <img\
            src="/api/placeholder/400/300"\
            alt="\'c9chelle de Bilsky"\
            className="w-full h-auto mb-4 rounded-lg"\
          />\
          <p className="text-sm text-gray-600 mb-4">\
            S\'e9lectionnez le grade qui correspond le mieux \'e0 l'image radiologique\
            du patient\
          </p>\
\
          <div className="grid grid-cols-2 gap-2">\
            <GradeButton\
              grade=\{0\}\
              selectedGrade=\{esccGrade\}\
              onClick=\{handleGradeSelect\}\
              label="Grade 0"\
            />\
            <GradeButton\
              grade="1a"\
              selectedGrade=\{esccGrade\}\
              onClick=\{handleGradeSelect\}\
              label="Grade 1a"\
            />\
            <GradeButton\
              grade="1b"\
              selectedGrade=\{esccGrade\}\
              onClick=\{handleGradeSelect\}\
              label="Grade 1b"\
            />\
            <GradeButton\
              grade="1c"\
              selectedGrade=\{esccGrade\}\
              onClick=\{handleGradeSelect\}\
              label="Grade 1c"\
            />\
            <GradeButton\
              grade=\{2\}\
              selectedGrade=\{esccGrade\}\
              onClick=\{handleGradeSelect\}\
              label="Grade 2"\
            />\
            <GradeButton\
              grade=\{3\}\
              selectedGrade=\{esccGrade\}\
              onClick=\{handleGradeSelect\}\
              label="Grade 3"\
            />\
          </div>\
        </div>\
\
        \{/* Description of Grades */\}\
        <div className="bg-gray-50 p-4 rounded-lg">\
          <h3 className="font-bold mb-4">Description des grades</h3>\
          <ul className="space-y-2 text-sm">\
            <li>\
              <span className="font-semibold">Grade 0:</span> Pas de maladie\
              \'e9pidural m\'e9tastatique\
            </li>\
            <li>\
              <span className="font-semibold">Grade 1a:</span> Maladie \'e9pidurale\
              m\'e9tastatique sans indentation du sac dural\
            </li>\
            <li>\
              <span className="font-semibold">Grade 1b:</span> Maladie \'e9pidurale\
              m\'e9tastatique avec indentation du sac dural, sans contact avec la\
              moelle \'e9pini\'e8re\
            </li>\
            <li>\
              <span className="font-semibold">Grade 1c:</span> Maladie \'e9pidurale\
              m\'e9tastatique touchant la moelle \'e9pini\'e8re sans compression ni\
              d\'e9placement\
            </li>\
            <li>\
              <span className="font-semibold">Grade 2:</span> Compression\
              m\'e9tastatique \'e9pidurale de la moelle \'e9pini\'e8re avec du LCR encore\
              visible au site de compression\
            </li>\
            <li>\
              <span className="font-semibold">Grade 3:</span> Compression\
              m\'e9tastatique \'e9pidurale de la moelle \'e9pini\'e8re sans LCR visible au\
              site de compression\
            </li>\
          </ul>\
        </div>\
      </div>\
\
      \{/* Results */\}\
      \{esccGrade !== null && (\
        <div className=\{`p-4 rounded-lg border $\{interpretation.class\} mt-4`\}>\
          <h4 className="font-bold mb-2">\
            Grade s\'e9lectionn\'e9:\{" "\}\
            \{typeof esccGrade === "number"\
              ? `Grade $\{esccGrade\}`\
              : `Grade $\{esccGrade\}`\}\
          </h4>\
          <p className="font-semibold">\{interpretation.description\}</p>\
          <p className="mt-1">\
            Recommandation: \{interpretation.recommendation\}\
          </p>\
          <div className="mt-4 text-sm">\
            <p className="italic">\
              Note: Cette classification guide le traitement mais doit \'eatre\
              int\'e9gr\'e9e aux autres param\'e8tres cliniques pour une d\'e9cision\
              th\'e9rapeutique optimale.\
            </p>\
          </div>\
        </div>\
      )\}\
\
      \{/* Navigation Button */\}\
      <div className="flex justify-center mt-8">\
        <button\
          onClick=\{goHome\}\
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"\
        >\
          Retour \'e0 l'accueil\
        </button>\
      </div>\
    </div>\
  )\
\}\
\
// NOMS Framework Screen\
const NOMSScreen = (\{ nomsData, setNomsData, goHome \}) => \{\
  const handleChange = (category, value) => \{\
    setNomsData(prev => (\{ ...prev, [category]: value \}))\
  \}\
\
  // Generate recommendation based on NOMS data\
  const generateRecommendation = () => \{\
    if (\
      !nomsData.neurologic ||\
      !nomsData.oncologic ||\
      !nomsData.mechanical ||\
      !nomsData.systemic\
    ) \{\
      return null\
    \}\
\
    let recommendation = ""\
    let bgColor = ""\
\
    // Complex decision tree based on NOMS framework\
    if (\
      nomsData.neurologic === "low-grade" &&\
      nomsData.mechanical === "stable"\
    ) \{\
      if (nomsData.oncologic === "radiosensitive") \{\
        recommendation = "Radioth\'e9rapie conventionnelle (cEBRT) recommand\'e9e."\
        bgColor = "bg-green-100 border-green-500 text-green-800"\
      \} else \{\
        recommendation = "Radiochirurgie st\'e9r\'e9otaxique (SRS) recommand\'e9e."\
        bgColor = "bg-green-100 border-green-500 text-green-800"\
      \}\
    \} else if (\
      nomsData.neurologic === "high-grade" &&\
      nomsData.mechanical === "stable"\
    ) \{\
      if (nomsData.oncologic === "radiosensitive") \{\
        recommendation =\
          "Radioth\'e9rapie conventionnelle (cEBRT) recommand\'e9e. Consultation neurochirurgicale pour \'e9valuation."\
        bgColor = "bg-yellow-100 border-yellow-500 text-yellow-800"\
      \} else \{\
        if (nomsData.systemic === "able") \{\
          recommendation =\
            "Chirurgie de s\'e9paration suivie de radiochirurgie st\'e9r\'e9otaxique (SRS) recommand\'e9e."\
          bgColor = "bg-red-100 border-red-500 text-red-800"\
        \} else \{\
          recommendation =\
            "Radiochirurgie st\'e9r\'e9otaxique (SRS) recommand\'e9e. Consid\'e9rer une chirurgie minimalement invasive."\
          bgColor = "bg-yellow-100 border-yellow-500 text-yellow-800"\
        \}\
      \}\
    \} else if (nomsData.mechanical === "unstable") \{\
      if (nomsData.systemic === "able") \{\
        recommendation =\
          "Stabilisation chirurgicale recommand\'e9e, suivie du traitement radioth\'e9rapeutique appropri\'e9."\
        bgColor = "bg-red-100 border-red-500 text-red-800"\
      \} else \{\
        recommendation =\
          "Stabilisation minimalement invasive \'e0 consid\'e9rer. Traitement m\'e9dical optimal et orth\'e8ses."\
        bgColor = "bg-yellow-100 border-yellow-500 text-yellow-800"\
      \}\
    \}\
\
    return \{\
      text: recommendation,\
      class: bgColor\
    \}\
  \}\
\
  const recommendation = generateRecommendation()\
  const allCategoriesSelected = Object.values(nomsData).every(\
    value => value !== null\
  )\
\
  return (\
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">\
      <h2 className="text-2xl font-bold text-center mb-6">Framework NOMS</h2>\
      <p className="text-center text-gray-600 mb-8">\
        Neurologique, Oncologique, M\'e9canique, Syst\'e9mique\
      </p>\
\
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\
        \{/* Neurologic */\}\
        <div className="border p-4 rounded-lg">\
          <h3 className="font-bold text-lg mb-4 text-purple-700">\
            N - Neurologique\
          </h3>\
          <div className="space-y-3">\
            <RadioOption\
              name="neurologic"\
              value="low-grade"\
              checked=\{nomsData.neurologic === "low-grade"\}\
              onChange=\{() => handleChange("neurologic", "low-grade")\}\
              label="ESCC de bas grade - Pas de my\'e9lopathie"\
              description="Grades 0, 1a, 1b de Bilsky"\
            />\
            <RadioOption\
              name="neurologic"\
              value="high-grade"\
              checked=\{nomsData.neurologic === "high-grade"\}\
              onChange=\{() => handleChange("neurologic", "high-grade")\}\
              label="ESCC de haut grade - Avec/sans my\'e9lopathie"\
              description="Grades 1c, 2, 3 de Bilsky"\
            />\
          </div>\
        </div>\
\
        \{/* Oncologic */\}\
        <div className="border p-4 rounded-lg">\
          <h3 className="font-bold text-lg mb-4 text-blue-700">\
            O - Oncologique\
          </h3>\
          <div className="space-y-3">\
            <RadioOption\
              name="oncologic"\
              value="radiosensitive"\
              checked=\{nomsData.oncologic === "radiosensitive"\}\
              onChange=\{() => handleChange("oncologic", "radiosensitive")\}\
              label="Radiosensible"\
              description="Ex: lymphome, my\'e9lome, s\'e9minome, CPPC"\
            />\
            <RadioOption\
              name="oncologic"\
              value="radioresistant"\
              checked=\{nomsData.oncologic === "radioresistant"\}\
              onChange=\{() => handleChange("oncologic", "radioresistant")\}\
              label="Radior\'e9sistant / Pr\'e9c\'e9demment irradi\'e9"\
              description="Ex: sarcome, m\'e9lanome, cancer r\'e9nal"\
            />\
          </div>\
        </div>\
\
        \{/* Mechanical */\}\
        <div className="border p-4 rounded-lg">\
          <h3 className="font-bold text-lg mb-4 text-green-700">\
            M - M\'e9canique\
          </h3>\
          <div className="space-y-3">\
            <RadioOption\
              name="mechanical"\
              value="stable"\
              checked=\{nomsData.mechanical === "stable"\}\
              onChange=\{() => handleChange("mechanical", "stable")\}\
              label="Stable"\
              description="Score SINS < 7"\
            />\
            <RadioOption\
              name="mechanical"\
              value="unstable"\
              checked=\{nomsData.mechanical === "unstable"\}\
              onChange=\{() => handleChange("mechanical", "unstable")\}\
              label="Instable"\
              description="Score SINS \uc0\u8805  7"\
            />\
          </div>\
        </div>\
\
        \{/* Systemic */\}\
        <div className="border p-4 rounded-lg">\
          <h3 className="font-bold text-lg mb-4 text-yellow-700">\
            S - Syst\'e9mique\
          </h3>\
          <div className="space-y-3">\
            <RadioOption\
              name="systemic"\
              value="able"\
              checked=\{nomsData.systemic === "able"\}\
              onChange=\{() => handleChange("systemic", "able")\}\
              label="Capable de tol\'e9rer la chirurgie"\
              description="Bon \'e9tat g\'e9n\'e9ral, comorbidit\'e9s limit\'e9es"\
            />\
            <RadioOption\
              name="systemic"\
              value="unable"\
              checked=\{nomsData.systemic === "unable"\}\
              onChange=\{() => handleChange("systemic", "unable")\}\
              label="Incapable de tol\'e9rer la chirurgie"\
              description="Mauvais \'e9tat g\'e9n\'e9ral, comorbidit\'e9s importantes"\
            />\
          </div>\
        </div>\
      </div>\
\
      \{/* Results */\}\
      \{allCategoriesSelected && recommendation && (\
        <div className=\{`p-4 rounded-lg border $\{recommendation.class\} mt-8`\}>\
          <h4 className="font-bold mb-2">\
            Recommandation bas\'e9e sur le framework NOMS:\
          </h4>\
          <p className="text-lg">\{recommendation.text\}</p>\
          <div className="mt-4 text-sm">\
            <p className="italic">\
              Note: Cette recommandation est bas\'e9e sur le framework NOMS et doit\
              \'eatre adapt\'e9e au contexte clinique sp\'e9cifique du patient.\
            </p>\
          </div>\
        </div>\
      )\}\
\
      \{/* Navigation Button */\}\
      <div className="flex justify-center mt-8">\
        <button\
          onClick=\{goHome\}\
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"\
        >\
          Retour \'e0 l'accueil\
        </button>\
      </div>\
    </div>\
  )\
\}\
\
// Utility Components\
const RadioOption = (\{\
  name,\
  value,\
  checked,\
  onChange,\
  label,\
  description\
\}) => \{\
  return (\
    <div className="flex items-start">\
      <input\
        type="radio"\
        id=\{`$\{name\}-$\{value\}`\}\
        name=\{name\}\
        value=\{value\}\
        checked=\{checked\}\
        onChange=\{onChange\}\
        className="mt-1"\
      />\
      <label htmlFor=\{`$\{name\}-$\{value\}`\} className="ml-2">\
        <span className="font-medium">\{label\}</span>\
        \{description && (\
          <p className="text-sm text-gray-600 mt-1">\{description\}</p>\
        )\}\
      </label>\
    </div>\
  )\
\}\
\
const GradeButton = (\{ grade, selectedGrade, onClick, label \}) => \{\
  const isSelected = grade === selectedGrade\
  return (\
    <button\
      onClick=\{() => onClick(grade)\}\
      className=\{`py-2 px-3 rounded-md transition-colors $\{\
        isSelected\
          ? "bg-blue-600 text-white"\
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"\
      \}`\}\
    >\
      \{label\}\
    </button>\
  )\
\}\
\
export default SpineMetastasisApp\
}