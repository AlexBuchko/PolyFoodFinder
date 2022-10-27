import csv
import json
filepath = "Nutrition Calculator - Cal Poly Campus Dining.csv"
reader = csv.DictReader(open(filepath))
keysToDrop = [
    'Soy Free',
    'Peanut Free',
    'Milk Free',
    'Gluten Free',
    'Shellfish Free',
    'TreeNuts Free',
    'Egg Free',
    'Pork Free',
    'Sesame Free',
    'Wheat Free',
    'Halal',
    'Kosher'
]

nutritionKeys = [
    "Calories",
    "Fat",
    "Sodium",
    "Carbs",
    "Fiber",
    "Sugar",
    "Protein"
]

boolKeys = [
    "Vegan",
    "Vegetarian"
]

data = []
for row in reader:
    #removing unused keys
    for key in keysToDrop:
        del row[key]
    
    #changing ingredients str to a list of ingredients
    nutritionInfo = {key.lower(): int(row[key] if row[key] else 0) for key in nutritionKeys}
    for key in nutritionKeys:
        del row[key]
    #changing from either 'TRUE" string or none to bool value
    for key in boolKeys:
        row[key] = True if row[key] else False
    row["nutrition"] = nutritionInfo
    row["likes"] = 0
    row["dislikes"] = 0
    row["poisonings"] = 0

    newRow = {}
    for key in row:
        newRow[key.lower()] = row[key] if row[key] else False
    data.append(newRow)

f = open("./nutrition.json", "w")
dumpedJson = json.dumps(data, indent=4)
f.write(dumpedJson)

