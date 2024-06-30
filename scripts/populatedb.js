// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("../models/category");
const Item = require("../models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function createCategory(index, name, description) {
    const categoryDetail = {
        name: name,
        description: description
    };
    const category = new Category(categoryDetail);

    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function createItem(name, description, category, price, number_in_stock) {
    const itemDetail = {
        name: name,
        description: description,
        category: category,
        price: price,
        number_in_stock: number_in_stock
    };
    const item = new Item(itemDetail);

    await item.save();
    console.log(`Added item: ${name}`);
}

async function createCategories() {
    console.log("Adding categories");
    
    await Promise.all([
        createCategory(0, "Sets", "Various styles of chess boards and pieces, for tournament and casual players"),
        createCategory(1, "Clocks", "High-quality chess clocks - from analog to digital, and touch to button"),
        createCategory(2, "Books", "Expand your chess knowledge and become a stonger player by reading these classics"),
        createCategory(3, "Miscellaneous", "Accessories perfect for a tournament player"),
    ]);
}

async function createItems() {
    console.log("Adding items");

    // Create sets
    await Promise.all([
        createItem("Tournament Chess Pieces and Board - Single Weighted", "Vinyl, 2.25 inch squares", categories[0], 15.95, 5),
        createItem("Tournament Chess Pieces and Board - Solid Plastic", "Vinyl, 2.25 inch squares", categories[0], 16.95, 5),
        createItem("Tournament Chess Pieces and Board - Triple Weighted", "Vinyl, 2.25 inch squares", categories[0], 19.95, 5),
        createItem("Tournament Chess Pieces and Silicone Board - Single Weighted", "Silicone, 2.25 inch squares", categories[0], 19.95, 5),
        createItem("Tournament Chess Pieces and Silicone Board - Triple Weighted", "Silicone, 2.25 inch squares", categories[0], 23.95, 5),
        createItem("Tournament Chess Pieces and Mousepad Board - Single Weighted", "Mouse pad, 2.25 inch squares", categories[0], 17.95, 5),
        createItem("Tournament Chess Pieces and Mousepad Board - Triple Weighted", "Mouse pad, 2.25 inch squares", categories[0], 21.95, 5),
        createItem("Wooden Chess Set", "Wooden", categories[0], 32.99, 5),
        createItem("Magnetic Wooden Chess Set", "15 inches, 2 extra queens, folding board", categories[0], 29.99, 5),
        createItem("Fine Glass Chess Set", "Glass", categories[0], 23.99, 5)
    ]);

    // Create clocks
    await Promise.all([
        createItem("DGT North American Digital Chess Clock", "10 pre-set time controls", categories[1], 54.95, 5),
        createItem("DGT 3000 Digital Chess Clock", "25 pre-set time controls", categories[1], 94.95, 5),
        createItem("DGT 3000 Digital Chess Clock - LIMITED EDITION", "25 pre-set time controls", categories[1], 94.95, 5),
        createItem("Chronos GX Digital Game Clock - Button", "8 preset tournament controls", categories[1], 109.95, 5),
        createItem("Chronos GX Digital Game Clock - Touch", "8 preset tournament controls", categories[1], 109.95, 5),
        createItem("ZMart Pro Digital Chess Clock", "Metal case", categories[1], 87.95, 5),
        createItem("Regulation Wooden Mechanical Chess Clock", "Quiet", categories[1], 26.95, 5),
        createItem("Regulation Plastic Mechanical Chess Clock", "Quiet", categories[1], 24.95, 5),
        createItem("INSA Wooden Mechanical Chess Clock", "Quiet", categories[1], 99.95, 5),
        createItem("BHB Special Mechanical Chess Clock", "Quiet", categories[1], 99.95, 5)
    ]);

    // Create books
    await Promise.all([
        createItem("My Great Predecessors (BUNDLE) by Garry Kasparov", "Legendary player", categories[2], 80.95, 5),
        createItem("My 60 Memorable Games by Bobby Fischer", "Greatest chess player", categories[2], 20.42, 5),
        createItem("My System by Aron Nimzowitsch", "Fundamentals of chess strategy", categories[2], 17.50, 5),
        createItem("Zurich International Chess Tournament, 1953 by David Bronstein", "Famous tournament", categories[2], 15.85, 5),
        createItem("How to Reassess Your Chess by Jeremy Silman", "Positional chess", categories[2], 24.01, 5),
        createItem("Think Like a Grandmaster by Alexander Kotov", "Grandmaster", categories[2], 0, 5),
        createItem("The Life and Games of Mikhail Tal by Mikhail Tal", "Greatest attacking player", categories[2], 19.97, 5),
        createItem("Art of Attack in Chess by Vladimir Vukovic", "Learn how to attack", categories[2], 18.99, 5),
        createItem("Dvoretsky's Endgame Manual by Mark Dvoretsky", "Improve your endgames", categories[2], 0, 5),
        createItem("Chess: 5334 Problems, Combinations, and Games by Laszlo Polgar", "Tactics and strategy puzzles", categories[2], 19.89, 5)
    ]);

    // Create miscellaneous items
    await Promise.all([
        createItem("Chess Players Score Pad", "50 sheets, spaces for 60 moves each game", categories[3], 2.95, 5),
        createItem("Softcover Quality Scorebook", "50 games, 100 moves and diagram", categories[3], 3.95, 5),
        createItem("Hardcover Chess Score Book", "100 chess games, each game holds 80 moves", categories[3], 6.95, 5),
        createItem("Luxury Hard Cover Scorebook", "100 games, 80 moves", categories[3], 11.95, 5),
        createItem("Basic Chess Bag", "8.5 inches x 6.5 inches", categories[3], 4.95, 5),
        createItem("Standard Chess Bag", "12 inches x 9 inches", categories[3], 6.95, 5),
        createItem("Quiver Chess Bag", "21 inches x 6 inches", categories[3], 7.95, 5),
        createItem("Competition Chess bag", "22.5 inches x 8.5 inches", categories[3], 11.95, 5),
        createItem("Chronos GX Clock Carrying Bag", "Heavily padded, hand strap", categories[3], 11.95, 5),
        createItem("Wedge Chsess Clock Bag", "Durable nylon, well padded, carrying handle", categories[3], 14.95, 5)
    ]);
}