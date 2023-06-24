const sampleData = [
  {
    filters: [
      { title: "Country of Origin", column: "origin_1" },
      { title: "Roast Level", column: "roast" },
      { title: "Price", column: "100g_USD" },
      { title: "Rating", column: "rating" },
    ],
    kpis: [
      {
        title: "Average Price",
        javascriptFunction:
          "data => { let totalPrice = 0; let countPrice = 0; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price)) { totalPrice += price; countPrice += 1; } } }); return totalPrice / countPrice; }",
      },
      {
        title: "Average Rating",
        javascriptFunction:
          "data => { let totalRating = 0; let countRating = 0; data.forEach(row => { if(row['rating']) { const rating = Number((row['rating'] || '').replaceAll(',', '')); if(!isNaN(rating)) { totalRating += rating; countRating += 1; } } }); return totalRating / countRating; }",
      },
      {
        title: "Max Price",
        javascriptFunction:
          "data => { let maxPrice = 0; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price) && price > maxPrice) { maxPrice = price; } } }); return maxPrice; }",
      },
      {
        title: "Min Price",
        javascriptFunction:
          "data => { let minPrice = Infinity; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price) && price < minPrice) { minPrice = price; } } }); return minPrice; }",
      },
    ],
    charts: [
      {
        title: "Origin of the Coffee",
        chartType: "pieChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['origin_1']) { if(result[row['origin_1']]) { result[row['origin_1']] += 1; } else { result[row['origin_1']] = 1; } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values.slice(0, 5); }",
      },
      {
        title: "Distribution of Roast Levels",
        chartType: "pieChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['roast']) { if(result[row['roast']]) { result[row['roast']] += 1; } else { result[row['roast']] = 1; } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values; }",
      },
      {
        title: "Price Distribution",
        chartType: "barChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price)) { const priceRange = Math.floor(price); let priceRangeString = String(priceRange); if(priceRangeString.length === 3) { priceRangeString = '0' + priceRangeString[0] + '+'; } else { priceRangeString = priceRangeString[0] + '-' + priceRangeString[0] + priceRangeString[1] } if(result[priceRangeString]) { result[priceRangeString] += 1; } else { result[priceRangeString] = 1; } } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values; }",
      },
      {
        title: "Rating Distribution",
        chartType: "barChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['rating']) { const rating = Number((row['rating'] || '').replaceAll(',', '')); if(!isNaN(rating)) { const ratingRange = Math.floor(rating); if(result[ratingRange]) { result[ratingRange] += 1; } else { result[ratingRange] = 1; } } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values; }",
      },
      {
        title: "Roasters and Ratings",
        chartType: "treemapChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['roaster'] && row['rating']) { const rating = Number((row['rating'] || '').replaceAll(',', '')); if(!isNaN(rating)) { if(result[row['roaster']]) { result[row['roaster']].push(rating); } else { result[row['roaster']] = [rating]; } } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { const avgRating = result[key].reduce((a, b) => a + b) / result[key].length; values.push({ x: key, y: avgRating }); } } return values.slice(0, 10); }",
      },
    ],
  },
]
export const promptTemplate = `
`;

export const promptGPT35TurboTemplate = `${promptTemplate}
  The following topics should be considered:
  - Reply only in JSON format
  - Javascript functions should be in string format, without any whitespace characters
  - Getting Unexpected non-whitespace character after JSON please try to avoid this
  - Can You Please Generate Answers Based On the Sample 
  {
    filters: [
      { title: "Country of Origin", column: "origin_1" },
      { title: "Roast Level", column: "roast" },
      { title: "Price", column: "100g_USD" },
      { title: "Rating", column: "rating" },
    ],
    kpis: [
      {
        title: "Average Price",
        javascriptFunction:
          "data => { let totalPrice = 0; let countPrice = 0; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price)) { totalPrice += price; countPrice += 1; } } }); return totalPrice / countPrice; }",
      },
      {
        title: "Average Rating",
        javascriptFunction:
          "data => { let totalRating = 0; let countRating = 0; data.forEach(row => { if(row['rating']) { const rating = Number((row['rating'] || '').replaceAll(',', '')); if(!isNaN(rating)) { totalRating += rating; countRating += 1; } } }); return totalRating / countRating; }",
      },
      {
        title: "Max Price",
        javascriptFunction:
          "data => { let maxPrice = 0; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price) && price > maxPrice) { maxPrice = price; } } }); return maxPrice; }",
      },
      {
        title: "Min Price",
        javascriptFunction:
          "data => { let minPrice = Infinity; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price) && price < minPrice) { minPrice = price; } } }); return minPrice; }",
      },
    ],
    charts: [
      {
        title: "Origin of the Coffee",
        chartType: "pieChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['origin_1']) { if(result[row['origin_1']]) { result[row['origin_1']] += 1; } else { result[row['origin_1']] = 1; } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values.slice(0, 5); }",
      },
      {
        title: "Distribution of Roast Levels",
        chartType: "pieChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['roast']) { if(result[row['roast']]) { result[row['roast']] += 1; } else { result[row['roast']] = 1; } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values; }",
      },
      {
        title: "Price Distribution",
        chartType: "barChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['100g_USD']) { const price = Number((row['100g_USD'] || '').replaceAll(',', '')); if(!isNaN(price)) { const priceRange = Math.floor(price); let priceRangeString = String(priceRange); if(priceRangeString.length === 3) { priceRangeString = '0' + priceRangeString[0] + '+'; } else { priceRangeString = priceRangeString[0] + '-' + priceRangeString[0] + priceRangeString[1] } if(result[priceRangeString]) { result[priceRangeString] += 1; } else { result[priceRangeString] = 1; } } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values; }",
      },
      {
        title: "Rating Distribution",
        chartType: "barChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['rating']) { const rating = Number((row['rating'] || '').replaceAll(',', '')); if(!isNaN(rating)) { const ratingRange = Math.floor(rating); if(result[ratingRange]) { result[ratingRange] += 1; } else { result[ratingRange] = 1; } } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { values.push({ x: key, y: result[key] }); } } return values; }",
      },
      {
        title: "Roasters and Ratings",
        chartType: "treemapChart",
        javascriptFunction:
          "data => { let result = {}; data.forEach(row => { if(row['roaster'] && row['rating']) { const rating = Number((row['rating'] || '').replaceAll(',', '')); if(!isNaN(rating)) { if(result[row['roaster']]) { result[row['roaster']].push(rating); } else { result[row['roaster']] = [rating]; } } } }); let values = []; for(let key in result) { if(result.hasOwnProperty(key)) { const avgRating = result[key].reduce((a, b) => a + b) / result[key].length; values.push({ x: key, y: avgRating }); } } return values.slice(0, 10); }",
      },
    ],
  },
`;
