// Bilingual (and multi-language) eras structure for Historic Drivers section
// Each era contains a key, driver list, and translation keys for title/description

export const HISTORIC_ERAS = [
  {
    key: "pioneers-mechanical-1950-1967",
    drivers: [
      { name: "Juan Manuel Fangio", nationality: "Argentina 🇦🇷", titles: 5, image: "juan_manuel_fangio.png", debutYear: 1950, titlesYears: [1951, 1954, 1955, 1956, 1957] },
      { name: "Alberto Ascari", nationality: "Italy 🇮🇹", titles: 2, image: "alberto_ascari.png", debutYear: 1950, titlesYears: [1952, 1953] },
      { name: "Giuseppe Farina", nationality: "Italy 🇮🇹", titles: 1, image: "giuseppe_farina.png", debutYear: 1950, titlesYears: [1950] },
      { name: "Jim Clark", nationality: "UK 🇬🇧", titles: 2, image: "jim_clark.png", debutYear: 1960, titlesYears: [1963, 1965] },
    ],
    titleKey: "historicDrivers.eras.pioneers-mechanical-1950-1967.title",
    descriptionKey: "historicDrivers.eras.pioneers-mechanical-1950-1967.description",
    shortDescriptionKey: "historicDrivers.eras.pioneers-mechanical-1950-1967.shortDescription",
  },
  {
    key: "aero-revolution-1968-1982",
    drivers: [
      { name: "Jackie Stewart", nationality: "UK 🇬🇧", titles: 3, image: "jackie_stewart.png", debutYear: 1965, titlesYears: [1969, 1971, 1973] },
      { name: "Emerson Fittipaldi", nationality: "Brazil 🇧🇷", titles: 2, image: "emerson_fittipaldi.png", debutYear: 1970, titlesYears: [1972, 1974] },
      { name: "Niki Lauda", nationality: "Austria 🇦🇹", titles: 3, image: "niki_lauda.png", debutYear: 1971, titlesYears: [1975, 1977, 1984] },
      { name: "James Hunt", nationality: "UK 🇬🇧", titles: 1, image: "james_hunt.png", debutYear: 1973, titlesYears: [1976] },
    ],
    titleKey: "historicDrivers.eras.aero-revolution-1968-1982.title",
    descriptionKey: "historicDrivers.eras.aero-revolution-1968-1982.description",
    shortDescriptionKey: "historicDrivers.eras.aero-revolution-1968-1982.shortDescription",
  },
  {
    key: "turbo-electronics-1983-1993",
    drivers: [
      { name: "Nelson Piquet", nationality: "Brazil 🇧🇷", titles: 3, image: "nelson_piquet.png", debutYear: 1978, titlesYears: [1981, 1983, 1987] },
      { name: "Alain Prost", nationality: "France 🇫🇷", titles: 4, image: "alain_prost.png", debutYear: 1980, titlesYears: [1985, 1986, 1989, 1993] },
      { name: "Nigel Mansell", nationality: "UK 🇬🇧", titles: 1, image: "nigel_mansell.png", debutYear: 1980, titlesYears: [1992] },
      { name: "Ayrton Senna", nationality: "Brazil 🇧🇷", titles: 3, image: "ayrton_senna.png", debutYear: 1984, titlesYears: [1988, 1990, 1991] },
    ],
    titleKey: "historicDrivers.eras.turbo-electronics-1983-1993.title",
    descriptionKey: "historicDrivers.eras.turbo-electronics-1983-1993.description",
    shortDescriptionKey: "historicDrivers.eras.turbo-electronics-1983-1993.shortDescription",
  },
  {
    key: "safety-domination-1994-2013",
    drivers: [
      { name: "Michael Schumacher", nationality: "Germany 🇩🇪", titles: 7, image: "michael_schumacher.png", debutYear: 1991, titlesYears: [1994, 1995, 2000, 2001, 2002, 2003, 2004] },
      { name: "Mika Häkkinen", nationality: "Finland 🇫🇮", titles: 2, image: "mika_hakkinen.png", debutYear: 1991, titlesYears: [1998, 1999] },
      { name: "Fernando Alonso", nationality: "Spain 🇪🇸", titles: 2, image: "fernando_alonso.png", debutYear: 2001, titlesYears: [2005, 2006] },
      { name: "Sebastian Vettel", nationality: "Germany 🇩🇪", titles: 4, image: "sebastian_vettel.png", debutYear: 2007, titlesYears: [2010, 2011, 2012, 2013] },
    ],
    titleKey: "historicDrivers.eras.safety-domination-1994-2013.title",
    descriptionKey: "historicDrivers.eras.safety-domination-1994-2013.description",
    shortDescriptionKey: "historicDrivers.eras.safety-domination-1994-2013.shortDescription",
  },
  {
    key: "hybrid-newgen-2014-present",
    drivers: [
      { name: "Nico Rosberg", nationality: "Germany 🇩🇪", titles: 1, image: "nico_rosberg.png", debutYear: 2006, titlesYears: [2016] },
      { name: "Lewis Hamilton", nationality: "UK 🇬🇧", titles: 7, image: "lewis_hamilton.png", debutYear: 2007, titlesYears: [2008, 2014, 2015, 2017, 2018, 2019, 2020] },
      { name: "Max Verstappen", nationality: "Netherlands 🇳🇱", titles: 3, image: "max_verstappen.png", debutYear: 2015, titlesYears: [2021, 2022, 2023] },
      { name: "Charles Leclerc", nationality: "Monaco 🇲🇨", titles: 0, image: "charles_leclerc.png", debutYear: 2018 },
      { name: "Lando Norris", nationality: "UK 🇬🇧", titles: 1, image: "lando_norris.png", debutYear: 2019, titlesYears: [2025] },
    ],
    titleKey: "historicDrivers.eras.hybrid-newgen-2014-present.title",
    descriptionKey: "historicDrivers.eras.hybrid-newgen-2014-present.description",
    shortDescriptionKey: "historicDrivers.eras.hybrid-newgen-2014-present.shortDescription",
  },
];
