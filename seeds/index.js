const mongoose = require("mongoose")
const Campground = require('../models/campground');
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '620176dea1bb4281e1c38a31',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/df4l3cxnn/image/upload/v1644431340/YelpCamp/mjfh51sjpiwmmx87tvhk.jpg',
                    filename: 'YelpCamp/mjfh51sjpiwmmx87tvhk',
                },
                {
                    url: 'https://res.cloudinary.com/df4l3cxnn/image/upload/v1644431341/YelpCamp/fxso9w1h0q9xgbnkhxgl.jpg',
                    filename: 'YelpCamp/fxso9w1h0q9xgbnkhxgl',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident totam dolore accusamus voluptatibus delectus necessitatibus dolorum soluta labore assumenda incidunt, minus excepturi quasi laudantium quaerat, itaque a, saepe laborum. Doloribus? Minus ratione beatae corporis asperiores esse odit distinctio obcaecati ex temporibus? Placeat maxime commodi esse vitae temporibus modi odit iure impedit excepturi beatae, dolor deserunt. Adipisci unde quaerat rem perspiciatis.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
