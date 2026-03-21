// Dati tecnici comuni (italiano)
const TECHNICAL_LABELS_IT = {
  city: "Città",
  length: "Lunghezza",
  turns: "Curve",
  firstGp: "Primo GP di Formula 1",
  laps: "Giri di gara",
  lapRecord: "Record pista"
};

// Dati tecnici comuni (inglese)
const TECHNICAL_LABELS_EN = {
  city: "City",
  length: "Length",
  turns: "Turns",
  firstGp: "First F1 GP",
  laps: "Race laps",
  lapRecord: "Lap record"
};


// Albert Park
const TECHNICAL_DATA_ALBERT_PARK_IT = `${TECHNICAL_LABELS_IT.city}: Melbourne, Australia\n${TECHNICAL_LABELS_IT.length}: 5.278 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1996\n${TECHNICAL_LABELS_IT.laps}: 58\n${TECHNICAL_LABELS_IT.lapRecord}: 1:20.260 (2023, Verstappen)`;
const TECHNICAL_DATA_ALBERT_PARK_EN = `${TECHNICAL_LABELS_EN.city}: Melbourne, Australia\n${TECHNICAL_LABELS_EN.length}: 5.278 km\n${TECHNICAL_LABELS_EN.turns}: 14\n${TECHNICAL_LABELS_EN.firstGp}: 1996\n${TECHNICAL_LABELS_EN.laps}: 58\n${TECHNICAL_LABELS_EN.lapRecord}: 1:20.260 (2023, Verstappen)`;

// Monaco
const TECHNICAL_DATA_MONACO_IT = `${TECHNICAL_LABELS_IT.city}: Monte Carlo, Monaco\n${TECHNICAL_LABELS_IT.length}: 3.337 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 78\n${TECHNICAL_LABELS_IT.lapRecord}: 1:12.909 (2021, Hamilton)`;
const TECHNICAL_DATA_MONACO_EN = `${TECHNICAL_LABELS_EN.city}: Monte Carlo, Monaco\n${TECHNICAL_LABELS_EN.length}: 3.337 km\n${TECHNICAL_LABELS_EN.turns}: 19\n${TECHNICAL_LABELS_EN.firstGp}: 1950\n${TECHNICAL_LABELS_EN.laps}: 78\n${TECHNICAL_LABELS_EN.lapRecord}: 1:12.909 (2021, Hamilton)`;

// Silverstone
const TECHNICAL_DATA_SILVERSTONE_IT = `${TECHNICAL_LABELS_IT.city}: Silverstone, Regno Unito\n${TECHNICAL_LABELS_IT.length}: 5.891 km\n${TECHNICAL_LABELS_IT.turns}: 18\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 52\n${TECHNICAL_LABELS_IT.lapRecord}: 1:27.097 (2020, Verstappen)`;
const TECHNICAL_DATA_SILVERSTONE_EN = `${TECHNICAL_LABELS_EN.city}: Silverstone, United Kingdom\n${TECHNICAL_LABELS_EN.length}: 5.891 km\n${TECHNICAL_LABELS_EN.turns}: 18\n${TECHNICAL_LABELS_EN.firstGp}: 1950\n${TECHNICAL_LABELS_EN.laps}: 52\n${TECHNICAL_LABELS_EN.lapRecord}: 1:27.097 (2020, Verstappen)`;

// Spa-Francorchamps
const TECHNICAL_DATA_SPA_IT = `${TECHNICAL_LABELS_IT.city}: Stavelot, Belgio\n${TECHNICAL_LABELS_IT.length}: 7.004 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 44\n${TECHNICAL_LABELS_IT.lapRecord}: 1:46.286 (2018, Bottas)`;
const TECHNICAL_DATA_SPA_EN = `${TECHNICAL_LABELS_EN.city}: Stavelot, Belgium\n${TECHNICAL_LABELS_EN.length}: 7.004 km\n${TECHNICAL_LABELS_EN.turns}: 19\n${TECHNICAL_LABELS_EN.firstGp}: 1950\n${TECHNICAL_LABELS_EN.laps}: 44\n${TECHNICAL_LABELS_EN.lapRecord}: 1:46.286 (2018, Bottas)`;

// Suzuka
const TECHNICAL_DATA_SUZUKA_IT = `${TECHNICAL_LABELS_IT.city}: Suzuka, Giappone\n${TECHNICAL_LABELS_IT.length}: 5.807 km\n${TECHNICAL_LABELS_IT.turns}: 18\n${TECHNICAL_LABELS_IT.firstGp}: 1987\n${TECHNICAL_LABELS_IT.laps}: 53\n${TECHNICAL_LABELS_IT.lapRecord}: 1:30.983 (2019, Hamilton)`;
const TECHNICAL_DATA_SUZUKA_EN = `${TECHNICAL_LABELS_EN.city}: Suzuka, Japan\n${TECHNICAL_LABELS_EN.length}: 5.807 km\n${TECHNICAL_LABELS_EN.turns}: 18\n${TECHNICAL_LABELS_EN.firstGp}: 1987\n${TECHNICAL_LABELS_EN.laps}: 53\n${TECHNICAL_LABELS_EN.lapRecord}: 1:30.983 (2019, Hamilton)`;

// Monza
const TECHNICAL_DATA_MONZA_IT = `${TECHNICAL_LABELS_IT.city}: Monza, Italia\n${TECHNICAL_LABELS_IT.length}: 5.793 km\n${TECHNICAL_LABELS_IT.turns}: 11\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 53\n${TECHNICAL_LABELS_IT.lapRecord}: 1:21.046 (2020, Hamilton)`;
const TECHNICAL_DATA_MONZA_EN = `${TECHNICAL_LABELS_EN.city}: Monza, Italy\n${TECHNICAL_LABELS_EN.length}: 5.793 km\n${TECHNICAL_LABELS_EN.turns}: 11\n${TECHNICAL_LABELS_EN.firstGp}: 1950\n${TECHNICAL_LABELS_EN.laps}: 53\n${TECHNICAL_LABELS_EN.lapRecord}: 1:21.046 (2020, Hamilton)`;

// Shanghai
const TECHNICAL_DATA_SHANGHAI_IT = `${TECHNICAL_LABELS_IT.city}: Shanghai, Cina\n${TECHNICAL_LABELS_IT.length}: 5.451 km\n${TECHNICAL_LABELS_IT.turns}: 16\n${TECHNICAL_LABELS_IT.firstGp}: 2004\n${TECHNICAL_LABELS_IT.laps}: 56\n${TECHNICAL_LABELS_IT.lapRecord}: 1:32.238 (2004, Schumacher)`;
const TECHNICAL_DATA_SHANGHAI_EN = `${TECHNICAL_LABELS_EN.city}: Shanghai, China\n${TECHNICAL_LABELS_EN.length}: 5.451 km\n${TECHNICAL_LABELS_EN.turns}: 16\n${TECHNICAL_LABELS_EN.firstGp}: 2004\n${TECHNICAL_LABELS_EN.laps}: 56\n${TECHNICAL_LABELS_EN.lapRecord}: 1:32.238 (2004, Schumacher)`;

// Bahrain
const TECHNICAL_DATA_BAHRAIN_IT = `${TECHNICAL_LABELS_IT.city}: Sakhir, Bahrain\n${TECHNICAL_LABELS_IT.length}: 5.412 km\n${TECHNICAL_LABELS_IT.turns}: 15\n${TECHNICAL_LABELS_IT.firstGp}: 2004\n${TECHNICAL_LABELS_IT.laps}: 57\n${TECHNICAL_LABELS_IT.lapRecord}: 1:31.447 (2020, Verstappen)`;
const TECHNICAL_DATA_BAHRAIN_EN = `${TECHNICAL_LABELS_EN.city}: Sakhir, Bahrain\n${TECHNICAL_LABELS_EN.length}: 5.412 km\n${TECHNICAL_LABELS_EN.turns}: 15\n${TECHNICAL_LABELS_EN.firstGp}: 2004\n${TECHNICAL_LABELS_EN.laps}: 57\n${TECHNICAL_LABELS_EN.lapRecord}: 1:31.447 (2020, Verstappen)`;

// Jeddah
const TECHNICAL_DATA_JEDDAH_IT = `${TECHNICAL_LABELS_IT.city}: Jeddah, Arabia Saudita\n${TECHNICAL_LABELS_IT.length}: 6.174 km\n${TECHNICAL_LABELS_IT.turns}: 27\n${TECHNICAL_LABELS_IT.firstGp}: 2021\n${TECHNICAL_LABELS_IT.laps}: 50\n${TECHNICAL_LABELS_IT.lapRecord}: 1:30.734 (2021, Hamilton)`;
const TECHNICAL_DATA_JEDDAH_EN = `${TECHNICAL_LABELS_EN.city}: Jeddah, Saudi Arabia\n${TECHNICAL_LABELS_EN.length}: 6.174 km\n${TECHNICAL_LABELS_EN.turns}: 27\n${TECHNICAL_LABELS_EN.firstGp}: 2021\n${TECHNICAL_LABELS_EN.laps}: 50\n${TECHNICAL_LABELS_EN.lapRecord}: 1:30.734 (2021, Hamilton)`;

// Miami
const TECHNICAL_DATA_MIAMI_IT = `${TECHNICAL_LABELS_IT.city}: Miami, USA\n${TECHNICAL_LABELS_IT.length}: 5.412 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 2022\n${TECHNICAL_LABELS_IT.laps}: 57\n${TECHNICAL_LABELS_IT.lapRecord}: 1:29.708 (2022, Hamilton)`;
const TECHNICAL_DATA_MIAMI_EN = `${TECHNICAL_LABELS_EN.city}: Miami, USA\n${TECHNICAL_LABELS_EN.length}: 5.412 km\n${TECHNICAL_LABELS_EN.turns}: 19\n${TECHNICAL_LABELS_EN.firstGp}: 2022\n${TECHNICAL_LABELS_EN.laps}: 57\n${TECHNICAL_LABELS_EN.lapRecord}: 1:29.708 (2022, Hamilton)`;

// Montreal
const TECHNICAL_DATA_MONTREAL_IT = `${TECHNICAL_LABELS_IT.city}: Montreal, Canada\n${TECHNICAL_LABELS_IT.length}: 4.361 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1978\n${TECHNICAL_LABELS_IT.laps}: 70\n${TECHNICAL_LABELS_IT.lapRecord}: 1:13.078 (2019, Bottas)`;
const TECHNICAL_DATA_MONTREAL_EN = `${TECHNICAL_LABELS_EN.city}: Montreal, Canada\n${TECHNICAL_LABELS_EN.length}: 4.361 km\n${TECHNICAL_LABELS_EN.turns}: 14\n${TECHNICAL_LABELS_EN.firstGp}: 1978\n${TECHNICAL_LABELS_EN.laps}: 70\n${TECHNICAL_LABELS_EN.lapRecord}: 1:13.078 (2019, Bottas)`;

// Catalunya
const TECHNICAL_DATA_CATALUNYA_IT = `${TECHNICAL_LABELS_IT.city}: Barcellona, Spagna\n${TECHNICAL_LABELS_IT.length}: 4.657 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1991\n${TECHNICAL_LABELS_IT.laps}: 66\n${TECHNICAL_LABELS_IT.lapRecord}: 1:18.149 (2021, Verstappen)`;
const TECHNICAL_DATA_CATALUNYA_EN = `${TECHNICAL_LABELS_EN.city}: Barcelona, Spain\n${TECHNICAL_LABELS_EN.length}: 4.657 km\n${TECHNICAL_LABELS_EN.turns}: 14\n${TECHNICAL_LABELS_EN.firstGp}: 1991\n${TECHNICAL_LABELS_EN.laps}: 66\n${TECHNICAL_LABELS_EN.lapRecord}: 1:18.149 (2021, Verstappen)`;

// Red Bull Ring
const TECHNICAL_DATA_REDBULLRING_IT = `${TECHNICAL_LABELS_IT.city}: Spielberg, Austria\n${TECHNICAL_LABELS_IT.length}: 4.318 km\n${TECHNICAL_LABELS_IT.turns}: 10\n${TECHNICAL_LABELS_IT.firstGp}: 1970\n${TECHNICAL_LABELS_IT.laps}: 71\n${TECHNICAL_LABELS_IT.lapRecord}: 1:05.619 (2020, Sainz)`;
const TECHNICAL_DATA_REDBULLRING_EN = `${TECHNICAL_LABELS_EN.city}: Spielberg, Austria\n${TECHNICAL_LABELS_EN.length}: 4.318 km\n${TECHNICAL_LABELS_EN.turns}: 10\n${TECHNICAL_LABELS_EN.firstGp}: 1970\n${TECHNICAL_LABELS_EN.laps}: 71\n${TECHNICAL_LABELS_EN.lapRecord}: 1:05.619 (2020, Sainz)`;

// Hungaroring
const TECHNICAL_DATA_HUNGARORING_IT = `${TECHNICAL_LABELS_IT.city}: Budapest, Ungheria\n${TECHNICAL_LABELS_IT.length}: 4.381 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1986\n${TECHNICAL_LABELS_IT.laps}: 70\n${TECHNICAL_LABELS_IT.lapRecord}: 1:16.627 (2020, Hamilton)`;
const TECHNICAL_DATA_HUNGARORING_EN = `${TECHNICAL_LABELS_EN.city}: Budapest, Hungary\n${TECHNICAL_LABELS_EN.length}: 4.381 km\n${TECHNICAL_LABELS_EN.turns}: 14\n${TECHNICAL_LABELS_EN.firstGp}: 1986\n${TECHNICAL_LABELS_EN.laps}: 70\n${TECHNICAL_LABELS_EN.lapRecord}: 1:16.627 (2020, Hamilton)`;

// Zandvoort
const TECHNICAL_DATA_ZANDVOORT_IT = `${TECHNICAL_LABELS_IT.city}: Zandvoort, Paesi Bassi\n${TECHNICAL_LABELS_IT.length}: 4.259 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1952\n${TECHNICAL_LABELS_IT.laps}: 72\n${TECHNICAL_LABELS_IT.lapRecord}: 1:11.097 (2021, Hamilton)`;
const TECHNICAL_DATA_ZANDVOORT_EN = `${TECHNICAL_LABELS_EN.city}: Zandvoort, Netherlands\n${TECHNICAL_LABELS_EN.length}: 4.259 km\n${TECHNICAL_LABELS_EN.turns}: 14\n${TECHNICAL_LABELS_EN.firstGp}: 1952\n${TECHNICAL_LABELS_EN.laps}: 72\n${TECHNICAL_LABELS_EN.lapRecord}: 1:11.097 (2021, Hamilton)`;

// Madrid (dati ipotetici, circuito nuovo)
const TECHNICAL_DATA_MADRID_IT = `${TECHNICAL_LABELS_IT.city}: Madrid, Spagna\n${TECHNICAL_LABELS_IT.length}: 5.474 km\n${TECHNICAL_LABELS_IT.turns}: 20\n${TECHNICAL_LABELS_IT.firstGp}: 2026\n${TECHNICAL_LABELS_IT.laps}: 70\n${TECHNICAL_LABELS_IT.lapRecord}: -`;
const TECHNICAL_DATA_MADRID_EN = `${TECHNICAL_LABELS_EN.city}: Madrid, Spain\n${TECHNICAL_LABELS_EN.length}: 5.474 km\n${TECHNICAL_LABELS_EN.turns}: 20\n${TECHNICAL_LABELS_EN.firstGp}: 2026\n${TECHNICAL_LABELS_EN.laps}: 70\n${TECHNICAL_LABELS_EN.lapRecord}: -`;

// Baku
const TECHNICAL_DATA_BAKU_IT = `${TECHNICAL_LABELS_IT.city}: Baku, Azerbaigian\n${TECHNICAL_LABELS_IT.length}: 6.003 km\n${TECHNICAL_LABELS_IT.turns}: 20\n${TECHNICAL_LABELS_IT.firstGp}: 2016\n${TECHNICAL_LABELS_IT.laps}: 51\n${TECHNICAL_LABELS_IT.lapRecord}: 1:43.009 (2019, Leclerc)`;
const TECHNICAL_DATA_BAKU_EN = `${TECHNICAL_LABELS_EN.city}: Baku, Azerbaijan\n${TECHNICAL_LABELS_EN.length}: 6.003 km\n${TECHNICAL_LABELS_EN.turns}: 20\n${TECHNICAL_LABELS_EN.firstGp}: 2016\n${TECHNICAL_LABELS_EN.laps}: 51\n${TECHNICAL_LABELS_EN.lapRecord}: 1:43.009 (2019, Leclerc)`;

// Singapore
const TECHNICAL_DATA_SINGAPORE_IT = `${TECHNICAL_LABELS_IT.city}: Singapore\n${TECHNICAL_LABELS_IT.length}: 4.940 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 2008\n${TECHNICAL_LABELS_IT.laps}: 62\n${TECHNICAL_LABELS_IT.lapRecord}: 1:35.867 (2023, Hamilton)`;
const TECHNICAL_DATA_SINGAPORE_EN = `${TECHNICAL_LABELS_EN.city}: Singapore\n${TECHNICAL_LABELS_EN.length}: 4.940 km\n${TECHNICAL_LABELS_EN.turns}: 19\n${TECHNICAL_LABELS_EN.firstGp}: 2008\n${TECHNICAL_LABELS_EN.laps}: 62\n${TECHNICAL_LABELS_EN.lapRecord}: 1:35.867 (2023, Hamilton)`;

// Austin
const TECHNICAL_DATA_AUSTIN_IT = `${TECHNICAL_LABELS_IT.city}: Austin, USA\n${TECHNICAL_LABELS_IT.length}: 5.513 km\n${TECHNICAL_LABELS_IT.turns}: 20\n${TECHNICAL_LABELS_IT.firstGp}: 2012\n${TECHNICAL_LABELS_IT.laps}: 56\n${TECHNICAL_LABELS_IT.lapRecord}: 1:36.169 (2019, Leclerc)`;
const TECHNICAL_DATA_AUSTIN_EN = `${TECHNICAL_LABELS_EN.city}: Austin, USA\n${TECHNICAL_LABELS_EN.length}: 5.513 km\n${TECHNICAL_LABELS_EN.turns}: 20\n${TECHNICAL_LABELS_EN.firstGp}: 2012\n${TECHNICAL_LABELS_EN.laps}: 56\n${TECHNICAL_LABELS_EN.lapRecord}: 1:36.169 (2019, Leclerc)`;

// Messico
const TECHNICAL_DATA_MEXICO_IT = `${TECHNICAL_LABELS_IT.city}: Città del Messico, Messico\n${TECHNICAL_LABELS_IT.length}: 4.304 km\n${TECHNICAL_LABELS_IT.turns}: 17\n${TECHNICAL_LABELS_IT.firstGp}: 1963\n${TECHNICAL_LABELS_IT.laps}: 71\n${TECHNICAL_LABELS_IT.lapRecord}: 1:17.774 (2019, Bottas)`;
const TECHNICAL_DATA_MEXICO_EN = `${TECHNICAL_LABELS_EN.city}: Mexico City, Mexico\n${TECHNICAL_LABELS_EN.length}: 4.304 km\n${TECHNICAL_LABELS_EN.turns}: 17\n${TECHNICAL_LABELS_EN.firstGp}: 1963\n${TECHNICAL_LABELS_EN.laps}: 71\n${TECHNICAL_LABELS_EN.lapRecord}: 1:17.774 (2019, Bottas)`;

// Interlagos
const TECHNICAL_DATA_INTERLAGOS_IT = `${TECHNICAL_LABELS_IT.city}: San Paolo, Brasile\n${TECHNICAL_LABELS_IT.length}: 4.309 km\n${TECHNICAL_LABELS_IT.turns}: 15\n${TECHNICAL_LABELS_IT.firstGp}: 1973\n${TECHNICAL_LABELS_IT.laps}: 71\n${TECHNICAL_LABELS_IT.lapRecord}: 1:10.540 (2018, Bottas)`;
const TECHNICAL_DATA_INTERLAGOS_EN = `${TECHNICAL_LABELS_EN.city}: São Paulo, Brazil\n${TECHNICAL_LABELS_EN.length}: 4.309 km\n${TECHNICAL_LABELS_EN.turns}: 15\n${TECHNICAL_LABELS_EN.firstGp}: 1973\n${TECHNICAL_LABELS_EN.laps}: 71\n${TECHNICAL_LABELS_EN.lapRecord}: 1:10.540 (2018, Bottas)`;

// Las Vegas
const TECHNICAL_DATA_LASVEGAS_IT = `${TECHNICAL_LABELS_IT.city}: Las Vegas, USA\n${TECHNICAL_LABELS_IT.length}: 6.201 km\n${TECHNICAL_LABELS_IT.turns}: 17\n${TECHNICAL_LABELS_IT.firstGp}: 2023\n${TECHNICAL_LABELS_IT.laps}: 50\n${TECHNICAL_LABELS_IT.lapRecord}: 1:35.490 (2023, Hamilton)`;
const TECHNICAL_DATA_LASVEGAS_EN = `${TECHNICAL_LABELS_EN.city}: Las Vegas, USA\n${TECHNICAL_LABELS_EN.length}: 6.201 km\n${TECHNICAL_LABELS_EN.turns}: 17\n${TECHNICAL_LABELS_EN.firstGp}: 2023\n${TECHNICAL_LABELS_EN.laps}: 50\n${TECHNICAL_LABELS_EN.lapRecord}: 1:35.490 (2023, Hamilton)`;

// Lusail
const TECHNICAL_DATA_LUSAIL_IT = `${TECHNICAL_LABELS_IT.city}: Lusail, Qatar\n${TECHNICAL_LABELS_IT.length}: 5.419 km\n${TECHNICAL_LABELS_IT.turns}: 16\n${TECHNICAL_LABELS_IT.firstGp}: 2021\n${TECHNICAL_LABELS_IT.laps}: 57\n${TECHNICAL_LABELS_IT.lapRecord}: 1:24.319 (2023, Verstappen)`;
const TECHNICAL_DATA_LUSAIL_EN = `${TECHNICAL_LABELS_EN.city}: Lusail, Qatar\n${TECHNICAL_LABELS_EN.length}: 5.419 km\n${TECHNICAL_LABELS_EN.turns}: 16\n${TECHNICAL_LABELS_EN.firstGp}: 2021\n${TECHNICAL_LABELS_EN.laps}: 57\n${TECHNICAL_LABELS_EN.lapRecord}: 1:24.319 (2023, Verstappen)`;

// Yas Marina
const TECHNICAL_DATA_YASMARINA_IT = `${TECHNICAL_LABELS_IT.city}: Abu Dhabi, Emirati Arabi Uniti\n${TECHNICAL_LABELS_IT.length}: 5.281 km\n${TECHNICAL_LABELS_IT.turns}: 16\n${TECHNICAL_LABELS_IT.firstGp}: 2009\n${TECHNICAL_LABELS_IT.laps}: 58\n${TECHNICAL_LABELS_IT.lapRecord}: 1:26.103 (2021, Verstappen)`;
const TECHNICAL_DATA_YASMARINA_EN = `${TECHNICAL_LABELS_EN.city}: Abu Dhabi, United Arab Emirates\n${TECHNICAL_LABELS_EN.length}: 5.281 km\n${TECHNICAL_LABELS_EN.turns}: 16\n${TECHNICAL_LABELS_EN.firstGp}: 2009\n${TECHNICAL_LABELS_EN.laps}: 58\n${TECHNICAL_LABELS_EN.lapRecord}: 1:26.103 (2021, Verstappen)`;

// Marina Bay
const TECHNICAL_DATA_MARINABAY_IT = `${TECHNICAL_LABELS_IT.city}: Singapore\n${TECHNICAL_LABELS_IT.length}: \n${TECHNICAL_LABELS_IT.turns}: \n${TECHNICAL_LABELS_IT.firstGp}: \n${TECHNICAL_LABELS_IT.laps}: \n${TECHNICAL_LABELS_IT.lapRecord}: `;
const TECHNICAL_DATA_MARINABAY_EN = `${TECHNICAL_LABELS_EN.city}: Singapore\n${TECHNICAL_LABELS_EN.length}: \n${TECHNICAL_LABELS_EN.turns}: \n${TECHNICAL_LABELS_EN.firstGp}: \n${TECHNICAL_LABELS_EN.laps}: \n${TECHNICAL_LABELS_EN.lapRecord}: `;

// Aggiungi qui eventuali altri circuiti...

const CIRCUIT_STORIES = {
    albert_park: {
        it: {
          headline: "Il ritorno della Formula 1 a Melbourne",
          technicalData: TECHNICAL_DATA_ALBERT_PARK_IT,
          presentation: "Albert Park è il circuito cittadino di Melbourne, spesso sede della gara inaugurale della stagione. Il tracciato si snoda attorno al lago e offre un mix di curve veloci e sezioni tecniche.",
          trackFeatures: "La pista alterna tratti veloci a curve strette, richiedendo un buon bilanciamento della monoposto.",
          overtakingSpots: "Curva 1 – frenata dopo il rettilineo principale.\nCurva 3 – seconda opportunità di sorpasso.",
          iconicCorners: "Curva 11-12 – sequenza veloce tra i cordoli.",
          historicalMoments: "1996 – primo GP a Melbourne.\n2009 – vittoria di Jenson Button con Brawn GP.",
          curiosities: "Il circuito è temporaneo e viene smontato dopo la gara."
        },
        en: {
          headline: "Formula 1 returns to Melbourne",
          technicalData: TECHNICAL_DATA_ALBERT_PARK_EN,
          presentation: "Albert Park is Melbourne's street circuit, often hosting the season opener. The track winds around the lake and offers a mix of fast corners and technical sections.",
          trackFeatures: "The circuit alternates fast sections with tight corners, requiring good car balance.",
          overtakingSpots: "Turn 1 – braking after the main straight.\nTurn 3 – second overtaking opportunity.",
          iconicCorners: "Turns 11-12 – fast sequence over the curbs.",
          historicalMoments: "1996 – first GP in Melbourne.\n2009 – Jenson Button wins with Brawn GP.",
          curiosities: "The circuit is temporary and dismantled after the race."
        },
        es: {
          headline: "El regreso de la Fórmula 1 a Melbourne",
          technicalData: TECHNICAL_DATA_ALBERT_PARK_EN,
          presentation: "Albert Park es el circuito urbano de Melbourne, a menudo sede de la primera carrera de la temporada. El trazado rodea el lago y ofrece una mezcla de curvas rápidas y zonas técnicas.",
          trackFeatures: "La pista alterna tramos rápidos con curvas cerradas, requiriendo buen equilibrio del coche.",
          overtakingSpots: "Curva 1 – frenada tras la recta principal.\nCurva 3 – segunda oportunidad de adelantamiento.",
          iconicCorners: "Curvas 11-12 – secuencia rápida sobre los pianos.",
          historicalMoments: "1996 – primer GP en Melbourne.\n2009 – victoria de Jenson Button con Brawn GP.",
          curiosities: "El circuito es temporal y se desmonta tras la carrera."
        },
        fr: {
          headline: "Le retour de la Formule 1 à Melbourne",
          technicalData: TECHNICAL_DATA_ALBERT_PARK_EN,
          presentation: "Albert Park est le circuit urbain de Melbourne, souvent hôte de la première course de la saison. Le tracé contourne le lac et offre un mélange de virages rapides et de sections techniques.",
          trackFeatures: "La piste alterne des parties rapides avec des virages serrés, nécessitant un bon équilibre de la voiture.",
          overtakingSpots: "Virage 1 – freinage après la ligne droite principale.\nVirage 3 – deuxième opportunité de dépassement.",
          iconicCorners: "Virages 11-12 – séquence rapide sur les vibreurs.",
          historicalMoments: "1996 – premier GP à Melbourne.\n2009 – victoire de Jenson Button avec Brawn GP.",
          curiosities: "Le circuit est temporaire et démonté après la course."
        },
        de: {
          headline: "Formel-1-Rückkehr nach Melbourne",
          technicalData: TECHNICAL_DATA_ALBERT_PARK_EN,
          presentation: "Albert Park ist der Stadtkurs von Melbourne und oft Austragungsort des Saisonauftakts. Die Strecke führt um den See und bietet eine Mischung aus schnellen Kurven und technischen Abschnitten.",
          trackFeatures: "Die Strecke wechselt zwischen schnellen Abschnitten und engen Kurven und verlangt ein gutes Fahrzeugsetup.",
          overtakingSpots: "Kurve 1 – Bremsen nach der Hauptgeraden.\nKurve 3 – zweite Überholmöglichkeit.",
          iconicCorners: "Kurven 11-12 – schnelle Sequenz über die Curbs.",
          historicalMoments: "1996 – erstes GP in Melbourne.\n2009 – Jenson Button gewinnt mit Brawn GP.",
          curiosities: "Die Strecke ist temporär und wird nach dem Rennen abgebaut."
        }
      },
    shanghai: {
        it: {
          headline: "Modernità e sorpassi in Cina",
          technicalData: `${TECHNICAL_LABELS_IT.city}: Shanghai, Cina\n${TECHNICAL_LABELS_IT.length}: 5.451 km\n${TECHNICAL_LABELS_IT.turns}: 16\n${TECHNICAL_LABELS_IT.firstGp}: 2004\n${TECHNICAL_LABELS_IT.laps}: 56`,
          presentation: "Il circuito di Shanghai è uno dei tracciati più moderni del calendario di Formula 1. Il layout è ispirato al carattere cinese ‘上’, che significa ‘salire’, e combina curve lunghe e progressive con lunghi rettilinei che favoriscono i sorpassi.",
          trackFeatures: "La pista è famosa per la prima curva che si stringe progressivamente, mettendo sotto forte stress le gomme anteriori. Il rettilineo opposto è uno dei più lunghi del mondiale e permette alle monoposto di raggiungere velocità molto elevate prima di una frenata molto intensa.",
          overtakingSpots: "Curva 14 – principale zona di sorpasso alla fine del rettilineo posteriore.\nCurva 6 – frenata dopo la prima sezione tecnica.",
          iconicCorners: "Curva 1-2 – curva a spirale che si chiude progressivamente.",
          historicalMoments: "2006 – Michael Schumacher ottiene una delle sue ultime vittorie in Formula 1.\n2018 – Daniel Ricciardo vince con una spettacolare rimonta.",
          curiosities: "Il rettilineo opposto supera 1,3 km di lunghezza.\nIl circuito è stato costruito su un terreno paludoso con migliaia di pali di fondazione.",
        },
      en: {
        headline: "Modernity and overtaking in China",
        technicalData: TECHNICAL_DATA_SHANGHAI_EN,
        presentation: "The Shanghai circuit is one of the most modern tracks in the Formula 1 calendar. Its layout is inspired by the Chinese character '上', meaning 'rise', and combines long, progressive corners with long straights that favor overtaking.",
        trackFeatures: "The track is famous for the first corner, which tightens progressively and puts a lot of stress on the front tires. The back straight is one of the longest in the world championship and allows cars to reach very high speeds before a heavy braking zone.",
        overtakingSpots: "Turn 14 – main overtaking zone at the end of the back straight.\nTurn 6 – braking after the first technical section.",
        iconicCorners: "Turns 1-2 – spiral corner that tightens progressively.",
        historicalMoments: "2006 – Michael Schumacher takes one of his last Formula 1 victories.\n2018 – Daniel Ricciardo wins with a spectacular comeback.",
        curiosities: "The back straight exceeds 1.3 km in length.\nThe circuit was built on marshy land with thousands of foundation piles.",
      },
      es: {
        headline: "Modernidad y adelantamientos en China",
        technicalData: TECHNICAL_DATA_SHANGHAI_EN,
        presentation: "El circuito de Shanghái es uno de los más modernos del calendario de Fórmula 1. Su diseño está inspirado en el carácter chino '上', que significa 'ascender', y combina curvas largas y progresivas con rectas extensas que favorecen los adelantamientos.",
        trackFeatures: "La pista es famosa por la primera curva, que se estrecha progresivamente y pone a prueba los neumáticos delanteros. La recta trasera es una de las más largas del mundial y permite alcanzar velocidades muy altas antes de una fuerte frenada.",
        overtakingSpots: "Curva 14 – principal zona de adelantamiento al final de la recta trasera.\nCurva 6 – frenada tras la primera sección técnica.",
        iconicCorners: "Curvas 1-2 – curva en espiral que se cierra progresivamente.",
        historicalMoments: "2006 – Michael Schumacher logra una de sus últimas victorias en Fórmula 1.\n2018 – Daniel Ricciardo gana con una espectacular remontada.",
        curiosities: "La recta trasera supera los 1,3 km de longitud.\nEl circuito fue construido sobre terreno pantanoso con miles de pilotes de cimentación.",
      },
      fr: {
        headline: "Modernité et dépassements en Chine",
        technicalData: TECHNICAL_DATA_SHANGHAI_EN,
        presentation: "Le circuit de Shanghai est l'un des plus modernes du calendrier de la Formule 1. Son tracé s'inspire du caractère chinois '上', qui signifie 'monter', et combine des virages longs et progressifs avec de longues lignes droites favorisant les dépassements.",
        trackFeatures: "La piste est célèbre pour le premier virage qui se resserre progressivement, mettant à rude épreuve les pneus avant. La ligne droite opposée est l'une des plus longues du championnat et permet d'atteindre des vitesses très élevées avant un freinage intense.",
        overtakingSpots: "Virage 14 – principale zone de dépassement à la fin de la ligne droite arrière.\nVirage 6 – freinage après la première section technique.",
        iconicCorners: "Virages 1-2 – virage en spirale qui se resserre progressivement.",
        historicalMoments: "2006 – Michael Schumacher remporte l'une de ses dernières victoires en Formule 1.\n2018 – Daniel Ricciardo gagne avec une remontée spectaculaire.",
        curiosities: "La ligne droite arrière dépasse 1,3 km de longueur.\nLe circuit a été construit sur un terrain marécageux avec des milliers de pieux de fondation.",
      },
      de: {
        headline: "Modernität und Überholmanöver in China",
        technicalData: TECHNICAL_DATA_SHANGHAI_EN,
        presentation: "Die Strecke in Shanghai ist eine der modernsten im Formel-1-Kalender. Das Layout ist vom chinesischen Zeichen '上' inspiriert, was 'aufsteigen' bedeutet, und kombiniert lange, progressive Kurven mit langen Geraden, die Überholmanöver begünstigen.",
        trackFeatures: "Die Strecke ist berühmt für die erste Kurve, die sich allmählich verengt und die Vorderreifen stark beansprucht. Die Gegengerade ist eine der längsten im Rennkalender und ermöglicht sehr hohe Geschwindigkeiten vor einer harten Bremszone.",
        overtakingSpots: "Kurve 14 – Hauptüberholstelle am Ende der Gegengeraden.\nKurve 6 – Bremsen nach dem ersten technischen Abschnitt.",
        iconicCorners: "Kurven 1-2 – spiralförmige Kurve, die sich allmählich schließt.",
        historicalMoments: "2006 – Michael Schumacher erringt einen seiner letzten Formel-1-Siege.\n2018 – Daniel Ricciardo gewinnt mit einer spektakulären Aufholjagd.",
        curiosities: "Die Gegengerade ist über 1,3 km lang.\nDie Strecke wurde auf sumpfigem Boden mit Tausenden von Fundamentpfählen gebaut.",
      },
    },
    suzuka: {
      it: {
        headline: "Tecnica e ritmo a otto",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Suzuka, Giappone\n${TECHNICAL_LABELS_IT.length}: 5.807 km\n${TECHNICAL_LABELS_IT.turns}: 18\n${TECHNICAL_LABELS_IT.firstGp}: 1987\n${TECHNICAL_LABELS_IT.laps}: 53`,
        presentation: "Suzuka è uno dei circuiti più tecnici e amati dai piloti. Il tracciato è famoso per la sua forma a otto, con una sezione che passa sopra l’altra grazie a un ponte. Le numerose curve veloci rendono questo circuito una vera sfida per piloti e monoposto.",
        trackFeatures: "Il circuito premia il talento e la precisione del pilota. Il primo settore è dominato da una sequenza di curve veloci, mentre il secondo include alcune delle curve più impegnative della stagione.",
        overtakingSpots: "Curva 1 – frenata alla fine del rettilineo principale.\nCasio Triangle – chicane finale prima del traguardo.",
        iconicCorners: "S-Curves – sequenza tecnica che richiede ritmo perfetto.\n130R – una delle curve più veloci e famose della Formula 1.",
        historicalMoments: "1989 – incidente tra Ayrton Senna e Alain Prost nella lotta per il titolo.\n2000 – Michael Schumacher conquista il suo primo titolo mondiale con Ferrari.",
        curiosities: "Suzuka è uno dei pochi circuiti al mondo con un layout a forma di otto.\nMolti piloti lo considerano uno dei circuiti più belli da guidare.",
      },
      en: {
        headline: "Technical flow and qualifying rhythm",
        technicalData: TECHNICAL_DATA_SUZUKA_EN,
        presentation: "Suzuka is the only figure-eight circuit in F1. It is much loved by drivers for its flow and fast corners.",
        trackFeatures: "Sequences of fast corners like the opening S, quick direction changes and a technical final section. Requires great precision.",
        overtakingSpots: "The turn 1 braking zone and the Casio chicane are the best overtaking spots.",
        iconicCorners: "The Suzuka S, Spoon, 130R and Casio chicane are among the most iconic.",
        historicalMoments: "1989-1990 – Senna vs Prost clashes. 2005 – Raikkonen's comeback. 2014 – Race stopped for rain and Bianchi's accident.",
        curiosities: "The circuit is owned by Honda. It often decides world titles.",
      },
      es: {
        headline: "Técnica y ritmo en ocho",
        technicalData: TECHNICAL_DATA_SUZUKA_EN,
        presentation: "Suzuka es uno de los circuitos más técnicos y apreciados por los pilotos. Su trazado es famoso por su forma de ocho, con una sección que pasa sobre otra gracias a un puente. Las numerosas curvas rápidas hacen de este circuito un verdadero desafío para pilotos y monoplazas.",
        trackFeatures: "El circuito premia el talento y la precisión del piloto. El primer sector está dominado por una secuencia de curvas rápidas, mientras que el segundo incluye algunas de las curvas más exigentes de la temporada.",
        overtakingSpots: "Curva 1 – frenada al final de la recta principal.\nCasio Triangle – chicane final antes de la meta.",
        iconicCorners: "S-Curves – secuencia técnica que requiere ritmo perfecto.\n130R – una de las curvas más rápidas y famosas de la Fórmula 1.",
        historicalMoments: "1989 – accidente entre Ayrton Senna y Alain Prost en la lucha por el título.\n2000 – Michael Schumacher conquista su primer título mundial con Ferrari.",
        curiosities: "Suzuka es uno de los pocos circuitos del mundo con un trazado en forma de ocho.\nMuchos pilotos lo consideran uno de los circuitos más bonitos para conducir.",
      },
      fr: {
        headline: "Technique et rythme en huit",
        technicalData: TECHNICAL_DATA_SUZUKA_EN,
        presentation: "Suzuka est l'un des circuits les plus techniques et appréciés des pilotes. Le tracé est célèbre pour sa forme en huit, avec une section passant au-dessus d'une autre grâce à un pont. Les nombreuses courbes rapides font de ce circuit un vrai défi pour pilotes et monoplaces.",
        trackFeatures: "Le circuit récompense le talent et la précision du pilote. Le premier secteur est dominé par une séquence de courbes rapides, tandis que le second inclut certaines des courbes les plus exigeantes de la saison.",
        overtakingSpots: "Virage 1 – freinage en fin de ligne droite principale.\nCasio Triangle – chicane finale avant l'arrivée.",
        iconicCorners: "S-Curves – séquence technique nécessitant un rythme parfait.\n130R – l'un des virages les plus rapides et célèbres de la Formule 1.",
        historicalMoments: "1989 – accident entre Ayrton Senna et Alain Prost dans la lutte pour le titre.\n2000 – Michael Schumacher remporte son premier titre mondial avec Ferrari.",
        curiosities: "Suzuka est l'un des rares circuits au monde avec un tracé en forme de huit.\nDe nombreux pilotes le considèrent comme l'un des plus beaux circuits à piloter.",
      },
      de: {
        headline: "Technik und Rhythmus in der Acht",
        technicalData: TECHNICAL_DATA_SUZUKA_EN,
        presentation: "Suzuka ist einer der technisch anspruchsvollsten und von Fahrern am meisten geschätzten Kurse. Die Strecke ist berühmt für ihre Achtform, wobei ein Abschnitt über einen anderen führt. Die vielen schnellen Kurven machen Suzuka zu einer echten Herausforderung für Fahrer und Autos.",
        trackFeatures: "Die Strecke belohnt Talent und Präzision. Der erste Sektor ist geprägt von einer schnellen Kurvensequenz, der zweite enthält einige der anspruchsvollsten Kurven der Saison.",
        overtakingSpots: "Kurve 1 – Bremspunkt am Ende der Hauptgeraden.\nCasio Triangle – letzte Schikane vor dem Ziel.",
        iconicCorners: "S-Kurven – technische Sequenz, die perfekten Rhythmus erfordert.\n130R – eine der schnellsten und berühmtesten Kurven der Formel 1.",
        historicalMoments: "1989 – Unfall zwischen Ayrton Senna und Alain Prost im Kampf um den Titel.\n2000 – Michael Schumacher gewinnt seinen ersten WM-Titel mit Ferrari.",
        curiosities: "Suzuka ist einer der wenigen Kurse weltweit mit einer Achtform.\nViele Fahrer halten ihn für eine der schönsten Strecken zum Fahren.",
      },
    },
    bahrain: {
      it: {
        headline: "Accelerazioni e sorpassi nel deserto",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Sakhir, Bahrain\n${TECHNICAL_LABELS_IT.length}: 5.412 km\n${TECHNICAL_LABELS_IT.turns}: 15\n${TECHNICAL_LABELS_IT.firstGp}: 2004\n${TECHNICAL_LABELS_IT.laps}: 57`,
        presentation: "Il circuito del Bahrain si trova nel deserto di Sakhir ed è stato il primo Gran Premio di Formula 1 disputato in Medio Oriente. La pista offre lunghe accelerazioni e forti frenate che favoriscono i sorpassi.",
        trackFeatures: "Il layout è caratterizzato da lunghe sezioni a pieno gas seguite da staccate molto violente. Il vento del deserto può portare sabbia sull’asfalto, riducendo il grip.",
        overtakingSpots: "Curva 1 – principale punto di sorpasso del circuito.\nCurva 4 – seconda grande frenata dopo il rettilineo.",
        iconicCorners: "Curva 10 – difficile frenata mentre la pista scende in pendenza.",
        historicalMoments: "2004 – primo Gran Premio di Formula 1 in Medio Oriente.\n2014 – epica battaglia tra Lewis Hamilton e Nico Rosberg.",
        curiosities: "Dal 2014 il Gran Premio si disputa in notturna.\nIl circuito è illuminato da migliaia di proiettori.",
      },
      en: {
        headline: "Acceleration and overtaking in the desert",
        technicalData: TECHNICAL_DATA_BAHRAIN_EN,
        presentation: "The Bahrain circuit is located in the Sakhir desert and was the first Formula 1 Grand Prix held in the Middle East. The track offers long accelerations and heavy braking zones that favor overtaking.",
        trackFeatures: "The layout is characterized by long full-throttle sections followed by very violent braking. Desert winds can bring sand onto the asphalt, reducing grip.",
        overtakingSpots: "Turn 1 – main overtaking point of the circuit.\nTurn 4 – second big braking after the straight.",
        iconicCorners: "Turn 10 – difficult braking while the track slopes downhill.",
        historicalMoments: "2004 – first Formula 1 Grand Prix in the Middle East.\n2014 – epic battle between Lewis Hamilton and Nico Rosberg.",
        curiosities: "Since 2014, the Grand Prix is held at night.\nThe circuit is illuminated by thousands of floodlights.",
      },
      es: {
        headline: "Aceleración y adelantamientos en el desierto",
        technicalData: TECHNICAL_DATA_BAHRAIN_EN,
        presentation: "El circuito de Baréin se encuentra en el desierto de Sakhir y fue el primer Gran Premio de Fórmula 1 disputado en Oriente Medio. La pista ofrece largas aceleraciones y fuertes frenadas que favorecen los adelantamientos.",
        trackFeatures: "El trazado se caracteriza por largas secciones a fondo seguidas de frenadas muy violentas. El viento del desierto puede traer arena al asfalto, reduciendo el agarre.",
        overtakingSpots: "Curva 1 – principal punto de adelantamiento del circuito.\nCurva 4 – segunda gran frenada tras la recta.",
        iconicCorners: "Curva 10 – frenada difícil mientras la pista desciende.",
        historicalMoments: "2004 – primer Gran Premio de Fórmula 1 en Oriente Medio.\n2014 – batalla épica entre Lewis Hamilton y Nico Rosberg.",
        curiosities: "Desde 2014, el Gran Premio se disputa de noche.\nEl circuito está iluminado por miles de focos.",
      },
      fr: {
        headline: "Accélération et dépassements dans le désert",
        technicalData: TECHNICAL_DATA_BAHRAIN_EN,
        presentation: "Le circuit de Bahreïn est situé dans le désert de Sakhir et a été le premier Grand Prix de Formule 1 organisé au Moyen-Orient. La piste offre de longues accélérations et de fortes zones de freinage qui favorisent les dépassements.",
        trackFeatures: "Le tracé est caractérisé par de longues sections à pleine vitesse suivies de freinages très violents. Le vent du désert peut apporter du sable sur l'asphalte, réduisant l'adhérence.",
        overtakingSpots: "Virage 1 – principal point de dépassement du circuit.\nVirage 4 – deuxième gros freinage après la ligne droite.",
        iconicCorners: "Virage 10 – freinage difficile alors que la piste descend en pente.",
        historicalMoments: "2004 – premier Grand Prix de Formule 1 au Moyen-Orient.\n2014 – bataille épique entre Lewis Hamilton et Nico Rosberg.",
        curiosities: "Depuis 2014, le Grand Prix se dispute de nuit.\nLe circuit est éclairé par des milliers de projecteurs.",
      },
      de: {
        headline: "Beschleunigung und Überholmanöver in der Wüste",
        technicalData: TECHNICAL_DATA_BAHRAIN_EN,
        presentation: "Die Strecke von Bahrain liegt in der Wüste von Sakhir und war der erste Formel-1-Grand-Prix im Nahen Osten. Die Strecke bietet lange Beschleunigungsphasen und harte Bremszonen, die Überholmanöver begünstigen.",
        trackFeatures: "Das Layout ist geprägt von langen Vollgasabschnitten, gefolgt von sehr heftigen Bremsmanövern. Der Wüstenwind kann Sand auf den Asphalt bringen und den Grip verringern.",
        overtakingSpots: "Kurve 1 – Hauptüberholstelle des Kurses.\nKurve 4 – zweite große Bremszone nach der Geraden.",
        iconicCorners: "Kurve 10 – schwieriges Bremsen, während die Strecke abfällt.",
        historicalMoments: "2004 – erster Formel-1-Grand-Prix im Nahen Osten.\n2014 – epischer Kampf zwischen Lewis Hamilton und Nico Rosberg.",
        curiosities: "Seit 2014 wird der Grand Prix nachts ausgetragen.\nDie Strecke ist von Tausenden Flutlichtern beleuchtet.",
      },
    },
    jeddah: {
      it: {
        headline: "Velocità urbana sul Mar Rosso",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Jeddah, Arabia Saudita\n${TECHNICAL_LABELS_IT.length}: 6.174 km\n${TECHNICAL_LABELS_IT.turns}: 27\n${TECHNICAL_LABELS_IT.firstGp}: 2021\n${TECHNICAL_LABELS_IT.laps}: 50`,
        presentation: "Il circuito di Jeddah si sviluppa lungo la costa del Mar Rosso ed è uno dei tracciati cittadini più veloci della Formula 1. Il layout presenta numerose curve veloci e lunghi rettilinei.",
        trackFeatures: "Nonostante sia un circuito urbano, molte curve si percorrono quasi in pieno gas. Le barriere molto vicine e le curve cieche rendono il giro estremamente impegnativo.",
        overtakingSpots: "Curva 1 – staccata dopo il rettilineo principale.\nCurva 27 – frenata finale del giro.",
        iconicCorners: "Sequenza del primo settore – serie di curve veloci tra i muri.",
        historicalMoments: "2021 – prima edizione del Gran Premio dell’Arabia Saudita.",
        curiosities: "È uno dei circuiti cittadini con la velocità media più alta del calendario.",
      },
      en: {
        headline: "Urban speed on the Red Sea",
        technicalData: TECHNICAL_DATA_JEDDAH_EN,
        presentation: "The Jeddah circuit runs along the Red Sea coast and is one of the fastest street tracks in Formula 1. The layout features numerous fast corners and long straights.",
        trackFeatures: "Despite being a street circuit, many corners are taken almost flat out. The close barriers and blind corners make the lap extremely challenging.",
        overtakingSpots: "Turn 1 – braking after the main straight.\nTurn 27 – final braking of the lap.",
        iconicCorners: "First sector sequence – series of fast corners between the walls.",
        historicalMoments: "2021 – first edition of the Saudi Arabian Grand Prix.",
        curiosities: "It is one of the street circuits with the highest average speed on the calendar.",
      },
      es: {
        headline: "Velocidad urbana en el Mar Rojo",
        technicalData: TECHNICAL_DATA_JEDDAH_EN,
        presentation: "El circuito de Yeda se desarrolla a lo largo de la costa del Mar Rojo y es uno de los trazados urbanos más rápidos de la Fórmula 1. El diseño presenta numerosas curvas rápidas y largas rectas.",
        trackFeatures: "A pesar de ser un circuito urbano, muchas curvas se toman casi a fondo. Las barreras cercanas y las curvas ciegas hacen que la vuelta sea extremadamente exigente.",
        overtakingSpots: "Curva 1 – frenada tras la recta principal.\nCurva 27 – frenada final de la vuelta.",
        iconicCorners: "Secuencia del primer sector – serie de curvas rápidas entre los muros.",
        historicalMoments: "2021 – primera edición del Gran Premio de Arabia Saudita.",
        curiosities: "Es uno de los circuitos urbanos con mayor velocidad media del calendario.",
      },
      fr: {
        headline: "Vitesse urbaine sur la mer Rouge",
        technicalData: TECHNICAL_DATA_JEDDAH_EN,
        presentation: "Le circuit de Djeddah longe la côte de la mer Rouge et est l'un des circuits urbains les plus rapides de la Formule 1. Le tracé présente de nombreux virages rapides et de longues lignes droites.",
        trackFeatures: "Bien qu'il s'agisse d'un circuit urbain, de nombreux virages se prennent presque à fond. Les barrières proches et les virages aveugles rendent le tour extrêmement exigeant.",
        overtakingSpots: "Virage 1 – freinage après la ligne droite principale.\nVirage 27 – freinage final du tour.",
        iconicCorners: "Séquence du premier secteur – série de virages rapides entre les murs.",
        historicalMoments: "2021 – première édition du Grand Prix d'Arabie Saoudite.",
        curiosities: "C'est l'un des circuits urbains avec la vitesse moyenne la plus élevée du calendrier.",
      },
      de: {
        headline: "Städtisches Tempo am Roten Meer",
        technicalData: TECHNICAL_DATA_JEDDAH_EN,
        presentation: "Die Strecke von Jeddah verläuft entlang der Küste des Roten Meeres und ist einer der schnellsten Stadtkurse der Formel 1. Das Layout bietet zahlreiche schnelle Kurven und lange Geraden.",
        trackFeatures: "Obwohl es ein Stadtkurs ist, werden viele Kurven fast voll gefahren. Die nahen Barrieren und blinden Kurven machen die Runde extrem anspruchsvoll.",
        overtakingSpots: "Kurve 1 – Bremsen nach der Hauptgeraden.\nKurve 27 – letzte Bremszone der Runde.",
        iconicCorners: "Sequenz des ersten Sektors – Reihe schneller Kurven zwischen den Mauern.",
        historicalMoments: "2021 – erste Ausgabe des Großen Preises von Saudi-Arabien.",
        curiosities: "Es ist einer der Stadtkurse mit der höchsten Durchschnittsgeschwindigkeit im Kalender.",
      },
    },
    miami: {
      it: {
        headline: "Modernità e velocità intorno allo stadio",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Miami, USA\n${TECHNICAL_LABELS_IT.length}: 5.412 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 2022\n${TECHNICAL_LABELS_IT.laps}: 57`,
        presentation: "Il circuito di Miami è costruito intorno al Hard Rock Stadium ed è uno dei tracciati più moderni del calendario. Il layout combina lunghe rettilinei con sezioni tecniche più lente.",
        trackFeatures: "Il circuito alterna tratti molto veloci con una zona tecnica di curve lente che richiedono buona trazione in uscita.",
        overtakingSpots: "Curva 1 – prima grande frenata del circuito.\nCurva 17 – forte frenata dopo la lunga rettilineo opposto.",
        iconicCorners: "Chicane tra curve 14-15 – una delle parti più tecniche del circuito.",
        historicalMoments: "2022 – prima vittoria di Max Verstappen a Miami.",
        curiosities: "Il circuito è costruito intorno allo stadio dei Miami Dolphins.\nUna parte della pista passa sotto i cavalcavia dell'autostrada.",
      },
      en: {
        headline: "Modernity and speed around the stadium",
        technicalData: TECHNICAL_DATA_MIAMI_EN,
        presentation: "The Miami circuit is built around the Hard Rock Stadium and is one of the most modern tracks on the calendar. The layout combines long straights with slower technical sections.",
        trackFeatures: "The circuit alternates very fast sections with a technical area of slow corners that require good traction on exit.",
        overtakingSpots: "Turn 1 – first big braking zone.\nTurn 17 – heavy braking after the long back straight.",
        iconicCorners: "Chicane between turns 14-15 – one of the most technical parts of the circuit.",
        historicalMoments: "2022 – Max Verstappen's first win in Miami.",
        curiosities: "The circuit is built around the Miami Dolphins stadium.\nPart of the track passes under highway overpasses.",
      },
      es: {
        headline: "Modernidad y velocidad alrededor del estadio",
        technicalData: TECHNICAL_DATA_MIAMI_EN,
        presentation: "El circuito de Miami está construido alrededor del Hard Rock Stadium y es uno de los trazados más modernos del calendario. El diseño combina largas rectas con secciones técnicas más lentas.",
        trackFeatures: "El circuito alterna tramos muy rápidos con una zona técnica de curvas lentas que requieren buena tracción al salir.",
        overtakingSpots: "Curva 1 – primera gran frenada del circuito.\nCurva 17 – fuerte frenada tras la larga recta opuesta.",
        iconicCorners: "Chicane entre curvas 14-15 – una de las partes más técnicas del circuito.",
        historicalMoments: "2022 – primera victoria de Max Verstappen en Miami.",
        curiosities: "El circuito está construido alrededor del estadio de los Miami Dolphins.\nUna parte de la pista pasa bajo los pasos elevados de la autopista.",
      },
      fr: {
        headline: "Modernité et vitesse autour du stade",
        technicalData: TECHNICAL_DATA_MIAMI_EN,
        presentation: "Le circuit de Miami est construit autour du Hard Rock Stadium et est l'un des tracés les plus modernes du calendrier. Le tracé combine de longues lignes droites avec des sections techniques plus lentes.",
        trackFeatures: "Le circuit alterne des parties très rapides avec une zone technique de virages lents nécessitant une bonne traction à la sortie.",
        overtakingSpots: "Virage 1 – première grande zone de freinage.\nVirage 17 – gros freinage après la longue ligne droite opposée.",
        iconicCorners: "Chicane entre les virages 14-15 – l'une des parties les plus techniques du circuit.",
        historicalMoments: "2022 – première victoire de Max Verstappen à Miami.",
        curiosities: "Le circuit est construit autour du stade des Miami Dolphins.\nUne partie de la piste passe sous les ponts de l'autoroute.",
      },
      de: {
        headline: "Modernität und Geschwindigkeit rund ums Stadion",
        technicalData: TECHNICAL_DATA_MIAMI_EN,
        presentation: "Die Strecke von Miami ist rund um das Hard Rock Stadium gebaut und gehört zu den modernsten im Kalender. Das Layout kombiniert lange Geraden mit langsameren technischen Abschnitten.",
        trackFeatures: "Die Strecke wechselt zwischen sehr schnellen Abschnitten und einem technischen Bereich mit langsamen Kurven, die gute Traktion beim Herausfahren erfordern.",
        overtakingSpots: "Kurve 1 – erste große Bremszone.\nKurve 17 – starke Bremsung nach der langen Gegengeraden.",
        iconicCorners: "Schikane zwischen Kurve 14-15 – einer der technischsten Teile der Strecke.",
        historicalMoments: "2022 – Max Verstappens erster Sieg in Miami.",
        curiosities: "Die Strecke ist rund um das Stadion der Miami Dolphins gebaut.\nEin Teil der Strecke führt unter Autobahnbrücken hindurch."
      }
    },
    montreal: {
      it: {
        headline: "Imprevedibilità sull'isola di Notre-Dame",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Montréal, Canada\n${TECHNICAL_LABELS_IT.length}: 4.361 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1978\n${TECHNICAL_LABELS_IT.laps}: 70`,
        presentation: "Il circuito Gilles Villeneuve si trova sull’isola artificiale di Notre-Dame, nel fiume San Lorenzo. È un tracciato semi-cittadino caratterizzato da lunghi rettilinei interrotti da chicane e forti frenate. Le gare qui sono spesso imprevedibili e ricche di incidenti o interventi della safety car.",
        trackFeatures: "La pista richiede monoposto con buona velocità sul dritto e stabilità in frenata. Le numerose chicane obbligano i piloti a salire aggressivamente sui cordoli, mentre i lunghi rettilinei permettono di raggiungere velocità elevate.",
        overtakingSpots: "Hairpin (Curva 10) – una delle migliori opportunità di sorpasso del circuito.\nChicane finale – possibile attacco prima del traguardo.",
        iconicCorners: "Hairpin (Curva 10) – curva molto lenta che porta al rettilineo più lungo della pista.",
        historicalMoments: "2011 – una delle gare più lunghe della storia della Formula 1, vinta da Jenson Button.\n2007 – Robert Kubica sopravvive a un violentissimo incidente.",
        curiosities: "Il circuito prende il nome dal pilota canadese Gilles Villeneuve.\nAlla fine del giro si trova il famoso Muro dei Campioni."
      },
      en: {
        headline: "Unpredictability on Notre-Dame Island",
        technicalData: TECHNICAL_DATA_MONTREAL_EN,
        presentation: "The Gilles Villeneuve circuit is located on the artificial island of Notre-Dame in the Saint Lawrence River. It is a semi-street track characterized by long straights interrupted by chicanes and heavy braking. Races here are often unpredictable and full of incidents or safety car interventions.",
        trackFeatures: "The track requires cars with good straight-line speed and stability under braking. The numerous chicanes force drivers to attack the curbs aggressively, while the long straights allow for high speeds.",
        overtakingSpots: "Hairpin (Turn 10) – one of the best overtaking opportunities.\nFinal chicane – possible attack before the finish line.",
        iconicCorners: "Hairpin (Turn 10) – very slow corner leading to the longest straight.",
        historicalMoments: "2011 – one of the longest races in Formula 1 history, won by Jenson Button.\n2007 – Robert Kubica survives a violent crash.",
        curiosities: "The circuit is named after Canadian driver Gilles Villeneuve.\nAt the end of the lap is the famous Wall of Champions."
      },
      es: {
        headline: "Imprevisibilidad en la isla Notre-Dame",
        technicalData: TECHNICAL_DATA_MONTREAL_EN,
        presentation: "El circuito Gilles Villeneuve se encuentra en la isla artificial de Notre-Dame, en el río San Lorenzo. Es un trazado semiurbano caracterizado por largas rectas interrumpidas por chicanes y fuertes frenadas. Las carreras aquí suelen ser imprevisibles y llenas de incidentes o intervenciones del safety car.",
        trackFeatures: "La pista requiere monoplazas con buena velocidad en recta y estabilidad en frenada. Las numerosas chicanes obligan a los pilotos a atacar los pianos de forma agresiva, mientras que las largas rectas permiten alcanzar altas velocidades.",
        overtakingSpots: "Hairpin (Curva 10) – una de las mejores oportunidades de adelantamiento.\nChicane final – posible ataque antes de la meta.",
        iconicCorners: "Hairpin (Curva 10) – curva muy lenta que lleva a la recta más larga.",
        historicalMoments: "2011 – una de las carreras más largas de la historia de la Fórmula 1, ganada por Jenson Button.\n2007 – Robert Kubica sobrevive a un accidente violento.",
        curiosities: "El circuito lleva el nombre del piloto canadiense Gilles Villeneuve.\nAl final de la vuelta está el famoso Muro de los Campeones."
      },
      fr: {
        headline: "Imprévisibilité sur l'île Notre-Dame",
        technicalData: TECHNICAL_DATA_MONTREAL_EN,
        presentation: "Le circuit Gilles Villeneuve est situé sur l'île artificielle de Notre-Dame, dans le fleuve Saint-Laurent. C'est un tracé semi-urbain caractérisé par de longues lignes droites interrompues par des chicanes et de fortes zones de freinage. Les courses ici sont souvent imprévisibles et riches en incidents ou interventions de la safety car.",
        trackFeatures: "La piste exige des monoplaces avec une bonne vitesse en ligne droite et une stabilité au freinage. Les nombreuses chicanes obligent les pilotes à attaquer les vibreurs de façon agressive, tandis que les longues lignes droites permettent d'atteindre des vitesses élevées.",
        overtakingSpots: "Épingle (Virage 10) – l'une des meilleures opportunités de dépassement.\nChicane finale – possible attaque avant la ligne d'arrivée.",
        iconicCorners: "Épingle (Virage 10) – virage très lent menant à la ligne droite la plus longue.",
        historicalMoments: "2011 – l'une des courses les plus longues de l'histoire de la Formule 1, remportée par Jenson Button.\n2007 – Robert Kubica survit à un accident violent.",
        curiosities: "Le circuit porte le nom du pilote canadien Gilles Villeneuve.\nÀ la fin du tour se trouve le célèbre Mur des Champions."
      },
      de: {
        headline: "Unvorhersehbarkeit auf der Notre-Dame-Insel",
        technicalData: TECHNICAL_DATA_MONTREAL_EN,
        presentation: "Der Gilles-Villeneuve-Kurs befindet sich auf der künstlichen Insel Notre-Dame im Sankt-Lorenz-Strom. Es ist eine halb-städtische Strecke mit langen Geraden, die von Schikanen und harten Bremszonen unterbrochen werden. Die Rennen sind hier oft unvorhersehbar und voller Zwischenfälle oder Safety-Car-Einsätze.",
        trackFeatures: "Die Strecke verlangt Autos mit guter Geschwindigkeit auf den Geraden und Stabilität beim Bremsen. Die zahlreichen Schikanen zwingen die Fahrer, die Curbs aggressiv zu nehmen, während die langen Geraden hohe Geschwindigkeiten ermöglichen.",
        overtakingSpots: "Haarnadel (Kurve 10) – eine der besten Überholmöglichkeiten.\nLetzte Schikane – möglicher Angriff vor dem Ziel.",
        iconicCorners: "Haarnadel (Kurve 10) – sehr langsame Kurve, die zur längsten Geraden führt.",
        historicalMoments: "2011 – eines der längsten Rennen der Formel-1-Geschichte, gewonnen von Jenson Button.\n2007 – Robert Kubica überlebt einen schweren Unfall.",
        curiosities: "Die Strecke ist nach dem kanadischen Fahrer Gilles Villeneuve benannt.\nAm Ende der Runde befindet sich die berühmte Mauer der Champions."
      }
    },
    monaco: {
      it: {
        headline: "Icona e precisione assoluta",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Monte Carlo, Monaco\n${TECHNICAL_LABELS_IT.length}: 3.337 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 78`,
        presentation: "Il circuito di Monaco è il più iconico della Formula 1. Le strette strade del Principato rendono il giro estremamente tecnico e richiedono una precisione assoluta da parte dei piloti. I sorpassi sono molto difficili, ma la gara rimane una delle più prestigiose del calendario.",
        trackFeatures: "Il circuito è molto stretto e tortuoso, con velocità medie relativamente basse. La precisione è fondamentale perché i muri sono sempre molto vicini alla pista.",
        overtakingSpots: "Sainte Dévote – frenata dopo il rettilineo principale.\nNouvelle Chicane – staccata dopo il tunnel.",
        iconicCorners: "Fairmont Hairpin – la curva più lenta della Formula 1.\nTunnel – l’unica sezione coperta del mondiale.",
        historicalMoments: "1984 – Ayrton Senna impressiona il mondo con una straordinaria rimonta sotto la pioggia.\n1996 – Olivier Panis vince una gara caotica con pochissime vetture al traguardo.",
        curiosities: "È il circuito più corto del mondiale.\nVincere a Monaco è considerato uno dei più grandi traguardi della carriera di un pilota.",
      },
      en: {
        headline: "Pure precision between barriers",
        technicalData: TECHNICAL_DATA_MONACO_EN,
        presentation: "Monaco is the symbol of Formula 1: narrow, twisty and with almost no margin for error. Barriers are always close and qualifying is often more important than the race.",
        trackFeatures: "Street circuit with slow corners, quick direction changes and bumpy asphalt. The track is famous for its difficulty and lack of run-off areas.",
        overtakingSpots: "Overtaking is nearly impossible: the only real spot is the Sainte Dévote braking zone, but it requires great courage and precision.",
        iconicCorners: "Casino Square, the Fairmont hairpin (the slowest in F1), the Harbour chicane and the Swimming Pool are among the most famous.",
        historicalMoments: "1982 – Chaotic race with multiple leaders on the last lap. 1996 – Panis wins with only 3 finishers. 2018 – Ricciardo wins despite technical issues.",
        curiosities: "The Monaco GP has been held since 1929. Residents can watch the race from their balconies. The track is set up every year in about 6 weeks."
      }
    },
    catalunya: {
      it: {
        headline: "Banco di prova completo",
        presentation: "Il circuito di Monaco è il più iconico e prestigioso della Formula 1. Si snoda tra le strade del Principato, richiedendo precisione assoluta e coraggio. Le barriere sono vicinissime e ogni errore può essere fatale.",
        trackFeatures: "Tracciato stretto e tortuoso, con curve lente e cambi di direzione continui. La mancanza di vie di fuga rende ogni giro una sfida.",
        overtakingSpots: "Rarissimi: curva 1 (Sainte Dévote) e tunnel, ma i sorpassi sono quasi impossibili.",
        iconicCorners: "Casino, Mirabeau, Grand Hotel Hairpin, Portier, Tunnel, Tabac, Piscine, Rascasse.",
        historicalMoments: "1982 – gara caotica con colpi di scena.\n1996 – solo 3 piloti al traguardo.\n2018 – Ricciardo vince con problemi al motore.",
        curiosities: "Il circuito è il più corto e lento del mondiale.\nIl Gran Premio di Monaco è considerato il più glamour della Formula 1.",
        },
      en: {
        headline: "Complete testing ground",
        technicalData: TECHNICAL_DATA_CATALUNYA_EN,
        presentation: "The Barcelona circuit is one of the most complete tracks in Formula 1. It combines fast corners, technical sections and long straights, making it an excellent testing ground for cars.",
        trackFeatures: "The circuit requires good aerodynamic balance and tests both tires and car stability in fast corners.",
        overtakingSpots: "Turn 1 – main overtaking opportunity.\nTurn 10 – important braking in the second part of the circuit.",
        iconicCorners: "Turn 3 – long fast corner that puts pressure on the tires.",
        historicalMoments: "For many years it was the main circuit for pre-season testing.",
        curiosities: "The circuit is often used for testing due to its varied layout.",
      },
      es: {
        headline: "Banco de pruebas completo",
        technicalData: TECHNICAL_DATA_CATALUNYA_EN,
        presentation: "El circuito de Barcelona es uno de los trazados más completos de la Fórmula 1. Combina curvas rápidas, secciones técnicas y largas rectas, lo que lo convierte en un excelente banco de pruebas para los coches.",
        trackFeatures: "El circuito requiere un buen equilibrio aerodinámico y pone a prueba tanto los neumáticos como la estabilidad del coche en las curvas rápidas.",
        overtakingSpots: "Curva 1 – principal oportunidad de adelantamiento.\nCurva 10 – frenada importante en la segunda parte del circuito.",
        iconicCorners: "Curva 3 – larga curva rápida que pone presión sobre los neumáticos.",
        historicalMoments: "Durante muchos años fue el circuito principal para los tests de pretemporada.",
        curiosities: "El circuito se utiliza a menudo para pruebas debido a su trazado variado.",
      },
      fr: {
        headline: "Banc d'essai complet",
        technicalData: TECHNICAL_DATA_CATALUNYA_EN,
        presentation: "Le circuit de Barcelone est l'un des tracés les plus complets de la Formule 1. Il combine des virages rapides, des sections techniques et de longues lignes droites, ce qui en fait un excellent banc d'essai pour les voitures.",
        trackFeatures: "Le circuit exige un bon équilibre aérodynamique et met à l'épreuve les pneus ainsi que la stabilité de la voiture dans les virages rapides.",
        overtakingSpots: "Virage 1 – principale opportunité de dépassement.\nVirage 10 – freinage important dans la seconde partie du circuit.",
        iconicCorners: "Virage 3 – long virage rapide qui met les pneus à rude épreuve.",
        historicalMoments: "Pendant de nombreuses années, il a été le circuit principal pour les essais de pré-saison.",
        curiosities: "Le circuit est souvent utilisé pour les essais en raison de son tracé varié.",
      },
      de: {
        headline: "Vielseitige Teststrecke",
        technicalData: TECHNICAL_DATA_CATALUNYA_EN,
        presentation: "Die Strecke von Barcelona ist eine der vielseitigsten im Formel-1-Kalender. Sie kombiniert schnelle Kurven, technische Abschnitte und lange Geraden und ist daher ein hervorragender Prüfstand für die Autos.",
        trackFeatures: "Die Strecke verlangt ein gutes aerodynamisches Gleichgewicht und fordert sowohl die Reifen als auch die Stabilität des Autos in schnellen Kurven.",
        overtakingSpots: "Kurve 1 – wichtigste Überholmöglichkeit.\nKurve 10 – bedeutende Bremszone im zweiten Streckenabschnitt.",
        iconicCorners: "Kurve 3 – lange, schnelle Kurve, die die Reifen stark beansprucht.",
        historicalMoments: "Viele Jahre war die Strecke Hauptort für Vorsaisontests.",
        curiosities: "Die Strecke wird wegen ihres abwechslungsreichen Layouts oft für Tests genutzt.",
      },
    },
    redbullring: {
      it: {
        headline: "Battaglie brevi tra le montagne",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Spielberg, Austria\n${TECHNICAL_LABELS_IT.length}: 4.318 km\n${TECHNICAL_LABELS_IT.turns}: 10\n${TECHNICAL_LABELS_IT.firstGp}: 1970\n${TECHNICAL_LABELS_IT.laps}: 71`,
        presentation: "Il Red Bull Ring è uno dei circuiti più brevi del calendario ed è situato tra le montagne della Stiria. Nonostante il numero ridotto di curve, le gare sono spesso molto combattute grazie alle numerose opportunità di sorpasso.",
        presentation: "Le circuit de Monaco est le plus emblématique et prestigieux de la Formule 1. Il serpente dans les rues du Principauté, exigeant une précision absolue et du courage. Les barrières sont très proches et chaque erreur peut être fatale.",
        trackFeatures: "Tracé étroit et sinueux, avec des virages lents et des changements de direction constants. L'absence de dégagements rend chaque tour difficile.",
        overtakingSpots: "Très rares : virage 1 (Sainte Dévote) et tunnel, mais les dépassements sont presque impossibles.",
        iconicCorners: "Casino, Mirabeau, Grand Hotel Hairpin, Portier, Tunnel, Tabac, Piscine, Rascasse.",
        historicalMoments: "1982 – course chaotique avec rebondissements.\n1996 – seulement 3 pilotes à l'arrivée.\n2018 – Ricciardo gagne avec des problèmes de moteur.",
        curiosities: "Le circuit est le plus court et le plus lent du championnat.\nLe Grand Prix de Monaco est considéré comme le plus glamour de la Formule 1.",
      },
      en: {
        headline: "Short battles in the mountains",
        technicalData: TECHNICAL_DATA_REDBULLRING_EN,
        presentation: "The Red Bull Ring is one of the shortest circuits on the calendar and is located among the mountains of Styria. Despite the small number of corners, races are often very competitive thanks to numerous overtaking opportunities.",
        trackFeatures: "The circuit features a fast uphill corner right after the main straight, and hairpins at the top of the hill and downhill after the straight.",
        overtakingSpots: "Turn 3 – hairpin at the top of the hill.\nTurn 4 – downhill braking after the straight.",
        iconicCorners: "Turn 1 – fast uphill corner immediately after the main straight.",
        historicalMoments: "2002 – controversial Ferrari team order between Schumacher and Barrichello.\n2020 – first race of the season after the pandemic break.",
        curiosities: "It is one of the circuits with the fewest corners on the calendar.",
      },
      es: {
        headline: "Batallas cortas entre montañas",
        technicalData: TECHNICAL_DATA_REDBULLRING_EN,
        presentation: "El Red Bull Ring es uno de los circuitos más cortos del calendario y está situado entre las montañas de Estiria. A pesar del reducido número de curvas, las carreras suelen ser muy disputadas gracias a las numerosas oportunidades de adelantamiento.",
        trackFeatures: "La pista presenta una curva rápida en subida justo después de la recta principal, y horquillas en la cima de la colina y en bajada tras la recta.",
        overtakingSpots: "Curva 3 – horquilla en la cima de la colina.\nCurva 4 – frenada en bajada tras la recta.",
        iconicCorners: "Curva 1 – curva rápida en subida justo después de la recta principal.",
        historicalMoments: "2002 – polémica orden de equipo de Ferrari entre Schumacher y Barrichello.\n2020 – primera carrera de la temporada tras la pausa por la pandemia.",
        curiosities: "Es uno de los circuitos con menos curvas del calendario.",
      },
      fr: {
        headline: "Batailles courtes dans les montagnes",
        technicalData: TECHNICAL_DATA_REDBULLRING_EN,
        presentation: "Le Red Bull Ring est l'un des circuits les plus courts du calendrier et se situe au cœur des montagnes de Styrie. Malgré le faible nombre de virages, les courses sont souvent très disputées grâce aux nombreuses opportunités de dépassement.",
        trackFeatures: "Le circuit présente un virage rapide en montée juste après la ligne droite principale, et des épingles au sommet de la colline et en descente après la ligne droite.",
        overtakingSpots: "Virage 3 – épingle au sommet de la colline.\nVirage 4 – freinage en descente après la ligne droite.",
        iconicCorners: "Virage 1 – virage rapide en montée juste après la ligne droite principale.",
        historicalMoments: "2002 – ordre d'équipe controversé de Ferrari entre Schumacher et Barrichello.\n2020 – première course de la saison après la pause due à la pandémie.",
        curiosities: "C'est l'un des circuits avec le moins de virages du calendrier.",
      },
      de: {
        headline: "Kurze Kämpfe in den Bergen",
        technicalData: TECHNICAL_DATA_REDBULLRING_EN,
        presentation: "Der Red Bull Ring ist einer der kürzesten Kurse im Kalender und liegt in den Bergen der Steiermark. Trotz der wenigen Kurven sind die Rennen oft sehr umkämpft, da es viele Überholmöglichkeiten gibt.",
        trackFeatures: "Die Strecke bietet eine schnelle Kurve bergauf direkt nach der Hauptgeraden sowie Haarnadelkurven auf dem Hügel und bergab nach der Geraden.",
        overtakingSpots: "Kurve 3 – Haarnadel auf dem Hügel.\nKurve 4 – Bremsen bergab nach der Geraden.",
        iconicCorners: "Kurve 1 – schnelle Kurve bergauf direkt nach der Hauptgeraden.",
        historicalMoments: "2002 – umstrittener Ferrari-Teamorder zwischen Schumacher und Barrichello.\n2020 – erstes Rennen der Saison nach der Pandemiepause.",
        curiosities: "Es ist einer der Kurse mit den wenigsten Kurven im Kalender.",
      },
    },
    silverstone: {
      it: {
        headline: "Tempio storico e curve velocissime",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Silverstone, Regno Unito\n${TECHNICAL_LABELS_IT.length}: 5.891 km\n${TECHNICAL_LABELS_IT.turns}: 18\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 52`,
        presentation: "Silverstone è uno dei templi storici della Formula 1. Il circuito è famoso per le sue curve velocissime che richiedono grande precisione e un’ottima aerodinamica.",
        trackFeatures: "Le monoposto devono avere grande stabilità nelle curve veloci e cambi di direzione molto rapidi.",
        overtakingSpots: "Brooklands – frenata alla fine del Wellington Straight.\nStowe – staccata dopo l’Hangar Straight.",
        iconicCorners: "Maggots-Becketts-Chapel – una delle sequenze più spettacolari del motorsport.\nCopse – curva velocissima all’inizio del giro.",
        historicalMoments: "1950 – primo Gran Premio della storia della Formula 1.\n2020 – Lewis Hamilton vince nonostante una gomma forata all’ultimo giro.",
        curiosities: "Il circuito è costruito su un ex aeroporto militare della Seconda Guerra Mondiale.",
      },
      en: {
        headline: "Historic temple and super-fast corners",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone is one of Formula 1's historic temples. The circuit is famous for its super-fast corners that require great precision and excellent aerodynamics.",
        trackFeatures: "Cars must have great stability in fast corners and very quick direction changes.",
        overtakingSpots: "Brooklands – braking at the end of Wellington Straight.\nStowe – braking after Hangar Straight.",
        iconicCorners: "Maggots-Becketts-Chapel – one of the most spectacular sequences in motorsport.\nCopse – very fast corner at the start of the lap.",
        historicalMoments: "1950 – first Grand Prix in Formula 1 history.\n2020 – Lewis Hamilton wins despite a puncture on the last lap.",
        curiosities: "The circuit is built on a former WWII airfield.",
      },
      es: {
        headline: "Templo histórico y curvas rapidísimas",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone es uno de los templos históricos de la Fórmula 1. El circuito es famoso por sus curvas rapidísimas que requieren gran precisión y una excelente aerodinámica.",
        trackFeatures: "Los monoplazas deben tener gran estabilidad en curvas rápidas y cambios de dirección muy rápidos.",
        overtakingSpots: "Brooklands – frenada al final de Wellington Straight.\nStowe – frenada tras Hangar Straight.",
        iconicCorners: "Maggots-Becketts-Chapel – una de las secuencias más espectaculares del automovilismo.\nCopse – curva rapidísima al inicio de la vuelta.",
        historicalMoments: "1950 – primer Gran Premio de la historia de la Fórmula 1.\n2020 – Lewis Hamilton gana pese a un pinchazo en la última vuelta.",
        curiosities: "El circuito está construido sobre un antiguo aeródromo militar de la Segunda Guerra Mundial.",
      },
      fr: {
        headline: "Temple historique et virages ultra-rapides",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone est l'un des temples historiques de la Formule 1. Le circuit est célèbre pour ses virages ultra-rapides qui exigent une grande précision et une excellente aérodynamique.",
        trackFeatures: "Les monoplaces doivent avoir une grande stabilité dans les virages rapides et des changements de direction très rapides.",
        overtakingSpots: "Brooklands – freinage en fin de Wellington Straight.\nStowe – freinage après Hangar Straight.",
        iconicCorners: "Maggots-Becketts-Chapel – l'une des séquences les plus spectaculaires du sport automobile.\nCopse – virage très rapide au début du tour.",
        historicalMoments: "1950 – premier Grand Prix de l'histoire de la Formule 1.\n2020 – Lewis Hamilton gagne malgré une crevaison au dernier tour.",
        curiosities: "Le circuit est construit sur un ancien aérodrome militaire de la Seconde Guerre mondiale.",
      },
      de: {
        headline: "Historischer Tempel und superschnelle Kurven",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone ist einer der historischen Tempel der Formel 1. Die Strecke ist berühmt für ihre superschnellen Kurven, die große Präzision und hervorragende Aerodynamik erfordern.",
        trackFeatures: "Die Autos müssen in schnellen Kurven sehr stabil sein und schnelle Richtungswechsel ermöglichen.",
        overtakingSpots: "Brooklands – Bremsen am Ende der Wellington Straight.\nStowe – Bremsen nach der Hangar Straight.",
        iconicCorners: "Maggots-Becketts-Chapel – eine der spektakulärsten Sequenzen im Motorsport.\nCopse – sehr schnelle Kurve zu Beginn der Runde.",
        historicalMoments: "1950 – erstes Grand Prix-Rennen der Formel-1-Geschichte.\n2020 – Lewis Hamilton gewinnt trotz eines Reifenschadens in der letzten Runde.",
        curiosities: "Die Strecke wurde auf einem ehemaligen Militärflugplatz aus dem Zweiten Weltkrieg gebaut.",
      },
    },
    spa: {
      it: {
        headline: "Leggenda tra foreste e altitudine",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Spa, Belgio\n${TECHNICAL_LABELS_IT.length}: 7.004 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 44`,
        presentation: "Spa-Francorchamps è uno dei circuiti più leggendari della Formula 1. Situato nelle foreste delle Ardenne, è il tracciato più lungo del calendario e presenta grandi variazioni di altitudine.",
        trackFeatures: "Il circuito combina lunghi rettilinei, curve veloci e cambi di pendenza molto marcati. Il meteo può cambiare rapidamente tra una parte della pista e l’altra.",
        overtakingSpots: "Les Combes – frenata dopo il rettilineo Kemmel.\nBus Stop – chicane finale.",
        iconicCorners: "Eau Rouge-Raidillon – probabilmente la sequenza di curve più famosa della Formula 1.",
        historicalMoments: "1998 – gara caotica con un enorme incidente alla partenza.\n2000 – leggendario sorpasso di Mika Häkkinen su Schumacher.",
        curiosities: "Il circuito attraversa foreste e colline ed è uno dei preferiti dai piloti.",
      },
      en: {
        headline: "Legend among forests and altitude",
        technicalData: TECHNICAL_DATA_SPA_EN,
        presentation: "Spa-Francorchamps is one of the most legendary circuits in Formula 1. Located in the Ardennes forests, it is the longest track on the calendar and features major altitude changes.",
        trackFeatures: "The circuit combines long straights, fast corners and very marked elevation changes. The weather can change quickly between different parts of the track.",
        overtakingSpots: "Les Combes – braking after the Kemmel straight.\nBus Stop – final chicane.",
        iconicCorners: "Eau Rouge-Raidillon – probably the most famous corner sequence in Formula 1.",
        historicalMoments: "1998 – chaotic race with a huge crash at the start.\n2000 – legendary overtake by Mika Häkkinen on Schumacher.",
        curiosities: "The circuit crosses forests and hills and is a favorite among drivers.",
      },
      es: {
        headline: "Leyenda entre bosques y altitud",
        technicalData: TECHNICAL_DATA_SPA_EN,
        presentation: "Spa-Francorchamps es uno de los circuitos más legendarios de la Fórmula 1. Situado en los bosques de las Ardenas, es el trazado más largo del calendario y presenta grandes cambios de altitud.",
        trackFeatures: "El circuito combina largas rectas, curvas rápidas y cambios de elevación muy marcados. El clima puede cambiar rápidamente entre diferentes partes de la pista.",
        overtakingSpots: "Les Combes – frenada tras la recta de Kemmel.\nBus Stop – chicane final.",
        iconicCorners: "Eau Rouge-Raidillon – probablemente la secuencia de curvas más famosa de la Fórmula 1.",
        historicalMoments: "1998 – carrera caótica con un gran accidente en la salida.\n2000 – legendario adelantamiento de Mika Häkkinen a Schumacher.",
        curiosities: "El circuito atraviesa bosques y colinas y es uno de los favoritos de los pilotos.",
      },
      fr: {
        headline: "Légende entre forêts et altitude",
        technicalData: TECHNICAL_DATA_SPA_EN,
        presentation: "Spa-Francorchamps est l'un des circuits les plus légendaires de la Formule 1. Situé dans les forêts des Ardennes, c'est le tracé le plus long du calendrier et il présente de grands changements d'altitude.",
        trackFeatures: "Le circuit combine de longues lignes droites, des virages rapides et des changements de dénivelé très marqués. La météo peut changer rapidement entre différentes parties de la piste.",
        overtakingSpots: "Les Combes – freinage après la ligne droite de Kemmel.\nBus Stop – chicane finale.",
        iconicCorners: "Eau Rouge-Raidillon – probablement la séquence de virages la plus célèbre de la Formule 1.",
        historicalMoments: "1998 – course chaotique avec un énorme accident au départ.\n2000 – dépassement légendaire de Mika Häkkinen sur Schumacher.",
        curiosities: "Le circuit traverse des forêts et des collines et est l'un des préférés des pilotes.",
      },
      de: {
        headline: "Legende zwischen Wäldern und Höhenunterschieden",
        technicalData: TECHNICAL_DATA_SPA_EN,
        presentation: "Spa-Francorchamps ist eine der legendärsten Strecken der Formel 1. Sie liegt in den Ardennenwäldern, ist die längste Strecke im Kalender und weist große Höhenunterschiede auf.",
        trackFeatures: "Die Strecke kombiniert lange Geraden, schnelle Kurven und sehr ausgeprägte Höhenunterschiede. Das Wetter kann sich zwischen den Streckenabschnitten schnell ändern.",
        overtakingSpots: "Les Combes – Bremsen nach der Kemmel-Geraden.\nBus Stop – letzte Schikane.",
        iconicCorners: "Eau Rouge-Raidillon – wahrscheinlich die berühmteste Kurvenkombination der Formel 1.",
        historicalMoments: "1998 – chaotisches Rennen mit einem riesigen Unfall am Start.\n2000 – legendäres Überholmanöver von Mika Häkkinen gegen Schumacher.",
        curiosities: "Die Strecke führt durch Wälder und Hügel und ist bei den Fahrern sehr beliebt.",
      },
    },
    hungaroring: {
      it: {
        headline: "Tecnica e precisione fuori Budapest",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Budapest, Ungheria\n${TECHNICAL_LABELS_IT.length}: 4.381 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1986\n${TECHNICAL_LABELS_IT.laps}: 70`,
        presentation: "L’Hungaroring si trova appena fuori Budapest ed è uno dei circuiti più tecnici del calendario. Il tracciato è stretto e tortuoso, con molte curve consecutive che rendono difficile il sorpasso.",
        trackFeatures: "Il circuito richiede grande precisione e un buon bilanciamento della monoposto. Le alte temperature estive mettono spesso a dura prova piloti e pneumatici.",
        overtakingSpots: "Curva 1 – principale punto di sorpasso dopo il rettilineo principale.",
        iconicCorners: "Curva 4 – curva veloce in salita.",
        historicalMoments: "1986 – primo Gran Premio di Formula 1 dietro la cortina di ferro.\n1997 – Damon Hill sfiora una clamorosa vittoria con la Arrows.",
        curiosities: "Il circuito è spesso definito “il Monaco senza muri”.",
      },
      en: {
        headline: "Technique and precision outside Budapest",
        technicalData: TECHNICAL_DATA_HUNGARORING_EN,
        presentation: "The Hungaroring is located just outside Budapest and is one of the most technical circuits on the calendar. The track is narrow and twisty, with many consecutive corners that make overtaking difficult.",
        trackFeatures: "The circuit requires great precision and good car balance. High summer temperatures often challenge drivers and tires.",
        overtakingSpots: "Turn 1 – main overtaking point after the main straight.",
        iconicCorners: "Turn 4 – fast uphill corner.",
        historicalMoments: "1986 – first Formula 1 Grand Prix behind the Iron Curtain.\n1997 – Damon Hill nearly wins with Arrows.",
        curiosities: "The circuit is often called 'Monaco without walls'.",
      },
      es: {
        headline: "Técnica y precisión fuera de Budapest",
        technicalData: TECHNICAL_DATA_HUNGARORING_EN,
        presentation: "El Hungaroring se encuentra a las afueras de Budapest y es uno de los circuitos más técnicos del calendario. El trazado es estrecho y sinuoso, con muchas curvas consecutivas que dificultan los adelantamientos.",
        trackFeatures: "El circuito requiere gran precisión y un buen equilibrio del coche. Las altas temperaturas veraniegas suelen poner a prueba a pilotos y neumáticos.",
        overtakingSpots: "Curva 1 – principal punto de adelantamiento tras la recta principal.",
        iconicCorners: "Curva 4 – curva rápida en subida.",
        historicalMoments: "1986 – primer Gran Premio de Fórmula 1 tras la Cortina de Hierro.\n1997 – Damon Hill casi gana con Arrows.",
        curiosities: "El circuito es conocido como 'el Mónaco sin muros'.",
      },
      fr: {
        headline: "Technique et précision hors Budapest",
        technicalData: TECHNICAL_DATA_HUNGARORING_EN,
        presentation: "L'Hungaroring se situe juste à l'extérieur de Budapest et est l'un des circuits les plus techniques du calendrier. Le tracé est étroit et sinueux, avec de nombreux virages consécutifs qui rendent les dépassements difficiles.",
        trackFeatures: "Le circuit exige une grande précision et un bon équilibre de la voiture. Les températures estivales élevées mettent souvent à rude épreuve pilotes et pneus.",
        overtakingSpots: "Virage 1 – principal point de dépassement après la ligne droite principale.",
        iconicCorners: "Virage 4 – virage rapide en montée.",
        historicalMoments: "1986 – premier Grand Prix de Formule 1 derrière le rideau de fer.\n1997 – Damon Hill frôle la victoire avec Arrows.",
        curiosities: "Le circuit est souvent appelé 'Monaco sans murs'.",
      },
      de: {
        headline: "Technik und Präzision außerhalb von Budapest",
        technicalData: TECHNICAL_DATA_HUNGARORING_EN,
        presentation: "Der Hungaroring liegt direkt außerhalb von Budapest und ist eine der technisch anspruchsvollsten Strecken im Kalender. Die Strecke ist eng und kurvig, mit vielen aufeinanderfolgenden Kurven, die das Überholen erschweren.",
        trackFeatures: "Die Strecke verlangt große Präzision und ein gutes Fahrzeugsetup. Hohe Sommertemperaturen stellen Fahrer und Reifen oft auf die Probe.",
        overtakingSpots: "Kurve 1 – wichtigste Überholmöglichkeit nach der Hauptgeraden.",
        iconicCorners: "Kurve 4 – schnelle Kurve bergauf.",
        historicalMoments: "1986 – erster Formel-1-Grand-Prix hinter dem Eisernen Vorhang.\n1997 – Damon Hill verpasst knapp den Sieg mit Arrows.",
        curiosities: "Die Strecke wird oft als 'Monaco ohne Mauern' bezeichnet.",
      },
    },
    zandvoort: {
      it: {
        headline: "Tra le dune del Mare del Nord",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Zandvoort, Paesi Bassi\n${TECHNICAL_LABELS_IT.length}: 4.259 km\n${TECHNICAL_LABELS_IT.turns}: 14\n${TECHNICAL_LABELS_IT.firstGp}: 1952\n${TECHNICAL_LABELS_IT.laps}: 72`,
        presentation: "Situato tra le dune del Mare del Nord, Zandvoort è uno dei circuiti più particolari del mondiale. Il tracciato è stretto e molto tecnico.",
        trackFeatures: "La pista presenta curve sopraelevate che permettono diverse traiettorie e rendono il circuito unico.",
        overtakingSpots: "Tarzanbocht (Curva 1) – principale opportunità di sorpasso.",
        iconicCorners: "Arie Luyendyk Bocht – curva sopraelevata che immette sul rettilineo principale.",
        historicalMoments: "2021 – ritorno del Gran Premio dei Paesi Bassi dopo oltre 30 anni.",
        curiosities: "Il circuito è circondato da dune sabbiose vicino al mare.",
      },
      en: {
        headline: "Among the dunes of the North Sea",
        technicalData: TECHNICAL_DATA_ZANDVOORT_EN,
        presentation: "Located among the dunes of the North Sea, Zandvoort is one of the most unique circuits in the championship. The track is narrow and very technical.",
        trackFeatures: "The circuit features banked corners that allow for different lines and make the track unique.",
        overtakingSpots: "Tarzanbocht (Turn 1) – main overtaking opportunity.",
        iconicCorners: "Arie Luyendyk Bocht – banked corner leading onto the main straight.",
        historicalMoments: "2021 – return of the Dutch Grand Prix after more than 30 years.",
        curiosities: "The circuit is surrounded by sandy dunes near the sea.",
      },
      es: {
        headline: "Entre las dunas del Mar del Norte",
        technicalData: TECHNICAL_DATA_ZANDVOORT_EN,
        presentation: "Situado entre las dunas del Mar del Norte, Zandvoort es uno de los circuitos más singulares del campeonato. El trazado es estrecho y muy técnico.",
        trackFeatures: "La pista presenta curvas peraltadas que permiten diferentes trayectorias y hacen que el circuito sea único.",
        overtakingSpots: "Tarzanbocht (Curva 1) – principal oportunidad de adelantamiento.",
        iconicCorners: "Arie Luyendyk Bocht – curva peraltada que lleva a la recta principal.",
        historicalMoments: "2021 – regreso del Gran Premio de los Países Bajos tras más de 30 años.",
        curiosities: "El circuito está rodeado de dunas de arena cerca del mar.",
      },
      fr: {
        headline: "Parmi les dunes de la mer du Nord",
        technicalData: TECHNICAL_DATA_ZANDVOORT_EN,
        presentation: "Situé parmi les dunes de la mer du Nord, Zandvoort est l'un des circuits les plus particuliers du championnat. Le tracé est étroit et très technique.",
        trackFeatures: "La piste présente des virages relevés qui permettent différentes trajectoires et rendent le circuit unique.",
        overtakingSpots: "Tarzanbocht (Virage 1) – principale opportunité de dépassement.",
        iconicCorners: "Arie Luyendyk Bocht – virage relevé qui débouche sur la ligne droite principale.",
        historicalMoments: "2021 – retour du Grand Prix des Pays-Bas après plus de 30 ans.",
        curiosities: "Le circuit est entouré de dunes de sable près de la mer.",
      },
      de: {
        headline: "Zwischen den Dünen der Nordsee",
        technicalData: TECHNICAL_DATA_ZANDVOORT_EN,
        presentation: "Zandvoort liegt zwischen den Dünen der Nordsee und ist eine der einzigartigsten Strecken im Kalender. Die Strecke ist eng und sehr technisch.",
        trackFeatures: "Die Strecke bietet überhöhte Kurven, die verschiedene Linien erlauben und den Kurs einzigartig machen.",
        overtakingSpots: "Tarzanbocht (Kurve 1) – wichtigste Überholmöglichkeit.",
        iconicCorners: "Arie Luyendyk Bocht – überhöhte Kurve, die auf die Hauptgerade führt.",
        historicalMoments: "2021 – Rückkehr des Großen Preises der Niederlande nach über 30 Jahren.",
        curiosities: "Die Strecke ist von Sanddünen nahe dem Meer umgeben.",
      },
    },
    monza: {
      it: {
        headline: "Pura precisione tra le barriere",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Monza, Italia\n${TECHNICAL_LABELS_IT.length}: 5.793 km\n${TECHNICAL_LABELS_IT.turns}: 11\n${TECHNICAL_LABELS_IT.firstGp}: 1950\n${TECHNICAL_LABELS_IT.laps}: 53`,
        presentation: "Monza è il tempio della velocità: lunghi rettilinei, strette chicane e curve storiche. La pista premia potenza e setup a basso carico aerodinamico.",
        trackFeatures: "Circuito molto veloce con poche curve, favorisce i sorpassi e le battaglie in scia.",
        overtakingSpots: "I principali punti di sorpasso sono la prima chicane e il rettifilo del Rettifilo.",
        iconicCorners: "Parabolica, Lesmo, Ascari e Variante del Rettifilo sono curve leggendarie.",
        historicalMoments: "2020 – Gasly vince per AlphaTauri. 1971 – Arrivo più ravvicinato nella storia della F1. 1978 – Incidente di Peterson.",
        curiosities: "Monza è il circuito più antico ancora attivo in F1. I tifosi italiani (Tifosi) creano un’atmosfera unica.",
      },
      en: {
        headline: "Pure precision between barriers",
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza is the temple of speed: long straights, tight chicanes and historic corners. The track rewards power and low drag setups.",
        trackFeatures: "Very fast circuit with few corners, favoring overtaking and slipstream battles.",
        overtakingSpots: "Main overtaking spots are at the first chicane and the Rettifilo straight.",
        iconicCorners: "Parabolica, Lesmo, Ascari and Variante del Rettifilo are legendary corners.",
        historicalMoments: "2020 – Gasly wins for AlphaTauri. 1971 – Closest finish in F1 history. 1978 – Peterson accident.",
        curiosities: "Monza is the oldest active circuit in F1. The Italian fans (Tifosi) create a unique atmosphere."
      },
      es: {
        headline: "Pura precisión entre barreras",
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza es el templo de la velocidad: largas rectas, estrechas chicanes y esquinas históricas. La pista premia la potencia y las configuraciones de bajo drag.",
        trackFeatures: "Circuito muy rápido con pocas curvas, favorece los adelantamientos y las batallas en rebufo.",
        overtakingSpots: "Los principales puntos de adelantamiento son la primera chicane y la recta del Rettifilo.",
        iconicCorners: "Parabolica, Lesmo, Ascari y Variante del Rettifilo son curvas legendarias.",
        historicalMoments: "2020 – Gasly gana para AlphaTauri. 1971 – Final más cerrado en la historia de la F1. 1978 – Accidente de Peterson.",
        curiosities: "Monza es el circuito más antiguo aún activo en F1. Los fans italianos (Tifosi) crean una atmósfera única.",
      },
      fr: {
        headline: "Pure précision entre les barrières",
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza est le temple de la vitesse : de longues lignes droites, des chicanes serrées et des virages historiques. Le circuit récompense la puissance et les configurations à faible traînée.",
        trackFeatures: "Circuit très rapide avec peu de virages, favorisant les dépassements et les batailles en aspiration.",
        overtakingSpots: "Les principaux points de dépassement sont à la première chicane et sur la ligne droite du Rettifilo.",
        iconicCorners: "Parabolica, Lesmo, Ascari et Variante del Rettifilo sont des virages légendaires.",
        historicalMoments: "2020 – Gasly gagne pour AlphaTauri. 1971 – arrivée la plus serrée de l'histoire de la F1. 1978 – accident de Peterson.",
        curiosities: "Monza est le circuit le plus ancien encore actif en F1. Les fans italiens (Tifosi) créent une atmosphère unique.",
      },
      de: {
        headline: "Pure Präzision zwischen Barrieren", 
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza ist der Tempel der Geschwindigkeit: lange Geraden, enge Schikanen und historische Kurven. Die Strecke belohnt Leistung und Setups mit geringem Luftwiderstand.",
        trackFeatures: "Sehr schneller Kurs mit wenigen Kurven, begünstigt Überholmanöver und Windschattenkämpfe.",
        overtakingSpots: "Hauptüberholmöglichkeiten sind die erste Schikane und die Rettifilo-Gerade.",
        iconicCorners: "Parabolica, Lesmo, Ascari und Variante del Rettifilo sind legendäre Kurven.",
        historicalMoments: "2020 – Gasly gewinnt für AlphaTauri. 1971 – engstes Ziel in der Geschichte der F1. 1978 – Unfall von Peterson.",
        curiosities: "Monza ist die älteste noch aktive Strecke in der F1. Die italienischen Fans (Tifosi) schaffen eine einzigartige Atmosphäre.",
      },
    },
    madrid: {
      it: {
        headline: "Debutto urbano nella capitale spagnola",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Madrid, Spagna\n${TECHNICAL_LABELS_IT.length}: circa 5.4 km\n${TECHNICAL_LABELS_IT.turns}: circa 20\n${TECHNICAL_LABELS_IT.firstGp}: 2026`,
        presentation: "Il circuito urbano di Madrid debutta nel calendario di Formula 1 nel 2026. Il tracciato attraversa diverse aree della città combinando sezioni veloci e parti più tecniche.",
        trackFeatures: "Il layout è progettato per favorire le gare spettacolari con lunghi rettilinei e frenate importanti.",
        overtakingSpots: "Principali staccate dopo i rettilinei principali.",
        iconicCorners: "Nuova sezione veloce nel settore centrale.",
        historicalMoments: "2026 – prima edizione del Gran Premio di Madrid.",
        curiosities: "Sarà uno dei nuovi circuiti cittadini introdotti negli ultimi anni.",
      },
      en: {
        headline: "Debut of Madrid Grand Prix",
        technicalData: TECHNICAL_DATA_MADRID_EN,
        presentation: "Madrid hosts its first Formula 1 Grand Prix in 2026. The circuit is a new addition to the calendar, promising exciting urban racing.",
        trackFeatures: "A modern street circuit with a mix of fast and technical sections, surrounded by the cityscape.",
        overtakingSpots: "Main straight and tight corners offer overtaking opportunities.",
        iconicCorners: "New corners to be discovered by drivers and fans.",
        historicalMoments: "2026 – first edition of the Madrid Grand Prix.",
        curiosities: "It will be one of the new urban circuits introduced in recent years.",
      },
      es: {
        headline: "Debut del Gran Premio de Madrid",
        technicalData: TECHNICAL_DATA_MADRID_EN,
        presentation: "Madrid acoge su primer Gran Premio de Fórmula 1 en 2026. El circuito es una nueva incorporación al calendario, prometiendo carreras urbanas emocionantes.",
        trackFeatures: "Circuito urbano moderno con mezcla de zonas rápidas y técnicas, rodeado por el paisaje de la ciudad.",
        overtakingSpots: "La recta principal y las curvas cerradas ofrecen oportunidades de adelantamiento.",
        iconicCorners: "Nuevas curvas por descubrir para pilotos y aficionados.",
        historicalMoments: "2026 – primera edición del Gran Premio de Madrid.",
        curiosities: "Será uno de los nuevos circuitos urbanos introducidos en los últimos años.",
      },
      fr: {
        headline: "Début du Grand Prix de Madrid",
        technicalData: TECHNICAL_DATA_MADRID_EN,
        presentation: "Madrid accueille son premier Grand Prix de Formule 1 en 2026. Le circuit est une nouvelle addition au calendrier, promettant des courses urbaines passionnantes.",
        trackFeatures: "Circuit urbain moderne avec un mélange de sections rapides et techniques, entouré par le paysage urbain.",
        overtakingSpots: "La ligne droite principale et les virages serrés offrent des opportunités de dépassement.",
        iconicCorners: "Nouveaux virages à découvrir par les pilotes et les fans.",
        historicalMoments: "2026 – première édition du Grand Prix de Madrid.",
        curiosities: "Ce sera l'un des nouveaux circuits urbains introduits ces dernières années.",
      },
      de: {
        headline: "Premiere des Großen Preises von Madrid",
        technicalData: TECHNICAL_DATA_MADRID_EN,
        presentation: "Madrid richtet 2026 seinen ersten Formel-1-Grand-Prix aus. Die Strecke ist eine neue Ergänzung im Kalender und verspricht spannende Stadtrennen.",
        trackFeatures: "Moderner Stadtkurs mit einer Mischung aus schnellen und technischen Abschnitten, umgeben von der Stadtlandschaft.",
        overtakingSpots: "Hauptgerade und enge Kurven bieten Überholmöglichkeiten.",
        iconicCorners: "Neue Kurven, die von Fahrern und Fans entdeckt werden.",
        historicalMoments: "2026 – erste Ausgabe des Großen Preises von Madrid.",
        curiosities: "Es wird einer der neuen Stadtkurse sein, die in den letzten Jahren eingeführt wurden.",
      },
    },
    baku: {
      it: {
        headline: "Velocità tra mura storiche",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Baku, Azerbaigian\n${TECHNICAL_LABELS_IT.length}: 6.003 km\n${TECHNICAL_LABELS_IT.turns}: 20\n${TECHNICAL_LABELS_IT.firstGp}: 2016\n${TECHNICAL_LABELS_IT.laps}: 51`,
        presentation: "Il circuito di Baku attraversa il centro storico della capitale azera. È uno dei circuiti cittadini più veloci del calendario.",
        trackFeatures: "Il tracciato combina un lunghissimo rettilineo con una sezione estremamente stretta vicino alle mura medievali della città.",
        overtakingSpots: "Curva 1 – principale frenata del circuito.\nCurva 3 – seconda opportunità di sorpasso.",
        iconicCorners: "Sezione del castello – tratto strettissimo tra le mura storiche.",
        historicalMoments: "2017 – gara caotica vinta da Daniel Ricciardo.",
        curiosities: "Il rettilineo principale supera i 2 km.",
      },
      en: {
        headline: "Speed among historic walls",
        technicalData: TECHNICAL_DATA_BAKU_EN,
        presentation: "The Baku circuit runs through the historic center of Azerbaijan's capital. It is one of the fastest street circuits on the calendar.",
        trackFeatures: "The layout combines a very long straight with an extremely narrow section near the city's medieval walls.",
        overtakingSpots: "Turn 1 – main braking zone.\nTurn 3 – second overtaking opportunity.",
        iconicCorners: "Castle section – very narrow stretch between historic walls.",
        historicalMoments: "2017 – chaotic race won by Daniel Ricciardo.",
        curiosities: "The main straight is over 2 km long.",
      },
      es: {
        headline: "Velocidad entre muros históricos",
        technicalData: TECHNICAL_DATA_BAKU_EN,
        presentation: "El circuito de Bakú atraviesa el centro histórico de la capital de Azerbaiyán. Es uno de los circuitos urbanos más rápidos del calendario.",
        trackFeatures: "El trazado combina una recta larguísima con una sección extremadamente estrecha cerca de las murallas medievales de la ciudad.",
        overtakingSpots: "Curva 1 – principal zona de frenada.\nCurva 3 – segunda oportunidad de adelantamiento.",
        iconicCorners: "Sección del castillo – tramo muy estrecho entre muros históricos.",
        historicalMoments: "2017 – carrera caótica ganada por Daniel Ricciardo.",
        curiosities: "La recta principal supera los 2 km de longitud.",
      },
      fr: {
        headline: "Vitesse entre murs historiques",
        technicalData: TECHNICAL_DATA_BAKU_EN,
        presentation: "Le circuit de Bakou traverse le centre historique de la capitale azerbaïdjanaise. C'est l'un des circuits urbains les plus rapides du calendrier.",
        trackFeatures: "Le tracé combine une très longue ligne droite avec une section extrêmement étroite près des murs médiévaux de la ville.",
        overtakingSpots: "Virage 1 – principale zone de freinage.\nVirage 3 – deuxième opportunité de dépassement.",
        iconicCorners: "Section du château – portion très étroite entre murs historiques.",
        historicalMoments: "2017 – course chaotique remportée par Daniel Ricciardo.",
        curiosities: "La ligne droite principale dépasse 2 km de longueur.",
      },
      de: {
        headline: "Geschwindigkeit zwischen historischen Mauern",
        technicalData: TECHNICAL_DATA_BAKU_EN,
        presentation: "Die Strecke von Baku führt durch das historische Zentrum der aserbaidschanischen Hauptstadt. Es ist einer der schnellsten Stadtkurse im Kalender.",
        trackFeatures: "Das Layout kombiniert eine sehr lange Gerade mit einem extrem engen Abschnitt nahe den mittelalterlichen Stadtmauern.",
        overtakingSpots: "Kurve 1 – wichtigste Bremszone.\nKurve 3 – zweite Überholmöglichkeit.",
        iconicCorners: "Schlossabschnitt – sehr enger Bereich zwischen historischen Mauern.",
        historicalMoments: "2017 – chaotisches Rennen, gewonnen von Daniel Ricciardo.",
        curiosities: "Die Hauptgerade ist über 2 km lang.",
      },
    },
    marinabay: {
      it: {
        headline: "Notte e fatica nel centro di Singapore",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Singapore\n${TECHNICAL_LABELS_IT.length}: 4.928 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 2008\n${TECHNICAL_LABELS_IT.laps}: 62`,
        presentation: "Il Gran Premio di Singapore si corre di notte nel centro della città. È uno dei circuiti più impegnativi dal punto di vista fisico.",
        trackFeatures: "La pista è lenta e tecnica con molte curve consecutive e temperature elevate.",
        overtakingSpots: "Curva 7 – staccata dopo il rettilineo più lungo.\nCurva 14 – frenata nel centro cittadino.",
        iconicCorners: "Anderson Bridge – tratto sotto il famoso ponte storico.",
        historicalMoments: "2008 – prima gara notturna nella storia della Formula 1.",
        curiosities: "È uno dei Gran Premi più lunghi in termini di durata.",
      },
      en: {
        headline: "Night and challenge in downtown Singapore",
        technicalData: TECHNICAL_DATA_MARINABAY_EN,
        presentation: "The Singapore Grand Prix is raced at night in the city center. It is one of the most physically demanding circuits.",
        trackFeatures: "The track is slow and technical with many consecutive corners and high temperatures.",
        overtakingSpots: "Turn 7 – braking after the longest straight.\nTurn 14 – braking in the city center.",
        iconicCorners: "Anderson Bridge – section under the famous historic bridge.",
        historicalMoments: "2008 – first night race in Formula 1 history.",
        curiosities: "It is one of the longest Grands Prix in terms of duration.",
      },
      es: {
        headline: "Noche y exigencia en el centro de Singapur",
        technicalData: TECHNICAL_DATA_MARINABAY_EN,
        presentation: "El Gran Premio de Singapur se corre de noche en el centro de la ciudad. Es uno de los circuitos más exigentes físicamente.",
        trackFeatures: "La pista es lenta y técnica, con muchas curvas consecutivas y temperaturas elevadas.",
        overtakingSpots: "Curva 7 – frenada tras la recta más larga.\nCurva 14 – frenada en el centro urbano.",
        iconicCorners: "Anderson Bridge – tramo bajo el famoso puente histórico.",
        historicalMoments: "2008 – primera carrera nocturna en la historia de la Fórmula 1.",
        curiosities: "Es uno de los Grandes Premios más largos en duración.",
      },
      fr: {
        headline: "Nuit et défi au centre de Singapour",
        technicalData: TECHNICAL_DATA_MARINABAY_EN,
        presentation: "Le Grand Prix de Singapour se dispute de nuit au centre-ville. C'est l'un des circuits les plus exigeants physiquement.",
        trackFeatures: "La piste est lente et technique avec de nombreux virages consécutifs et des températures élevées.",
        overtakingSpots: "Virage 7 – freinage après la plus longue ligne droite.\nVirage 14 – freinage au centre-ville.",
        iconicCorners: "Anderson Bridge – section sous le célèbre pont historique.",
        historicalMoments: "2008 – première course nocturne de l'histoire de la Formule 1.",
        curiosities: "C'est l'un des Grands Prix les plus longs en termes de durée.",
      },
      de: {
        headline: "Nacht und Herausforderung im Zentrum von Singapur",
        technicalData: TECHNICAL_DATA_MARINABAY_EN,
        presentation: "Der Große Preis von Singapur wird nachts im Stadtzentrum ausgetragen. Es ist einer der körperlich anspruchsvollsten Kurse.",
        trackFeatures: "Die Strecke ist langsam und technisch, mit vielen aufeinanderfolgenden Kurven und hohen Temperaturen.",
        overtakingSpots: "Kurve 7 – Bremsen nach der längsten Geraden.\nKurve 14 – Bremsen im Stadtzentrum.",
        iconicCorners: "Anderson Bridge – Abschnitt unter der berühmten historischen Brücke.",
        historicalMoments: "2008 – erstes Nachtrennen in der Geschichte der Formel 1.",
        curiosities: "Es ist eines der längsten Grands Prix in Bezug auf die Dauer.",
      },
    },
    singapore: {
      it: {
        headline: "Notte e fatica nel centro di Singapore",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Singapore\n${TECHNICAL_LABELS_IT.length}: 4.928 km\n${TECHNICAL_LABELS_IT.turns}: 19\n${TECHNICAL_LABELS_IT.firstGp}: 2008\n${TECHNICAL_LABELS_IT.laps}: 62`,
        presentation: "Il Gran Premio di Singapore si corre di notte nel centro della città. È uno dei circuiti più impegnativi dal punto di vista fisico.",
        trackFeatures: "La pista è lenta e tecnica con molte curve consecutive e temperature elevate.",
        overtakingSpots: "Curva 7 – staccata dopo il rettilineo più lungo.\nCurva 14 – frenata nel centro cittadino.",
        iconicCorners: "Anderson Bridge – tratto sotto il famoso ponte storico.",
        historicalMoments: "2008 – prima gara notturna nella storia della Formula 1.",
        curiosities: "È uno dei Gran Premi più lunghi in termini di durata.",
      },
      en: {
        headline: "Night and challenge in downtown Singapore",
        technicalData: TECHNICAL_DATA_SINGAPORE_EN,
        presentation: "The Singapore Grand Prix is raced at night in the city center. It is one of the most physically demanding circuits.",
        trackFeatures: "The track is slow and technical with many consecutive corners and high temperatures.",
        overtakingSpots: "Turn 7 – braking after the longest straight.\nTurn 14 – braking in the city center.",
        iconicCorners: "Anderson Bridge – section under the famous historic bridge.",
        historicalMoments: "2008 – first night race in Formula 1 history.",
        curiosities: "It is one of the longest Grands Prix in terms of duration.",
      },
      es: {
        headline: "Noche y exigencia en el centro de Singapur",
        technicalData: TECHNICAL_DATA_SINGAPORE_EN,
        presentation: "El Gran Premio de Singapur se corre de noche en el centro de la ciudad. Es uno de los circuitos más exigentes físicamente.",
        trackFeatures: "La pista es lenta y técnica, con muchas curvas consecutivas y temperaturas elevadas.",
        overtakingSpots: "Curva 7 – frenada tras la recta más larga.\nCurva 14 – frenada en el centro urbano.",
        iconicCorners: "Anderson Bridge – tramo bajo el famoso puente histórico.",
        historicalMoments: "2008 – primera carrera nocturna en la historia de la Fórmula 1.",
        curiosities: "Es uno de los Grandes Premios más largos en duración.",
      },
      fr: {
        headline: "Nuit et défi au centre de Singapour",
        technicalData: TECHNICAL_DATA_SINGAPORE_EN,
        presentation: "Le Grand Prix de Singapour se dispute de nuit au centre-ville. C'est l'un des circuits les plus exigeants physiquement.",
        trackFeatures: "La piste est lente et technique avec de nombreux virages consécutifs et des températures élevées.",
        overtakingSpots: "Virage 7 – freinage après la plus longue ligne droite.\nVirage 14 – freinage au centre-ville.",
        iconicCorners: "Anderson Bridge – section sous le célèbre pont historique.",
        historicalMoments: "2008 – première course nocturne de l'histoire de la Formule 1.",
        curiosities: "C'est l'un des Grands Prix les plus longs en termes de durée.",
      },
      de: {
        headline: "Nacht und Herausforderung im Zentrum von Singapur",
        technicalData: TECHNICAL_DATA_SINGAPORE_EN,
        presentation: "Der Große Preis von Singapur wird nachts im Stadtzentrum ausgetragen. Es ist einer der körperlich anspruchsvollsten Kurse.",
        trackFeatures: "Die Strecke ist langsam und technisch, mit vielen aufeinanderfolgenden Kurven und hohen Temperaturen.",
        overtakingSpots: "Kurve 7 – Bremsen nach der längsten Geraden.\nKurve 14 – Bremsen im Stadtzentrum.",
        iconicCorners: "Anderson Bridge – Abschnitt unter der berühmten historischen Brücke.",
        historicalMoments: "2008 – erstes Nachtrennen in der Geschichte der Formel 1.",
        curiosities: "Es ist eines der längsten Grands Prix in Bezug auf die Dauer.",
      },
    usa: {
      it: {
        headline: "Modernità e pendenze in Texas",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Austin, Stati Uniti\n${TECHNICAL_LABELS_IT.length}: 5.513 km\n${TECHNICAL_LABELS_IT.turns}: 20\n${TECHNICAL_LABELS_IT.firstGp}: 2012\n${TECHNICAL_LABELS_IT.laps}: 56`,
        presentation: "Il Circuit of the Americas è uno dei tracciati più moderni del mondiale. Il layout si ispira a diverse sezioni di circuiti storici.",
        trackFeatures: "La pista presenta forti cambi di pendenza e una grande varietà di curve.",
        overtakingSpots: "Curva 1 – frenata in salita dopo il rettilineo principale.\nCurva 12 – staccata dopo il lungo rettilineo opposto.",
        iconicCorners: "Settore 1 – sequenza di curve ispirata a Suzuka.",
        historicalMoments: "",
        curiosities: "La prima curva si trova in cima a una ripida salita.",
      },
      en: {
        headline: "Modernity and elevation in Texas",
        technicalData: TECHNICAL_DATA_AUSTIN_EN,
        presentation: "The Circuit of the Americas is one of the most modern tracks in the championship. The layout is inspired by several sections of historic circuits.",
        trackFeatures: "The track features strong elevation changes and a wide variety of corners.",
        overtakingSpots: "Turn 1 – uphill braking after the main straight.\nTurn 12 – braking after the long back straight.",
        iconicCorners: "Sector 1 – sequence of corners inspired by Suzuka.",
        historicalMoments: "2012 – first race at the Circuit of the Americas.",
        curiosities: "The first corner is at the top of a steep climb.",
      },
      es: {
        headline: "Modernidad y desniveles en Texas",
        technicalData: TECHNICAL_DATA_AUSTIN_EN,
        presentation: "El Circuit of the Americas es uno de los trazados más modernos del mundial. El diseño se inspira en varias secciones de circuitos históricos.",
        trackFeatures: "La pista presenta fuertes cambios de desnivel y una gran variedad de curvas.",
        overtakingSpots: "Curva 1 – frenada en subida tras la recta principal.\nCurva 12 – frenada tras la larga recta opuesta.",
        iconicCorners: "Sector 1 – secuencia de curvas inspirada en Suzuka.",
        historicalMoments: "2012 – primera carrera en el Circuit of the Americas.",
        curiosities: "La primera curva está en la cima de una empinada subida.",
      },
      fr: {
        headline: "Modernité et dénivelés au Texas",
        technicalData: TECHNICAL_DATA_AUSTIN_EN,
        presentation: "Le Circuit of the Americas est l'un des circuits les plus modernes du championnat. Le tracé s'inspire de plusieurs sections de circuits historiques.",
        trackFeatures: "La piste présente de forts changements de dénivelé et une grande variété de virages.",
        overtakingSpots: "Virage 1 – freinage en montée après la ligne droite principale.\nVirage 12 – freinage après la longue ligne droite opposée.",
        iconicCorners: "Secteur 1 – séquence de virages inspirée de Suzuka.",
        historicalMoments: "2012 – première course au Circuit of the Americas.",
        curiosities: "Le premier virage se trouve au sommet d'une montée raide.",
      },
      de: {
        headline: "Modernität und Höhenunterschiede in Texas",
        technicalData: TECHNICAL_DATA_AUSTIN_EN,
        presentation: "Der Circuit of the Americas ist eine der modernsten Strecken im Kalender. Das Layout ist von verschiedenen Abschnitten historischer Kurse inspiriert.",
        trackFeatures: "Die Strecke weist starke Höhenunterschiede und eine große Vielfalt an Kurven auf.",
        overtakingSpots: "Kurve 1 – Bremsen bergauf nach der Hauptgeraden.\nKurve 12 – Bremsen nach der langen Gegengeraden.",
        iconicCorners: "Sektor 1 – Kurvensequenz inspiriert von Suzuka.",
        historicalMoments: "2012 – erstes Rennen auf dem Circuit of the Americas.",
        curiosities: "Die erste Kurve liegt oben auf einer steilen Rampe.",
      },
    },
    mexico: {
      it: {
        headline: "Altitudine e atmosfera nello stadio",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Città del Messico, Messico\n${TECHNICAL_LABELS_IT.length}: 4.304 km\n${TECHNICAL_LABELS_IT.turns}: 17\n${TECHNICAL_LABELS_IT.firstGp}: 1963\n${TECHNICAL_LABELS_IT.laps}: 71`,
        presentation: "Il circuito di Città del Messico si trova a oltre 2.200 metri di altitudine.",
        trackFeatures: "L’aria rarefatta riduce la resistenza aerodinamica e cambia il comportamento delle monoposto.",
        overtakingSpots: "Curva 1 – principale staccata del circuito.",
        iconicCorners: "Sezione dello stadio Foro Sol.",
        historicalMoments: "",
        curiosities: "La parte finale attraversa uno stadio pieno di spettatori.",
      },
      en: {
        headline: "Altitude and stadium atmosphere",
        technicalData: `${TECHNICAL_LABELS_EN.city}: Mexico City, Mexico\n${TECHNICAL_LABELS_EN.length}: 4.304 km\n${TECHNICAL_LABELS_EN.turns}: 17\n${TECHNICAL_LABELS_EN.firstGp}: 1963\n${TECHNICAL_LABELS_EN.laps}: 71`,
        presentation: "The Mexico City circuit is located over 2,200 meters above sea level.",
        trackFeatures: "The thin air reduces aerodynamic drag and changes the behavior of the cars.",
        overtakingSpots: "Turn 1 – main braking zone.",
        iconicCorners: "Foro Sol stadium section.",
        historicalMoments: "",
        curiosities: "The final part passes through a stadium full of spectators.",
      },
      es: {
        headline: "Altitud y atmósfera en el estadio",
        technicalData: TECHNICAL_DATA_MEXICO_EN,
        presentation: "El circuito de Ciudad de México se encuentra a más de 2.200 metros de altitud.",
        trackFeatures: "El aire enrarecido reduce la resistencia aerodinámica y cambia el comportamiento de los monoplazas.",
        overtakingSpots: "Curva 1 – principal zona de frenada.",
        iconicCorners: "Sección del estadio Foro Sol.",
        historicalMoments: "",
        curiosities: "La parte final atraviesa un estadio lleno de espectadores.",
      },
      fr: {
        headline: "Altitude et ambiance dans le stade",
        technicalData: TECHNICAL_DATA_MEXICO_EN,
        presentation: "Le circuit de Mexico se trouve à plus de 2 200 mètres d'altitude.",
        trackFeatures: "L'air raréfié réduit la résistance aérodynamique et change le comportement des voitures.",
        overtakingSpots: "Virage 1 – principale zone de freinage.",
        iconicCorners: "Section du stade Foro Sol.",
        historicalMoments: "",
        curiosities: "La partie finale traverse un stade plein de spectateurs.",
      },
      de: {
        headline: "Höhe und Stadionatmosphäre",
        technicalData: TECHNICAL_DATA_MEXICO_EN,
        presentation: "Die Strecke in Mexiko-Stadt liegt über 2.200 Meter über dem Meeresspiegel.",
        trackFeatures: "Die dünne Luft reduziert den aerodynamischen Widerstand und verändert das Verhalten der Autos.",
        overtakingSpots: "Kurve 1 – wichtigste Bremszone.",
        iconicCorners: "Foro Sol Stadionabschnitt.",
        historicalMoments: "",
        curiosities: "Der letzte Teil führt durch ein Stadion voller Zuschauer.",
      },
    },
    interlagos: {
      it: {
        headline: "Spettacolo e pendenze a San Paolo",
        technicalData: `${TECHNICAL_LABELS_IT.city}: San Paolo, Brasile\n${TECHNICAL_LABELS_IT.length}: 4.309 km\n${TECHNICAL_LABELS_IT.turns}: 15\n${TECHNICAL_LABELS_IT.firstGp}: 1973\n${TECHNICAL_LABELS_IT.laps}: 71`,
        presentation: "Interlagos è uno dei circuiti più spettacolari del mondiale grazie ai cambi di pendenza e alle gare spesso imprevedibili.",
        trackFeatures: "Il circuito è corto ma molto tecnico.",
        overtakingSpots: "Senna S – prima chicane del circuito.\nCurva 4 – frenata in discesa.",
        iconicCorners: "Junção – curva che porta sul rettilineo principale.",
        historicalMoments: "",
        curiosities: "Il circuito gira in senso antiorario.",
      },
      en: {
        headline: "Spectacle and elevation in São Paulo",
        technicalData: `${TECHNICAL_LABELS_EN.city}: São Paulo, Brazil\n${TECHNICAL_LABELS_EN.length}: 4.309 km\n${TECHNICAL_LABELS_EN.turns}: 15\n${TECHNICAL_LABELS_EN.firstGp}: 1973\n${TECHNICAL_LABELS_EN.laps}: 71`,
        presentation: "Interlagos is one of the most spectacular circuits thanks to its elevation changes and often unpredictable races.",
        trackFeatures: "The circuit is short but very technical.",
        overtakingSpots: "Senna S – first chicane.\nTurn 4 – downhill braking zone.",
        iconicCorners: "Junção – corner leading onto the main straight.",
        historicalMoments: "",
        curiosities: "The circuit runs counterclockwise.",
      },
      es: {
        headline: "Espectáculo y desniveles en São Paulo",
        technicalData: TECHNICAL_DATA_INTERLAGOS_EN,
        presentation: "Interlagos es uno de los circuitos más espectaculares gracias a sus cambios de desnivel y carreras a menudo impredecibles.",
        trackFeatures: "El circuito es corto pero muy técnico.",
        overtakingSpots: "Senna S – primera chicane.\nCurva 4 – frenada en bajada.",
        iconicCorners: "Junção – curva que lleva a la recta principal.",
        historicalMoments: "",
        curiosities: "El circuito gira en sentido antihorario.",
      },
      fr: {
        headline: "Spectacle et dénivelé à São Paulo",
        technicalData: TECHNICAL_DATA_INTERLAGOS_EN,
        presentation: "Interlagos est l'un des circuits les plus spectaculaires grâce à ses changements de dénivelé et à ses courses souvent imprévisibles.",
        trackFeatures: "Le circuit est court mais très technique.",
        overtakingSpots: "Senna S – première chicane.\nVirage 4 – freinage en descente.",
        iconicCorners: "Junção – virage menant à la ligne droite principale.",
        historicalMoments: "",
        curiosities: "Le circuit tourne dans le sens inverse des aiguilles d'une montre.",
      },
      de: {
        headline: "Spektakel und Höhenunterschiede in São Paulo",
        technicalData: TECHNICAL_DATA_INTERLAGOS_EN,
        presentation: "Interlagos ist einer der spektakulärsten Kurse dank seiner Höhenunterschiede und oft unvorhersehbaren Rennen.",
        trackFeatures: "Die Strecke ist kurz, aber sehr technisch.",
        overtakingSpots: "Senna S – erste Schikane.\nKurve 4 – Bremszone bergab.",
        iconicCorners: "Junção – Kurve, die zur Hauptgeraden führt.",
        historicalMoments: "",
        curiosities: "Die Strecke verläuft gegen den Uhrzeigersinn.",
      },
    },
    lasvegas: {
      it: {
        headline: "Notte e luci sullo Strip",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Las Vegas, Stati Uniti\n${TECHNICAL_LABELS_IT.length}: 6.2 km\n${TECHNICAL_LABELS_IT.turns}: 17\n${TECHNICAL_LABELS_IT.firstGp}: 2023\n${TECHNICAL_LABELS_IT.laps}: 50`,
        presentation: "Il circuito di Las Vegas si sviluppa lungo il famoso Strip tra hotel e casinò.",
        trackFeatures: "Il layout presenta lunghi rettilinei e curve lente.",
        overtakingSpots: "Curva 14 – principale zona di sorpasso.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "La gara si corre completamente di notte.",
      },
      en: {
        headline: "Night and lights on the Strip",
        technicalData: `${TECHNICAL_LABELS_EN.city}: Las Vegas, USA\n${TECHNICAL_LABELS_EN.length}: 6.2 km\n${TECHNICAL_LABELS_EN.turns}: 17\n${TECHNICAL_LABELS_EN.firstGp}: 2023\n${TECHNICAL_LABELS_EN.laps}: 50`,
        presentation: "The Las Vegas circuit runs along the famous Strip between hotels and casinos.",
        trackFeatures: "The layout features long straights and slow corners.",
        overtakingSpots: "Turn 14 – main overtaking zone.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "The race is held entirely at night.",
      },
      es: {
        headline: "Noche y luces en el Strip",
        technicalData: TECHNICAL_DATA_LASVEGAS_EN,
        presentation: "El circuito de Las Vegas se desarrolla a lo largo del famoso Strip entre hoteles y casinos.",
        trackFeatures: "El diseño presenta largas rectas y curvas lentas.",
        overtakingSpots: "Curva 14 – principal zona de adelantamiento.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "La carrera se corre completamente de noche.",
      },
      fr: {
        headline: "Nuit et lumières sur le Strip",
        technicalData: TECHNICAL_DATA_LASVEGAS_EN,
        presentation: "Le circuit de Las Vegas se déroule le long du célèbre Strip entre hôtels et casinos.",
        trackFeatures: "Le tracé présente de longues lignes droites et des virages lents.",
        overtakingSpots: "Virage 14 – principale zone de dépassement.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "La course se déroule entièrement de nuit.",
      },
      de: {
        headline: "Nacht und Lichter am Strip",
        technicalData: TECHNICAL_DATA_LASVEGAS_EN,
        presentation: "Der Las Vegas Circuit verläuft entlang des berühmten Strips zwischen Hotels und Casinos.",
        trackFeatures: "Das Layout bietet lange Geraden und langsame Kurven.",
        overtakingSpots: "Kurve 14 – Hauptüberholzone.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "Das Rennen findet komplett nachts statt.",
      },
    },
    lusail: {
      it: {
        headline: "MotoGP e velocità nel deserto",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Lusail, Qatar\n${TECHNICAL_LABELS_IT.length}: 5.419 km\n${TECHNICAL_LABELS_IT.turns}: 16\n${TECHNICAL_LABELS_IT.firstGp}: 2021\n${TECHNICAL_LABELS_IT.laps}: 57`,
        presentation: "Il circuito di Lusail è stato costruito originariamente per la MotoGP.",
        trackFeatures: "Il layout è caratterizzato da curve veloci e fluide.",
        overtakingSpots: "Curva 1 – principale frenata.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "La gara si disputa di notte per evitare il caldo del deserto.",
      },
      en: {
        headline: "MotoGP and speed in the desert",
        technicalData: `${TECHNICAL_LABELS_EN.city}: Lusail, Qatar\n${TECHNICAL_LABELS_EN.length}: 5.419 km\n${TECHNICAL_LABELS_EN.turns}: 16\n${TECHNICAL_LABELS_EN.firstGp}: 2021\n${TECHNICAL_LABELS_EN.laps}: 57`,
        presentation: "The Lusail circuit was originally built for MotoGP.",
        trackFeatures: "The layout features fast and flowing corners.",
        overtakingSpots: "Turn 1 – main braking zone.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "The race is held at night to avoid the desert heat.",
      },
      es: {
        headline: "MotoGP y velocidad en el desierto",
        technicalData: TECHNICAL_DATA_LUSAIL_EN,
        presentation: "El circuito de Lusail fue construido originalmente para MotoGP.",
        trackFeatures: "El diseño se caracteriza por curvas rápidas y fluidas.",
        overtakingSpots: "Curva 1 – principal zona de frenada.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "La carrera se disputa de noche para evitar el calor del desierto.",
      },
      fr: {
        headline: "MotoGP et vitesse dans le désert",
        technicalData: TECHNICAL_DATA_LUSAIL_EN,
        presentation: "Le circuit de Lusail a été construit à l'origine pour la MotoGP.",
        trackFeatures: "Le tracé est caractérisé par des virages rapides et fluides.",
        overtakingSpots: "Virage 1 – principale zone de freinage.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "La course se déroule de nuit pour éviter la chaleur du désert.",
      },
      de: {
        headline: "MotoGP und Geschwindigkeit in der Wüste",
        technicalData: TECHNICAL_DATA_LUSAIL_EN,
        presentation: "Der Lusail Circuit wurde ursprünglich für die MotoGP gebaut.",
        trackFeatures: "Das Layout zeichnet sich durch schnelle und fließende Kurven aus.",
        overtakingSpots: "Kurve 1 – Hauptbremszone.",
        iconicCorners: "",
        historicalMoments: "",
        curiosities: "Das Rennen findet nachts statt, um der Hitze der Wüste zu entgehen.",
      },
    },
    yasmarina: {
      it: {
        headline: "Finale tra tramonto e hotel",
        technicalData: `${TECHNICAL_LABELS_IT.city}: Abu Dhabi, Emirati Arabi Uniti\n${TECHNICAL_LABELS_IT.length}: 5.281 km\n${TECHNICAL_LABELS_IT.turns}: 16\n${TECHNICAL_LABELS_IT.firstGp}: 2009\n${TECHNICAL_LABELS_IT.laps}: 58`,
        presentation: "Yas Marina ospita spesso l’ultima gara del campionato.",
        trackFeatures: "Il circuito combina rettilinei e curve lente.",
        overtakingSpots: "Curva 6 – frenata dopo il primo rettilineo.\nCurva 9 – hairpin prima del lungo rettilineo.",
        iconicCorners: "Sezione sotto l’hotel Yas Marina.",
        historicalMoments: "",
        curiosities: "La gara inizia al tramonto e termina di notte.",
      },
      en: {
        headline: "Finale at sunset and hotel",
        technicalData: `${TECHNICAL_LABELS_EN.city}: Abu Dhabi, United Arab Emirates\n${TECHNICAL_LABELS_EN.length}: 5.281 km\n${TECHNICAL_LABELS_EN.turns}: 16\n${TECHNICAL_LABELS_EN.firstGp}: 2009\n${TECHNICAL_LABELS_EN.laps}: 58`,
        presentation: "Yas Marina often hosts the final race of the championship.",
        trackFeatures: "The circuit combines straights and slow corners.",
        overtakingSpots: "Turn 6 – braking after the first straight.\nTurn 9 – hairpin before the long straight.",
        iconicCorners: "Section under the Yas Marina hotel.",
        historicalMoments: "",
        curiosities: "The race starts at sunset and ends at night.",
      },
      es: {
        headline: "El templo de la velocidad en el parque",
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza es conocido como el Templo de la Velocidad. Es uno de los circuitos más rápidos de la Fórmula 1 gracias a sus largas rectas y al bajo apoyo aerodinámico utilizado por los coches.",
        trackFeatures: "Los coches alcanzan velocidades superiores a 350 km/h en las rectas. El circuito tiene pocas curvas pero zonas de frenada muy fuertes.",
        overtakingSpots: "Variante del Rettifilo – primera chicane tras la recta principal.\nVariante de la Roggia – segunda gran zona de frenada.",
        iconicCorners: "Ascari – secuencia rápida en la parte central del circuito.\nParabólica (Curva Alboreto) – larga curva final.",
        historicalMoments: "1988 – victoria de Ferrari pocas semanas después de la muerte de Enzo Ferrari.\n2020 – sorprendente victoria de Pierre Gasly.",
        curiosities: "El circuito se encuentra dentro del Parque de Monza.",
      },
      fr: {
        headline: "Le temple de la vitesse dans le parc",
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza est connu comme le Temple de la Vitesse. C'est l'un des circuits les plus rapides de la Formule 1 grâce à ses longues lignes droites et à l'appui aérodynamique réduit utilisé par les voitures.",
        trackFeatures: "Les voitures atteignent des vitesses supérieures à 350 km/h dans les lignes droites. Le circuit comporte peu de virages mais des zones de freinage très importantes.",
        overtakingSpots: "Variante du Rettifilo – première chicane après la ligne droite principale.\nVariante de la Roggia – deuxième grande zone de freinage.",
        iconicCorners: "Ascari – séquence rapide au centre du circuit.\nParabolica (Virage Alboreto) – long virage final.",
        historicalMoments: "1988 – victoire de Ferrari quelques semaines après la mort d'Enzo Ferrari.\n2020 – victoire surprenante de Pierre Gasly.",
        curiosities: "Le circuit se trouve dans le parc de Monza.",
      },
      de: {
        headline: "Der Tempel der Geschwindigkeit im Park",
        technicalData: TECHNICAL_DATA_MONZA_EN,
        presentation: "Monza ist als Tempel der Geschwindigkeit bekannt. Es ist eine der schnellsten Strecken der Formel 1 dank der langen Geraden und des geringen Abtriebs der Autos.",
        trackFeatures: "Die Autos erreichen auf den Geraden Geschwindigkeiten von über 350 km/h. Die Strecke hat wenige Kurven, aber sehr harte Bremszonen.",
        overtakingSpots: "Rettifilo-Schikane – erste Schikane nach der Hauptgeraden.\nRoggia-Schikane – zweite große Bremszone.",
        iconicCorners: "Ascari – schnelle Sequenz im mittleren Streckenabschnitt.\nParabolica (Kurve Alboreto) – lange letzte Kurve.",
        historicalMoments: "1988 – Ferrari-Sieg wenige Wochen nach dem Tod von Enzo Ferrari.\n2020 – überraschender Sieg von Pierre Gasly.",
        curiosities: "Die Strecke befindet sich im Park von Monza.",
      },
    },
    silverstone: {
      it: {
        headline: "Velocita storica e curve iconiche",
        technicalData: TECHNICAL_DATA_SILVERSTONE_IT,
        presentation: "Silverstone è una delle piste più storiche della F1, nata su un ex aeroporto militare. È famosa per le sue curve veloci e per il pubblico appassionato.",
        trackFeatures: "Tracciato molto veloce, con curve come Maggots, Becketts e Chapel che mettono alla prova l’aerodinamica e il coraggio dei piloti.",
        overtakingSpots: "Le migliori occasioni sono alla staccata di Brooklands e di Stowe, grazie ai lunghi rettilinei che precedono queste curve.",
        iconicCorners: "Copse, Maggots-Becketts-Chapel, Stowe e Club sono tra le curve più iconiche del mondiale.",
        historicalMoments: "1950 – Prima gara del mondiale F1. 2008 – Vittoria di Hamilton sotto la pioggia. 2021 – Contatto tra Hamilton e Verstappen a Copse.",
        curiosities: "Il layout è stato modificato più volte. Il pubblico britannico è tra i più calorosi e numerosi del campionato."
      },
      en: {
        headline: "Historic speed and iconic corners",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone is one of the most historic tracks in F1, born on a former military airfield. It is famous for its fast corners and passionate crowd.",
        trackFeatures: "Very fast layout, with corners like Maggots, Becketts and Chapel that test the aerodynamics and bravery of the drivers.",
        overtakingSpots: "The best opportunities are at the braking zones of Brooklands and Stowe, thanks to the long straights leading to these corners.",
        iconicCorners: "Copse, Maggots-Becketts-Chapel, Stowe and Club are among the most iconic corners in the championship.",
        historicalMoments: "1950 – First F1 World Championship"
      },
      es: {
        headline: "Velocidad histórica y curvas icónicas",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone es una de las pistas más históricas de la F1, nacida en un antiguo aeródromo militar. Es famosa por sus curvas rápidas y su público apasionado.",
        trackFeatures: "Diseño muy rápido, con curvas como Maggots, Becketts y Chapel que ponen a prueba la aerodinámica y el coraje de los pilotos.",
        overtakingSpots: "Las mejores oportunidades están en las zonas de frenado de Brooklands y Stowe, gracias a las largas rectas que preceden a estas curvas.",
        iconicCorners: "Copse, Maggots-Becketts-Chapel, Stowe y Club son algunas de las curvas más icónicas del campeonato.",
        historicalMoments: "1950 – Primera carrera del Campeonato Mundial de F1. 2008 – Victoria de Hamilton bajo la lluvia. 2021 – Contacto entre Hamilton y Verstappen en Copse.",
        curiosities: "El diseño ha sido modificado varias veces. El público británico es uno de los más cálidos y numerosos del campeonato."
      },
      fr: {
        headline: "Vitesse historique et virages emblématiques",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone est l'un des circuits les plus historiques de la F1, né sur un ancien aérodrome militaire. Il est célèbre pour ses virages rapides et son public passionné.",
        trackFeatures: "Un tracé très rapide, avec des virages comme Maggots, Becketts et Chapel qui mettent à l'épreuve l'aérodynamique et le courage des pilotes.",
        overtakingSpots: "Les meilleures opportunités sont aux zones de freinage de Brooklands et Stowe, grâce aux longues lignes droites qui précèdent ces virages.",
        iconicCorners: "Copse, Maggots-Becketts-Chapel, Stowe et Club sont parmi les virages les plus emblématiques du championnat.",
        historicalMoments: "1950 – Première course du Championnat du Monde de F1. 2008 – Victoire de Hamilton sous la pluie. 2021 – Contact entre Hamilton et Verstappen à Copse.",
        curiosities: "Le tracé a été modifié plusieurs fois. Le public britannique est l'un des plus chaleureux et nombreux du championnat." 
      },
      de: {
        headline: "Historische Geschwindigkeit und ikonische Kurven",
        technicalData: TECHNICAL_DATA_SILVERSTONE_EN,
        presentation: "Silverstone ist eine der historischsten Strecken in der F1, entstanden auf einem ehemaligen Militärflugplatz. Es ist berühmt für seine schnellen Kurven und leidenschaftlichen Fans.",
        trackFeatures: "Sehr schnelles Layout, mit Kurven wie Maggots, Becketts und Chapel, die die Aerodynamik und den Mut der Fahrer testen.",
        overtakingSpots: "Die besten Möglichkeiten sind in den Bremszonen von Brooklands und Stowe, dank der langen Geraden, die zu diesen Kurven führen.",
        iconicCorners: "Copse, Maggots-Becketts-Chapel, Stowe und Club gehören zu den ikonischsten Kurven des Rennkalenders.",
        historicalMoments: "1950 – Erstes Rennen der F1-Weltmeisterschaft. 2008 – Sieg von Hamilton im Regen. 2021 – Kontakt zwischen Hamilton und Verstappen in Copse.",
        curiosities: "Das Layout wurde mehrfach geändert. Das britische Publikum ist eines der herzlichsten und zahlreichsten im Rennkalender."
      },
    }
  }
};

function fallbackStoryIt(circuitName) {
  return {
    headline: "Profilo storico in aggiornamento",
    history: `${circuitName} ha una propria identita tecnica e strategica: questa sezione verra arricchita con approfondimenti dedicati.`,
    iconicMoment:
      "Intanto puoi usare le statistiche live del modello per individuare i piloti e i team con il miglior fit su questa pista.",
    trivia: [
      "Controlla la copertura dati storica prima di decidere la formazione.",
      "Confronta top driver e top costruttori per capire il rischio della scelta.",
    ],
  };
}

function fallbackStoryEn(circuitName) {
  return {
    headline: "Historical profile in progress",
    history: `${circuitName} has a clear technical identity; this section will be expanded with dedicated editorial insights.`,
    iconicMoment:
      "In the meantime, use the model stats to identify drivers and teams with the strongest track fit.",
    trivia: [
      "Check historical data coverage before finalizing your lineup.",
      "Compare top drivers and top constructors to balance risk.",
    ],
  };
}

export function getCircuitStory(circuitRef, language, circuitName) {
  const languageCode = typeof language === "string" ? language : "it";
  const selected = CIRCUIT_STORIES[circuitRef];
  const fallbackName = circuitName || "Questo circuito";

  if (!selected) {
    const fallback = languageCode === "en" ? fallbackStoryEn(fallbackName) : fallbackStoryIt(fallbackName);
    return { ...fallback, isFallback: true };
  }

  const localized = selected[languageCode] || selected.it || selected.en;
  return { ...localized, isFallback: false };
}
