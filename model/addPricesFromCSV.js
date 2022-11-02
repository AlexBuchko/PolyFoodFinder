const foodServices = require("./food-services");
const papa = require("papaparse");
const fs = require("fs");
const foodSchema = require("./food");

const main = () => {
    const foodsModel = foodServices
        .getDbConnection()
        .model("foods", foodSchema);
    //load in the csv
    const options = { header: true };
    const dataStream = fs.createReadStream("./grubhub prices.csv");
    const parseStream = papa.parse(papa.NODE_STREAM_INPUT, options);

    dataStream.pipe(parseStream);

    const lostData = [];

    parseStream.on("data", (chunk) => {
        let { name, restaurant, price } = chunk;
        name = name.toLowerCase();

        //set the id
        const filter = { name, restaurant };
        const update = { price };
        const result = foodsModel.findOneAndUpdate(filter, update).then((r) => {
            if (!r) {
                console.log({ filter, r });
            }
        });
    });

    console.log(lostData);
};

main();
