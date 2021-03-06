require('dotenv').config();
// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Place = require("../models/Place")

const bcryptSalt = 10;

mongoose
 .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
 .then(x => {
   console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
 })
 .catch(err => {
   console.error('Error connecting to mongo', err)
 });


const places = [
  {
    name: "Fábulas",
    address: "Calçada Nova de São Francisco, 14",
    postCode: "1200-300",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Fabulas.jpg",
    contactNumb: 216018472,
    websiteURL: "http://www.fabulas.pt",
    category: "Restaurant",
    description: "",
    warning: "Not suitable for claustrophobic dogs, or dogs that chew on furniture."
  },
  {
    name: "KAFFEEHAUS",
    address: "Rua Anchieta, 3",
    postCode: "1200-023",
    neighbourhood: "Lisboa",
    pictureURL: "/images/J/Kaffeehaus.jpg",
    contactNumb: 210956828,
    websiteURL: "http://www.kaffeehaus-lisboa.com/",
    category: "Restaurant",
    description: "",
    warning: "Dogs only allowed on the esplanade (outside). Be aware that there are roads nearby. Keep your dog on a leash, always." ,
  },
  {
    name: "Boutik",
    address: "Rua de Sao Bento, 106D",
    postCode: "1200-816",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Boutik.jpg",
    contactNumb: 213960773,
    websiteURL: "https://www.boutiklisboa.com/",
    category: "Restaurant",
    description: "",
    warning: "Not suitable for dogs that don't feel comfortable around other people/dogs",
  },
  {
    name: "Quiosque Avenida de Roma",
    address: "Jardim Fernando Pessa (Av. Roma)",
    postCode: "1000-265",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/QuiosqueAvenidaDeRoma.jpg",
    contactNumb: 927376619,
    websiteURL: "https://www.facebook.com/quiosqueavenidaroma",
    category: "Restaurant",
    description: "",
    warning: "This is an outdoor café. Be aware that there are roads nearby, keep your dog on a leash always.",
  },
  {
    name: "Noobai",
    address: "Miradouro de Santa Catarina (Adamastor)",
    postCode: "1200-401",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Noobai.jpg",
    contactNumb: 213465014,
    websiteURL: "http://www.noobaicafe.com/",
    category: "Restaurant",
    description: "",
    warning: "This is an outdoor café. Be aware that there are roads nearby, keep your dog on a leash always.",
  },
  {
    name: "Café  na Fábrica -  Lx Factory",
    address: "Lx Factory, Building E, R. Rodrigues de Faria 103",
    postCode: "1300-501",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/CafeDaFabrica.jpg",
    contactNumb: 214011807,
    websiteURL: "https://www.facebook.com/cafedafabrica/",
    category: "Restaurant",
    description: "",
    warning: "none",
  },
  {
    name: "Cozinha Popular da Mouraria",
    address: "Rua das Olarias, 5",
    postCode: "1100-377",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/CozinhaPopulardaMourria.jpg",
    contactNumb: 926520568,
    websiteURL: "https://www.facebook.com/CozinhaPopularDaMouraria",
    category: "Restaurant",
    description: "",
    warning: "none",
  },
  {
    name: "O Vilhão",
    address: "Rua Major Afonso Palla, 15D",
    postCode: "1495-001",
    neighbourhood: "Algés",
    pictureURL: "/images/J/OVilhao.jpg",
    contactNumb: 210191305,
    websiteURL: "https://www.zomato.com/pt/grande-lisboa/o-vilh%C3%A3o-alg%C3%A9s-lisboa/photos?category=all",
    category: "Restaurant",
    description: "",
    warning: "Dogs only allowed on the esplanade (outside). Be aware that there are roads nearby. Keep your dog on a leash, always. Always contact the place directly, to confirm details are up to date." ,
  },
  {
    name: "28 Café",
    address: "Rua de Santa Cruz do Castelo number 45 to 47A",
    postCode: "1100-479",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/28Cafe.jpg",
    contactNumb: 218860119,
    websiteURL: "https://www.facebook.com/28cafelisboa-173095969514482/",
    category: "Restaurant",
    description: "",
    warning: "Dogs only allowed on the esplanade (outside). Be aware that there are roads nearby. Keep your dog on a leash, always. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Belem 2 A 8",
    address: "R. de Belém 2",
    postCode: "1300-004",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/belem-2-a-8.jpg",
    contactNumb: 213639055,
    websiteURL: "http://restaurantebelem2a8.com/",
    category: "Restaurant",
    description: "",
    warning: "Always contact the place directly, to confirm details are up to date." ,
  },
  {
    name: "TRYP Lisboa Oriente Hotel",
    address: "Av. D. João II Lote 1.16 02.B",
    postCode: "1990-083",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/TrypLisboaOrienteHotel.jpg",
    contactNumb: 218930000,
    websiteURL: "https://www.tryporiente.com/",
    category: "Accomodation",
    group: "Hotel",
    description: "",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "InterContinental Lisbon",
    address: "Rua Castilho, 149",
    postCode: "1099-034",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/InterContinentalLisbon.jpg",
    contactNumb: 213818700,
    websiteURL: "https://www.ihg.com/intercontinental/",
    category: "Accomodation",
    group: "Hotel",
    description: "",
    warning: "Pet fee charged. Big dogs allowed. One pet Maximum. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Four Seasons Ritz Lisbon",
    address: "Rua Rodrigo Da Fonseca 88",
    postCode: "1099",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/HotelRitz.jpg",
    contactNumb: 213811400,
    websiteURL: "https://www.fourseasons.com/lisbon/",
    category: "Accomodation",
    group: "Hotel",
    description: "",
    warning: "Small pets only - allows 2 pets up to 7kg for no additional fee. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Novotel Lisboa",
    address: " Avenida José Malhoa 1 1A",
    postCode: "1099-051",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/NovotelLisboa.jpg",
    contactNumb: 217244800,
    websiteURL: "https://www.accorhotels.com/gb/hotel-0784-novotel-lisboa/index.shtml",
    category: "Accomodation",
    group: "Hotel",
    description: "",
    warning: "Pet fee charged. Big Dogs allowed. 2+ Pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Residencial João XXI",
    address: "Rua Gomes Freire 179, 1",
    postCode: "1150-177",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/ResidencialJoaoXXI.jpeg",
    contactNumb: 213155018,
    websiteURL: "http://www.joaoxxiresidencial.com/",
    category: "Accomodation",
    group: "Guesthouse",
    description: "",
    warning: "Pet fee charged. Small dogs only. One pet Maximum. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Chiado InSuites 100",
    address: "R. do Carmo 27",
    postCode: "1200-093",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/ChiadoInSuites100.JPEG",
    contactNumb: 000000,
    websiteURL: "http://www.chiadoinsuites100.spotportugal-pt.site/",
    category: "Accomodation",
    group: "Apartment",
    description: "",
    warning: "Pet fee charged. Big Dogs Allowed. 2+ Pets Allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Alfama Patio Hostel",
    address: "Escolas Gerais 3, Patio dos Quintalinhos, 1",
    postCode: "1100-213",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/AlfamaPatioHostel.jpeg",
    contactNumb: 218883127,
    websiteURL: "https://www.facebook.com/pages/Alfama-Patio-Hostel/123631741046292",
    category: "Accomodation",
    group: "Hostel",
    description: "",
    warning: "Pet fee charged. Big Dogs allowed. 2+ Pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Pensão São João da Praca",
    address: "R. de São João da Praça, 97",
    postCode: "1100-585",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/PensaoSaoJoaoDaPraca.jpg",
    contactNumb: 218862591,
    websiteURL: "https://www.booking.com/hotel/pt/pensao-sao-joao-da-praca.html",
    category: "Accomodation",
    group: "Guesthouse",
    description: "",
    warning: "No pet fee. Big dogs allowed. 2+ pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Portuguese Living Castelo",
    address: "Travessa do Chão da Feira 11, rés-do-chão",
    postCode: "1100-104",
    neighbourhood: "Santa Maria Maior, Lisbon",
    pictureURL: "/images/J/PortugueseLivingCastelo.jpg",
    contactNumb: 211914457,
    websiteURL: "http://www.portugueseliving.com/Lisbon-Apartment-Castelo-Terrace.html",
    category: "Accomodation",
    group: "Apartment",
    description: "",
    warning: "No pet fee. Big dogs allowed. 2+ pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Carcavelos Surf Hostel",
    address: "Rua Lourenço Marques, 5",
    postCode: "2775-601",
    neighbourhood: "Cascais",
    pictureURL: "/images/J/CarcavelosSurfHostel.jpeg",
    contactNumb: 911928003,
    websiteURL: "http://carcavelossurfhostel.com/",
    category: "Accomodation",
    group: "Hostel",
    description: "",
    warning: "Carcavelos Surf Hostel welcomes dogs of any size for no additional fee. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Clínica Veterinária João XXI",
    address: "Av. João xxi, 18 c/v",
    postCode: "1000-302",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/ClinicaVeterinariaJoaoXXI.png",
    contactNumb: 218489230,
    websiteURL: "http://www.clinicaveterinaria.com.pt/",
    category: "Veterinarian",
    description: "",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Clínica Veterinária Alta de Lisboa",
    address: "R. Helena Vaz da Silva, 4C",
    postCode: "1750-429",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/ClinicaVeterinariaDeLisboa.jpeg",
    contactNumb: 217552868,
    websiteURL: "http://www.vet-altalisboa.pt/",
    category: "Veterinarian",
    description: "",
    warning: "They have an emergency advice helpline, available 24h. Check their websiteURL for further details. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "LowCost Veterinários",
    address: "Rua Artilharia 1, 118",
    postCode: "1070-293",
    neighbourhood: "Lisboa",
    pictureURL: "/images/J/LowcostVeterinarios.jpeg",
    contactNumb: 212255084,
    websiteURL: "www.lowcostveterinarios.pt",
    category: "Veterinarian",
    description: "",
    warning: "WebsiteURL only in Portuguese. They have an emergency helpline. Check their websiteURL for further details. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "CoolVet",
    address: "R. Borges Grainha 11",
    postCode: "1170-302",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/CoolVet.png",
    contactNumb: 218122486,
    websiteURL: "https://www.facebook.com/CoolVetCentroVeterinario/",
    category: "Veterinarian",
    description: "",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Clínica Veterinária Restelo Vet",
    address: "R. Duarte Pacheco Pereira 5A-B",
    postCode: "1400-139",
    neighbourhood: "Lisboa",
    pictureURL: "/images/J/ResteloVet.jpeg",
    contactNumb: 213011370,
    websiteURL: "http://www.restelovet.pt/",
    category: "Veterinarian",
    description: "",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário de Lisboa",
    address: "123 Rua Manuel Rodrigues da Silva, 2 B/C ",
    postCode: "1600-503",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/HospitalVeterinarioDeLisboa.png",
    contactNumb: 217168548,
    websiteURL: "https://hospitalveterinario.eu/",
    category: "Hospital",
    description: "",
    warning: "WebsiteURL only in Portuguese. Open 24h. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Veterinary Hospital Restelo",
    address: "R. Gregório Lopes Lote 1513 - Store E",
    postCode: "1400-195",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/HospitalVeterinarioDoRestelo.png",
    contactNumb: 213032119,
    websiteURL: "https://www.hospitalveterinario.pt/en/home",
    category: "Hospital",
    description: "",
    warning: "Open 24h. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário de São Bento",
    address: "R. de São Bento 358-A",
    postCode: "1200-822",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/HotpitalVeterinarioDeSaoBento.png",
    contactNumb: 213972997,
    websiteURL: "https://veterinario.pt/",
    category: "Hospital",
    description: "",
    warning: "Emergency services open 24h. Check WebsiteURL for further information. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário da Estefânia",
    address: "R. Alm. Barroso 17 A",
    postCode: "1000-012",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/HospitalVeterinarioDaEstefania.jpeg",
    contactNumb: 213515030,
    websiteURL: "https://www.facebook.com/pages/Hospital-Veterinario-da-Estefania/223335257797501",
    category: "Hospital",
    description: "",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário Laranjeiras",
    address: "R. São Tomás de Aquino 8C",
    postCode: "1600-223",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/HospitalVeterinarioDasLaranjeiras.jpeg",
    contactNumb: 217270945,
    websiteURL: "https://www.vetlaranjeiras.com/m/pt/home/",
    category: "Hospital",
    description: "",
    warning: "WebsiteURL in Portuguese Only. Has 24h emergency service. Always contact the place directly, to confirm details are up to date.",
  },
  // Public Transportation
  {
    name: "CP",
    address: "/",
    postCode: "",
    neighbourhood: "Mainland Portugal",
    pictureURL: "/images/D/cp.jpg",
    contactNumb: 707210220,
    websiteURL: "https://www.cp.pt/passageiros/en",
    category: "Public Transportation",
    group: "Train",
    warning: "The transportation of unconditioned dogs is allowed through the purchase of a proper transport ticket, corresponding to the train you use, in the following trains: Alfa Pendular e Intercidades: requires payment of a full ticket; Regional e InterRegional: requires payment of half a ticket. In the urban trains of Lisbon, Porto and Coimbra the transportation is free. Under these conditions, the animal must be properly muzzled, with a short leash, accompanied by its up-to-date vaccination record and the relevant permit. To ensure the welfare and comfort of all Customers, the animal can not occupy a seat in the train."
  },
  {
    name: "Carris",
    address: "/",
    postCode: "",
    neighbourhood: "Lisbon district",
    pictureURL: "/images/D/carris.png",
    contactNumb: 213613000,
    websiteURL: "http://www.carris.pt/en/home/",
    category: "Public Transportation",
    group: "Metro, bus and tramway",
    warning: "Animals are only allowed if they are properly packed. Properly packaged transport is understood to mean transportation in clean, well-maintained containers, made of durable, washable, easily disinfected and watertight material. These boxes must be transported as hand-luggage and placed in designated places. Transport of dangerous or potentially dangerous animals is not permitted."
  },
  {
    name: "Rede Expressos",
    address: "/",
    postCode: "",
    neighbourhood: "Mainland Portugal",
    pictureURL: "/images/D/rede-expressos.jpg",
    contactNumb: 707223344,
    websiteURL: "https://www.rede-expressos.pt/en",
    category: "Public Transportation",
    group: "Express Bus",
    warning: "Pets allowed only properly packed in appropriate box and present in proper state of health and hygiene. Subject to the payment of half a ticket for the trip to be made. The animal can not occupy a seat in the bus. Only small animals which, due to their size, weight and characteristics, can be properly packed in the appropriate places and do not constitute a risk or inconvenience to other passengers."
  },
  {
    name: "Fertagus",
    address: "/",
    postCode: "",
    neighbourhood: "Lisbon district - North/South Railway Axis",
    pictureURL: "/images/D/fertagus.jpg",
    contactNumb: 211066363,
    websiteURL: "https://www.fertagus.pt/en",
    category: "Public Transportation",
    group: "Train",
    warning: "Passengers are allowed to carry pet animals free of charge provided that they are properly enclosed in an appropriate container that can be transported as a hand volume. Each passenger is only allowed to carry one animal. It is also permissible to transport dogs not enclosed outside the peak hours, provided they do not fall into the category of dangerous or potentially dangerous breeds, are properly muzzled, contained on the short leash and accompanied by their updated Vaccine Bulletin and its license. Hazardous and potentially dangerous animals, as defined in their own legislation, can not be displaced by public transport."
  },
  {
    name: "Transtejo Soflusa",
    address: "/",
    postCode: "",
    neighbourhood: "Lisbon district",
    pictureURL: "/images/D/ttsl.jpg",
    contactNumb: 808203050,
    websiteURL: "https://ttsl.pt/",
    category: "Public Transportation",
    group: "Boat",
    warning: "Animals must be conditioned in a box or similar, or with out it but properly muzzled and with a short leash, so as not to disturb or frighten other passengers. The animals should be in an adequate state of health and hygiene and should not show obvious signs of contagious and parasitic disease. Only one pet is allowed per passenger. The pet may not occupy a sitting position (including the transport box). Animals weighing less than 5 kg do not pay a ticket."
  },
  {
    name: "Rodoviária de Lisboa",
    address: "/",
    postCode: "",
    neighbourhood: "Lisbon",
    pictureURL: "/images/D/rl.png",
    contactNumb: 217928180,
    websiteURL: "https://www.rodoviariadelisboa.pt/#tab0",
    category: "Public Transportation",
    group: "Bus",
    warning: "Passengers are allowed to transport pet animals free of charge provided they are properly enclosed in an appropriate container that can be transported as a hand luggage."
  },
  // Pet shop
  { 
    name: "Ornimundo do Campo Pequeno",
    address: "Centro de Lazer Campo Pequeno, Loja 124",
    postCode: "1000-082",
    neighbourhood: "Lisbon",
    pictureURL: "/images/D/ornimundo.jpg",
    contactNumb: 210437832,
    websiteURL: "https://www.ornimundo.com/pt/",
    category: "Pet shop",
    warning: "Open everyday from 10am until 11pm"
  },
  {
    name: "Ornimundo de Lisboa",
    address: "Gare do Oriente, Lojas G117 e G118 - Av. João II, Estação do Oriente, Lote 1.15",
    postCode: "1990-233",
    neighbourhood: "Lisbon",
    pictureURL: "/images/D/ornimundo.jpg",
    contactNumb: 218941186,
    websiteURL: "https://www.ornimundo.com/pt/",
    category: "Pet shop",
    warning: "Open everyday from 10am until 11pm"
  },
  {
    name: "PETOUTLET – LISBOA-ROMA",
    address: "Rua Dr.Gama Barros Nº 25-A",
    postCode: "1700-143",
    neighbourhood: "Lisbon",
    pictureURL: "/images/D/petoutlet.png",
    contactNumb: 935893451,
    websiteURL: "https://www.petoutlet.pt/",
    category: "Pet shop",
    warning: "Open from Monday to Friday - from 9.30am until 7.30pm; Saturday - from 9am until 6pm; Sunday: closed"
  },
  {
    name: "PETOUTLET – LISBOA-FANQUEIROS",
    address: "Rua dos Fanqueiros, Nº208",
    postCode: "1149-031",
    neighbourhood: "Lisbon",
    pictureURL: "/images/D/petoutlet.png",
    contactNumb: 934034213,
    websiteURL: "https://www.petoutlet.pt/",
    category: "Pet shop",
    warning: "Open from Monday to Friday - from 9.30am until 7.30pm; Saturday - from 9am until 6pm; Sunday: closed"
  },
  {
    name: "PETOUTLET – OEIRAS",
    address: "Rua de Macau nº32",
    postCode: "2780-031",
    neighbourhood: "Oeiras-Lisbon",
    pictureURL: "/images/D/petoutlet.png",
    contactNumb: 938566743,
    websiteURL: "https://www.petoutlet.pt/",
    category: "Pet shop",
    warning: "Open from Monday to Friday - from 9.30am until 7.30pm; Saturday - from 9am until 6pm; Sunday: closed"
  },
  // Dog grooming
  {
    name: "Cabeleireiro do cão",
    address: "Rua 4 de Outubro, Lj 7 -A, Bairro da Carochia",
    postCode: "2620-206",
    neighbourhood: "Ramada-Lisbon",
    pictureURL: "/images/D/cabelcao.png",
    contactNumb: 936258503,
    websiteURL: "http://cabeleireirodocao.com/",
    category: "Dog grooming",
    warning: "Open from Monday to Saturday - 10am-1pm / 3pm-8pm - Sunday - closed"
  },
  {
    name: "Pet & Cia",
    address: "Av. Canto e Castro Lote46 Loja 4B",
    postCode: "2700-782",
    neighbourhood: "Amadora-Lisbon",
    pictureURL: "/images/D/petcia.png",
    contactNumb: 915255883,
    websiteURL: "https://petecia.pt/",
    category: "Dog grooming",
    warning: "Require prior appointment - Open everyday from 8am until 8pm"
  },
  {
    // SHOPPING
    name: "Alegro Alfragide",
    address: "Avenida dos Cavaleiros, nº60",
    postCode: "2790-045",
    neighbourhood: "Carnaxide, Lisboa",
    pictureURL: "/images/P/AlegroAlfragideDistribuicaoHoje.jpg",
    contactNumb: 210534935,
    website: "https://alegro.pt/alegro-alfragide",
    category: "Shopping",
    description: "As your dog is a citizen of the world, in Alegro there is an exclusive WC. To have a passport to access the mall you need some documentation: Identification document of the owner and / or responsible, bulletin of vaccination in day of the dog,  registration of the microchip (if the microchip number is not evidenced in the vaccination report) and municipal license in good standing and dog liability insurance.",
    warnings: "The malls are busy places, we do not advise these places to dogs that are not accustomed to much noise and movement.",
  }, 
  {
    // GARDEN
    name: "Parque canino do Campo Grande",
    address: "Jardim Mário Soares",
    postCode: "1700-162",
    neighbourhood: "Campo Grande, Lisboa",
    pictureURL: "/images/P/jardim.jpg",
    contactNumb: 0000,
    website: "http://www.cm-lisboa.pt/equipamentos/equipamento/info/jardim-mario-soares",
    category: "Garden",
    description: "This garden is also known as 'Jardim do campo grande', it's the biggest garden in the center of Lisbon.",
    warnings: ""
  }, 
  {
    name: "Dog Park",
    address: "Praça São João Bosco nº 558",
    postCode: "1350-297",
    neighbourhood: "Estrela, Lisboa",
    pictureURL: "/images/P/DogPark.jpg",
    contactNumb: 0000,
    website: "https://www.jf-estrela.pt/",
    category: "Garden",
    description: "This garden have a WC and a water font.",
    warnings: ""
  }, 
  {
    name: "Campo Mártires da Pátria",
    address: "Campo Mártires da Pátria nº 48",
    postCode: "1150-343",
    neighbourhood: "Lisboa",
    pictureURL: "/images/P/image.jpg",
    contactNumb: 0000,
    website: "https://www.tripadvisor.pt/Attraction_Review-g189158-d10620496-Reviews-Campo_dos_Martires_da_Patria-Lisbon_Lisbon_District_Central_Portugal.html",
    category: "Garden",
    description: "In this garden you have several obstacles, a water font and a bag dispenser.",
    warnings: ""
  }, 
  {
    name: "Jardim Fernando Pessoa",
    address: "Avenida de Roma nº 14",
    postCode: "1000-300",
    neighbourhood: "Areeiro, Lisboa",
    pictureURL: "/images/P/JardimFernandoPessa.jpg",
    contactNumb: 0000,
    website: "http://www.cm-lisboa.pt/zonas/centro/espacos-verdes/info/jardim-fernando-pessa",
    category: "Garden",
    description: "Jardim Fernando Pessoa is a small garden close to the Forúm Lisboa and Avenida de Roma. The name is a tribute for the artist Fernando Pessoa.",
    warnings: ""
  }, 
  {
    name: "Parque canino do Parque das Artes e do Desporto",
    address: "Mina de Água, antiga Lixeira da Boba ",
    postCode: "",
    neighbourhood: "Amadora, Lisboa",
    pictureURL: "/images/P/image(1).jpg",
    contactNumb: 0000,
    website: "https://www.timeout.pt/lisboa/pt/coisas-para-fazer/parque-das-artes-e-do-desporto",
    category: "Garden",
    description: "A perfect place to take a walk with your best friend",
    warnings: "",
  },
  {
    name: "Jardim da Quinta das Conchas",
    address: "Alameda das Linhas de Torres",
    postCode: "",
    neighbourhood: "Lumiar, Lisboa",
    pictureURL: "/images/P/ParqueDasConchas.jpg",
    contactNumb: 217594516,
    website: "http://www.cm-lisboa.pt/equipamentos/equipamento/info/parque-da-quinta-das-conchas-e-dos-lilases",
    category: "Garden",
    description: "This garden have a restaurant and many walking areas.",
    warnings: "",
  },
  {
    name: "Tapada das Necessidades",
    address: "Calçada Necessidades",
    postCode: "",
    neighbourhood: "Estrela, Lisboa",
    pictureURL: "/images/P/TapadaNecessidadesASC.jpg",
    contactNumb: 213932110,
    website: "http://www.cm-lisboa.pt/zonas/centro-historico/espacos-verdes/info/tapada-das-necessidades",
    category: "Garden",
    description: "This is a beautiful garden! You will find here a Lake, a waterfall and a statuary.",
    warnings: "",
  },

]

Place.deleteMany()
  .then(() => {
    return Place.create(places)
  })
  .then(placesCreated => {
    console.log(`${placesCreated.length} places created with the following id:`);
    console.log(placesCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

let users = [
  {
    name: "Alice",
    username: "alice",
    email: "alice@hotmail.com",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    role: "USER",
    location: "Lisbon",
    lastName: "",
    description: "",
    picture: "/images/P/smart.jpg",
    pet:"",
    numbPet: "",
    aboutPet: "",
  },
  {
    name: "Bob",
    username: "bob",
    email: "bob@hotmail.com",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    role: "USER",
    location: "Lisbon",
  },
  {
    name: "ADMIN",
    username: "ADMIN",
    password: bcrypt.hashSync("ADMIN", bcrypt.genSaltSync(bcryptSalt)),
    role: "ADMIN"
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })