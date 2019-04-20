// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Place = require("../models/Place")

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/pawsplaces', {useNewUrlParser: true})
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
    pictureURL: "/images/J/Fábulas.jpg",
    contactNumb: 216018472,
    websiteURL: "http://www.fabulas.pt",
    category: "Restaurant",
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
    warning: "Dogs only allowed on the esplanade (outside). Be aware that there are roads nearby. Keep your dog on a leash, always." ,
  },
  {
    name: "Boutik",
    address: "Rua de Sao Bento, 106D",
    postCode:  "1200-816",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Boutik.jpg",
    contactNumb: 213960773,
    websiteURL: "https://www.boutiklisboa.com/", 
    category: "Restaurant",
    warning: "Not suitable for dogs that don't feel comfortable around other people/dogs",
  },
  {
    name: "Quiosque Avenida de Roma",
    address: "Jardim Fernando Pessa (Av. Roma)",
    postCode: "1000-265",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Quiosque Avenida de Roma.jpg",
    contactNumb: 927376619,
    websiteURL: "https://www.facebook.com/quiosqueavenidaroma", 
    category: "Restaurant",
    warning: "This is an outdoor café. Be aware that there are roads nearby, keep your dog on a leash always.",
  },
  {
    name: "Noobai",
    address: "Miradouro de Santa Catarina (Adamastor)",
    postCode: "1200-401",
    neighbourhood:"Lisbon",
    pictureURL: "/images/J/Noobai.jpg" ,
    contactNumb: 213465014,
    websiteURL: "http://www.noobaicafe.com/", 
    category: "Restaurant",
    warning: "This is an outdoor café. Be aware that there are roads nearby, keep your dog on a leash always.",
  },
  {
    name: "Café  na Fábrica -  Lx Factory" ,
    address: "Lx Factory, Building E, R. Rodrigues de Faria 103",
    postCode: "1300-501",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Café da Fábrica.jpg",
    contactNumb: 214011807,
    websiteURL: "https://www.facebook.com/cafedafabrica/", 
    category: "Restaurant",
    warning: "none",
  },
  {
    name: "Cozinha Popular da Mouraria",
    address: "Rua das Olarias, 5",
    postCode: "1100-377",
    neighbourhood:"Lisbon",
    pictureURL: "/images/J/Cozinha Popular da Mourria.jpg" ,
    contactNumb: 926520568,
    websiteURL: "https://www.facebook.com/CozinhaPopularDaMouraria", 
    category: "Restaurant",
    warning: "none",
  },
  {
    name: "O Vilhão",
    address: "Rua Major Afonso Palla, 15D",
    postCode: "1495-001",
    neighbourhood: "Algés",
    pictureURL: "/images/J/O vilhão.jpg",
    contactNumb: 210191305,
    websiteURL: "https://www.zomato.com/pt/grande-lisboa/o-vilh%C3%A3o-alg%C3%A9s-lisboa/photos?category=all" , 
    category: "Restaurant",
    warning: "Dogs only allowed on the esplanade (outside). Be aware that there are roads nearby. Keep your dog on a leash, always. Always contact the place directly, to confirm details are up to date." ,
  },
  {
    name: "28 Café",
    address: "Rua de Santa Cruz do Castelo number 45 to 47A" ,
    postCode: "1100-479",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/28 Café.jpg",
    contactNumb: 218860119,
    websiteURL: "https://www.facebook.com/28cafelisboa-173095969514482/" , 
    category: "Restaurant",
    warning: "Dogs only allowed on the esplanade (outside). Be aware that there are roads nearby. Keep your dog on a leash, always. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Belem 2 A 8",
    address: "R. de Belém 2",
    postCode: "1300-004",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/belem-2-a-8.jpg" ,
    contactNumb: 213639055,
    websiteURL: "http://restaurantebelem2a8.com/", 
    category: "Restaurant",
    warning: "Always contact the place directly, to confirm details are up to date." ,
  },
  {
    name: "TRYP Lisboa Oriente Hotel",
    address: "Av. D. João II Lote 1.16 02.B" ,
    postCode: "1990-083" ,
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Tryp Lisboa Oriente Hotel.jpg",
    contactNumb: 218930000,
    websiteURL: "https://www.tryporiente.com/",
    category: "Accomodation - Hotel",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "InterContinental Lisbon",
    address: "Rua Castilho, 149" ,
    postCode: "1099-034",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/InterContinental Lisbon.jpg",
    contactNumb: 213818700,
    websiteURL: "https://www.ihg.com/intercontinental/",
    category: "Accomodation - Hotel",
    warning: "Pet fee charged. Big dogs allowed. One pet Maximum. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Four Seasons Ritz Lisbon",
    address: "Rua Rodrigo Da Fonseca 88",
    postCode: "1099",
    neighbourhood: "Lisbon",
    pictureURL: "/images/J/Hotel Ritz.jpg",
    contactNumb: 213811400,
    websiteURL: "https://www.fourseasons.com/lisbon/",
    category: "Accomodation - Hotel",
    warning: "Small pets only - allows 2 pets up to 7kg for no additional fee. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Novotel Lisboa",
    address: " Avenida José Malhoa 1 1A" ,
    postCode: "1099-051",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Novotel Lisboa.jpg",
    contactNumb: 217244800,
    websiteURL: "https://www.accorhotels.com/gb/hotel-0784-novotel-lisboa/index.shtml",
    category: "Accomodation - Hotel",
    warning: "Pet fee charged. Big Dogs allowed. 2+ Pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Residencial João XXI",
    address: "Rua Gomes Freire 179, 1" ,
    postCode: "1150-177",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Residencial Joao XXI.jpeg",
    contactNumb: 213155018,
    websiteURL: "http://www.joaoxxiresidencial.com/",
    category: "Accomodation - Guesthouse",
    warning: "Pet fee charged. Small dogs only. One pet Maximum. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Chiado InSuites 100",
    address: "R. do Carmo 27" ,
    postCode: "1200-093",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Chiado InSuites 100.JPEG",
    contactNumb: 000000,
    websiteURL: "http://www.chiadoinsuites100.spotportugal-pt.site/",
    category: "Accomodation - Apartment",
    warning: "Pet fee charged. Big Dogs Allowed. 2+ Pets Allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Alfama Patio Hostel",
    address: "Escolas Gerais 3, Patio dos Quintalinhos, 1" ,
    postCode: "1100-213",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Alfama Patio hostel.jpeg",
    contactNumb: 218883127,
    websiteURL: "https://www.facebook.com/pages/Alfama-Patio-Hostel/123631741046292",
    category: "Accomodation - Hostel",
    warning: "Pet fee charged. Big Dogs allowed. 2+ Pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Pensão São João da Praca",
    address: "R. de São João da Praça, 97" ,
    postCode: "1100-585",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Pensao Sao Joao da Praça.jpg",
    contactNumb: 218862591,
    websiteURL: "https://www.booking.com/hotel/pt/pensao-sao-joao-da-praca.html",
    category: "Accomodation - Guesthouse",
    warning: "No pet fee. Big dogs allowed. 2+ pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Portuguese Living Castelo",
    address: "Travessa do Chão da Feira 11, rés-do-chão" ,
    postCode: "1100-104",
    neighbourhood: "Santa Maria Maior, Lisbon" ,
    pictureURL: "/images/J/Portuguese Living Castelo.jpg",
    contactNumb: 211914457,
    websiteURL: "http://www.portugueseliving.com/Lisbon-Apartment-Castelo-Terrace.html",
    category: "Accomodation - Apartment",
    warning: "No pet fee. Big dogs allowed. 2+ pets allowed. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Carcavelos Surf Hostel",
    address: "Rua Lourenço Marques, 5" ,
    postCode: "2775-601",
    neighbourhood: "Cascais" ,
    pictureURL: "/images/J/Carcavelos Surf Hostel.jpeg",
    contactNumb: 911928003,
    websiteURL: "http://carcavelossurfhostel.com/",
    category: "Accomodation - Hostel",
    warning: "Carcavelos Surf Hostel welcomes dogs of any size for no additional fee. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Clínica Veterinária João XXI",
    address: "Av. João xxi, 18 c/v" ,
    postCode: "1000-302",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Clinica Veterinária Joao XXI.png",
    contactNumb: 218489230,
    websiteURL: "http://www.clinicaveterinaria.com.pt/",
    category: "Veterinarian",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Clínica Veterinária Alta de Lisboa",
    address: "R. Helena Vaz da Silva, 4C" ,
    postCode: "1750-429",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Clinica Veterinária de Lisboa.jpeg",
    contactNumb: 217552868,
    websiteURL: "http://www.vet-altalisboa.pt/",
    category: "Veterinarian",
    warning: "They have an emergency advice helpline, available 24h. Check their websiteURL for further details. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "LowCost Veterinários",
    address: "Rua Artilharia 1, 118" ,
    postCode: "1070-293",
    neighbourhood: "Lisboa" ,
    pictureURL: "/images/J/Lowcost Veterinários.jpeg",
    contactNumb: 212255084,
    websiteURL: "www.lowcostveterinarios.pt",
    category: "Veterinarian",
    warning: "WebsiteURL only in Portuguese. They have an emergency helpline. Check their websiteURL for further details. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "CoolVet",
    address: "R. Borges Grainha 11" ,
    postCode: "1170-302",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/CoolVet.png",
    contactNumb: 218122486,
    websiteURL: "https://www.facebook.com/CoolVetCentroVeterinario/",
    category: "Veterinarian",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Clínica Veterinária Restelo Vet",
    address: "R. Duarte Pacheco Pereira 5A-B" ,
    postCode: "1400-139",
    neighbourhood: "Lisboa" ,
    pictureURL: "/images/J/Restelo Vet.jpeg",
    contactNumb: 213011370,
    websiteURL: "http://www.restelovet.pt/",
    category: "Veterinarian",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário de Lisboa",
    address: "123 Rua Manuel Rodrigues da Silva, 2 B/C " ,
    postCode: "1600-503",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Hospital Veterinário de Lisboa.png",
    contactNumb: 217168548,
    websiteURL: "https://hospitalveterinario.eu/",
    category: "Hospital",
    warning: "WebsiteURL only in Portuguese. Open 24h. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Veterinary Hospital Restelo",
    address: "R. Gregório Lopes Lote 1513 - Store E",
    postCode: "1400-195",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Hospital veterinário do Restelo.png",
    contactNumb: 213032119,
    websiteURL: "https://www.hospitalveterinario.pt/en/home",
    category: "Hospital",
    warning: "Open 24h. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário de São Bento",
    address: "R. de São Bento 358-A" ,
    postCode:  "1200-822",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Hotpital veterinário de São Bento.png",
    contactNumb: 213972997,
    websiteURL: "https://veterinario.pt/",
    category: "Hospital",
    warning: "Emergency services open 24h. Check WebsiteURL for further information. Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário da Estefânia",
    address: "R. Alm. Barroso 17 A" ,
    postCode: "1000-012",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Hospital Veterinário da Estefânia.jpeg",
    contactNumb: 213515030,
    websiteURL: "https://www.facebook.com/pages/Hospital-Veterinario-da-Estefania/223335257797501",
    category: "Hospital",
    warning: "Always contact the place directly, to confirm details are up to date.",
  },
  {
    name: "Hospital Veterinário Laranjeiras",
    address: "R. São Tomás de Aquino 8C" ,
    postCode: "1600-223",
    neighbourhood: "Lisbon" ,
    pictureURL: "/images/J/Hospital Veterinario das Laranjeiras.jpeg",
    contactNumb: 217270945,
    websiteURL: "https://www.vetlaranjeiras.com/m/pt/home/",
    category: "Hospital",
    warning: "WebsiteURL in Portuguese Only. Has 24h emergency service. Always contact the place directly, to confirm details are up to date.",
  }
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
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
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