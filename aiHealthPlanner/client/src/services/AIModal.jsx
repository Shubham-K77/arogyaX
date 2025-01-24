/* eslint-disable no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan For Location: Pokhara, for 7 Days for Couple with a Cheap budget, Give me a Hotels option HotelName, HotelAddress, Price, Hotel image url, Geo Coordinates, rating, description and suggest itineary with details. Place Image Url, Geo Coordinates, ticket pricing, rating, Time for travel to each location for 7 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, here\'s a 7-day budget-friendly travel plan for a couple visiting Pokhara, Nepal, in JSON format, including hotel options, itinerary details, and estimated costs:\n\n```json\n{\n  "tripTitle": "Pokhara Budget Trip for Couples",\n  "duration": "7 Days",\n    "budget": "Cheap",\n    "travelers": "Couple",\n  "hotelOptions": [\n    {\n      "hotelName": "Hotel Trekkers Inn",\n      "hotelAddress": "Lakeside, Pokhara, Nepal",\n      "price": 25,\n        "currency": "USD",\n      "hotelImageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/20/c7/7d/hotel-trekkers-inn.jpg?w=700&h=500&s=1",\n      "geoCoordinates": {\n        "latitude": 28.2243,\n        "longitude": 83.9582\n      },\n       "rating": 4.2,\n      "description": "A simple, clean, and well-located hotel in the heart of Lakeside with a lovely garden and friendly staff. Ideal for budget travelers.",\n        "amenities": ["Free Wi-Fi", "Hot water", "Garden", "Restaurant"]\n    },\n      {\n          "hotelName": "Hotel Fewa Holiday Inn",\n          "hotelAddress": "Lakeside, Pokhara, Nepal",\n           "price": 30,\n          "currency": "USD",\n          "hotelImageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4e/7b/78/hotel-fewa-holiday-inn.jpg?w=500&h=400&s=1",\n          "geoCoordinates": {\n              "latitude": 28.2238,\n              "longitude": 83.9591\n          },\n           "rating": 4.0,\n          "description": "A comfortable hotel on Lakeside, offering a good balance of affordability and convenience. It has views of the lake and mountains.",\n           "amenities": ["Free Wi-Fi", "Hot water", "Restaurant", "Lake Views"]\n      },\n      {\n        "hotelName": "Zostel Pokhara",\n        "hotelAddress": "Gaurighat, Lakeside, Pokhara, Nepal",\n        "price": 20,\n          "currency":"USD",\n        "hotelImageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/22/24/2a/zostel-pokhara.jpg?w=700&h=500&s=1",\n        "geoCoordinates": {\n          "latitude": 28.2217,\n          "longitude": 83.9547\n        },\n          "rating": 4.5,\n        "description": "A popular and sociable hostel with private room options, perfect for couples looking for a budget-friendly and fun atmosphere. Great for meeting other travelers.",\n          "amenities": ["Free Wi-Fi", "Common Room", "Social Events", "Restaurant"]\n    }\n  ],\n  "itinerary": {\n      "day1": {\n          "dayTitle": "Arrival & Lakeside Exploration",\n        "bestTimeToVisit": "Morning & Afternoon",\n        "activities": [\n          {\n            "placeName": "Arrival at Pokhara Airport or Bus Park",\n              "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Pokhara_Airport.jpg/1200px-Pokhara_Airport.jpg",\n            "geoCoordinates": {\n              "latitude": 28.1950,\n              "longitude": 83.9757\n            },\n            "ticketPricing": "N/A",\n            "travelTime": "Variable",\n              "description":"Arrival at Pokhara Airport or Bus Park and transport to Lakeside"\n          },\n          {\n              "placeName":"Check-in at Hotel",\n              "placeImageUrl":"https://i.pinimg.com/originals/7d/15/c5/7d15c58bb7d4845e324b94c2e6336e35.jpg",\n              "geoCoordinates": {\n                  "latitude": null,\n                  "longitude": null\n              },\n            "ticketPricing":"N/A",\n            "travelTime":"Variable",\n               "description":"Check-in to the hotel of your choice and refresh yourself."\n          },\n            {\n                "placeName": "Phewa Lake Boating",\n                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Phewa_Lake_Pokhara.jpg/1280px-Phewa_Lake_Pokhara.jpg",\n              "geoCoordinates": {\n              "latitude": 28.2154,\n              "longitude": 83.9588\n            },\n            "ticketPricing": "800-1200 NPR per hour",\n            "travelTime": "10 mins to the boating area",\n              "description":"Enjoy boating in the serene Phewa Lake."\n          },\n          {\n              "placeName": "Barahi Temple Visit",\n              "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Barahi_Temple_Pokhara.jpg/1280px-Barahi_Temple_Pokhara.jpg",\n              "geoCoordinates": {\n              "latitude": 28.2156,\n              "longitude": 83.9585\n             },\n              "ticketPricing": "Free, Boat ride required",\n              "travelTime": "5-10 min boat ride from the shore",\n              "description":"Visit the Barahi Temple located on a small island in Phewa Lake"\n          },\n          {\n            "placeName": "Lakeside Sunset View",\n             "placeImageUrl":"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/97/c8/e5/pokhara-lake.jpg?w=700&h=500&s=1",\n            "geoCoordinates": {\n              "latitude": 28.2195,\n              "longitude": 83.9572\n            },\n            "ticketPricing": "Free",\n            "travelTime": "Walking distance from Lakeside",\n              "description":"Enjoy a romantic sunset view from the shores of Phewa Lake."\n          }\n        ]\n      },\n      "day2": {\n           "dayTitle": "World Peace Pagoda & Devi\'s Falls",\n        "bestTimeToVisit": "Morning for Pagoda, Afternoon for Falls",\n        "activities": [\n            {\n                "placeName": "Hike to World Peace Pagoda",\n                 "placeImageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/World_Peace_Pagoda_Pokhara.jpg/1280px-World_Peace_Pagoda_Pokhara.jpg",\n              "geoCoordinates": {\n                "latitude": 28.2039,\n                "longitude": 83.9637\n              },\n              "ticketPricing": "Free",\n              "travelTime": "1-2 hour hike (can also take a taxi/jeep)",\n               "description":"Enjoy a hike to the World Peace Pagoda and enjoy views of the Pokhara city and the Annapurna Ranges."\n            },\n          {\n            "placeName": "Devi\'s Fall & Gupteshwor Mahadev Cave",\n              "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Devi%27s_Fall.jpg/1280px-Devi%27s_Fall.jpg",\n              "geoCoordinates": {\n              "latitude": 28.2013,\n              "longitude": 83.9491\n            },\n            "ticketPricing": "50 NPR per site",\n            "travelTime": "20 mins by local transport from the LakeSide",\n              "description":"Visit Devi\'s Fall and explore Gupteshwor Mahadev Cave."\n          },\n            {\n                "placeName":"Local Market Visit",\n                "placeImageUrl":"https://myrepublica.nagariknetwork.com/storage/media/2022/July/pokhara-bazaar_07082022090703.jpg",\n                "geoCoordinates": {\n                  "latitude": 28.2221,\n                  "longitude": 83.9697\n                },\n                 "ticketPricing": "Free",\n                "travelTime": "30 mins by local transport from Devi\'s fall",\n                "description": "Visit and explore a local market in Pokhara and shop for souvenirs if you like."\n            }\n        ]\n      },\n    "day3": {\n        "dayTitle":"Sarangkot Sunrise & Old Bazaar",\n      "bestTimeToVisit": "Early Morning",\n      "activities": [\n        {\n            "placeName": "Sunrise at Sarangkot",\n             "placeImageUrl": "https://media.istockphoto.com/id/635724436/photo/sarangkot-sunrise.jpg?s=612x612&w=0&k=20&c=G1Rj2n1t2zB-i3KjL4u8v421d59M1B44g41xR60rI4I=",\n          "geoCoordinates": {\n            "latitude": 28.2581,\n            "longitude": 83.9222\n          },\n          "ticketPricing": "Free, transportation cost applies",\n          "travelTime": "30-45 min taxi/jeep ride from Lakeside",\n            "description":"Wake up early to witness a magnificent sunrise view over the Himalayas from Sarangkot."\n        },\n           {\n          "placeName":"Pokhara Old Bazaar Visit",\n          "placeImageUrl":"https://i.ytimg.com/vi/3u5R1b13i8Q/maxresdefault.jpg",\n          "geoCoordinates": {\n              "latitude": 28.2221,\n              "longitude": 83.9697\n          },\n               "ticketPricing": "Free",\n               "travelTime": "45 mins by local transport from Sarangkot.",\n                "description":"Visit the oldest market in Pokhara for a more local experience."\n        },\n            {\n                "placeName":"Relaxing Lakeside Walk",\n                "placeImageUrl":"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/ca/63/e1/phewa-lake.jpg?w=700&h=500&s=1",\n                 "geoCoordinates": {\n                "latitude": 28.2206,\n                "longitude": 83.9569\n              },\n              "ticketPricing": "Free",\n              "travelTime":"Short walk from the main Lakeside area",\n                "description": "Relax and unwind after the early morning trek in the shores of the Phewa lake."\n            }\n      ]\n    },\n      "day4": {\n         "dayTitle": "Begnas Lake & Rural Exploration",\n        "bestTimeToVisit": "Daytime",\n        "activities": [\n          {\n            "placeName": "Bus Ride to Begnas Lake",\n              "placeImageUrl":"https://media.istockphoto.com/id/516238562/photo/begnas-lake-pokhara-nepal.jpg?s=612x612&w=0&k=20&c=rJtT_F26i6r8l9W56-hU_1bWpYvP1f24Xo15qWJ63f4=",\n              "geoCoordinates": {\n              "latitude": 28.1966,\n              "longitude": 84.0431\n            },\n            "ticketPricing": "50-80 NPR",\n            "travelTime": "45-60 min local bus ride from Lakeside",\n              "description":"Travel to the peaceful Begnas Lake and enjoy the scenic bus ride."\n          },\n          {\n            "placeName": "Begnas Lake Activities",\n              "placeImageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Begnas_Lake.jpg/1280px-Begnas_Lake.jpg",\n              "geoCoordinates": {\n              "latitude": 28.1966,\n              "longitude": 84.0431\n            },\n              "ticketPricing":"Free (Boating Extra)",\n             "travelTime":"Walking distance from the Begnas Lake Bus stop",\n              "description": "Enjoy boating, swimming or simply relaxing in the serene and less crowded Begnas lake."\n          },\n            {\n                "placeName": "Rural Village Walk",\n                "placeImageUrl":"https://i.ytimg.com/vi/kG7wYh-48uA/maxresdefault.jpg",\n                "geoCoordinates": {\n                 "latitude": 28.1947,\n                  "longitude": 84.0450\n                },\n                "ticketPricing": "Free",\n                "travelTime":"Walking distance from the lake",\n                 "description":"Explore the surrounding villages to witness the rural life of Pokhara"\n\n            }\n        ]\n      },\n    "day5": {\n         "dayTitle": "Hiking & Davis Fall Area",\n        "bestTimeToVisit": "Morning",\n        "activities": [\n            {\n                "placeName":"Hiking in the Hills near Davis fall",\n                 "placeImageUrl":"https://i.ytimg.com/vi/sJ_40v7t-78/maxresdefault.jpg",\n                 "geoCoordinates": {\n                "latitude": 28.2013,\n                  "longitude": 83.9491\n              },\n                "ticketPricing": "Free",\n                "travelTime": "Local Bus or Taxi",\n                "description":"Explore some local trails around the Davis Falls."\n\n            },\n             {\n                 "placeName": "Revisit Davis Fall & Gupteshwor Cave",\n                  "placeImageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Devi%27s_Fall.jpg/1280px-Devi%27s_Fall.jpg",\n                "geoCoordinates": {\n                "latitude": 28.2013,\n                "longitude": 83.9491\n              },\n              "ticketPricing": "50 NPR per site",\n              "travelTime": "Walking distance from the surrounding trails",\n                 "description":"You can visit and explore the area in details this time."\n           }\n          ]\n      },\n      "day6": {\n         "dayTitle": "Adventure or Relaxation",\n        "bestTimeToVisit": "Flexible",\n        "activities": [\n            {\n                "placeName": "Optional: Paragliding from Sarangkot",\n                  "placeImageUrl":"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/19/88/03/paragliding-in-pokhara.jpg?w=700&h=500&s=1",\n                   "geoCoordinates": {\n                  "latitude": 28.2581,\n                   "longitude": 83.9222\n                  },\n                "ticketPricing": "60 - 80 USD",\n                 "travelTime": "Local transport",\n                "description": "Optional activity for couples who want to experience the thrill of paragliding."\n            },\n           {\n                "placeName": "Relaxing lakeside activities",\n                "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fewa_Lake_Pokhara_Nepal.jpg/1280px-Fewa_Lake_Pokhara_Nepal.jpg",\n                   "geoCoordinates": {\n                    "latitude": 28.2206,\n                    "longitude": 83.9569\n                 },\n                   "ticketPricing":"Free",\n                    "travelTime":"Walking distance from the hotels",\n                "description":"Enjoy a relaxing evening by the Phewa lake."\n           },\n             {\n                 "placeName": "Local Massage",\n                "placeImageUrl": "https://www.karnalifoundation.org/wp-content/uploads/2023/06/293479630_10159490770108782_134557338125951420_n-scaled.jpg",\n                "geoCoordinates": {\n                  "latitude": null,\n                    "longitude": null\n                },\n                  "ticketPricing":"N/A",\n                   "travelTime":"Walking distance from the hotels",\n                "description":"Enjoy a local massage in one of the parlors in the city."\n\n             }\n        ]\n      },\n    "day7": {\n        "dayTitle": "Departure",\n        "bestTimeToVisit": "Morning",\n        "activities": [\n          {\n            "placeName": "Departure from Pokhara",\n               "placeImageUrl":"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/2b/43/b0/pokhara-airport.jpg?w=700&h=500&s=1",\n            "geoCoordinates": {\n              "latitude": 28.1950,\n              "longitude": 83.9757\n            },\n              "ticketPricing":"N/A",\n              "travelTime": "Variable",\n             "description":"Head to Pokhara Airport or Bus Park for your onward journey."\n          }\n        ]\n      }\n  },\n    "estimatedDailyBudget":{\n      "Accommodation": "20 - 35 USD",\n        "Food":"20-25 USD",\n        "Transportation":"5 - 10 USD",\n        "Activities":"10-20 USD",\n        "Total":"55 - 90 USD"\n    },\n  "notes": [\n    "Prices are estimates and can vary.",\n    "Bargaining is common in local markets.",\n    "Always carry sufficient cash.",\n     "Be respectful of local culture and traditions."\n\n  ]\n}\n```\n**Explanation of the JSON Structure:**\n\n*   **`tripTitle`**, **`duration`**, **`budget`**, **`travelers`**: Basic trip information.\n*   **`hotelOptions`**: An array of hotel objects. Each hotel includes `hotelName`, `hotelAddress`, `price`, `hotelImageUrl`, `geoCoordinates` (latitude and longitude), `rating`, and a `description`.\n*   **`itinerary`**: Contains each day\'s activities.\n    *   Each day has a `dayTitle`, `bestTimeToVisit` and an `activities` array.\n    *   Each activity object includes `placeName`, `placeImageUrl`, `geoCoordinates`, `ticketPricing`, and `travelTime`.\n* **`estimatedDailyBudget`**: Provides estimate per day per couple.\n*   **`notes`**: Important things to keep in mind.\n\n**How to Use This JSON:**\n\n*   This data can be easily parsed and used in a web or mobile application to display the trip plan.\n*   You can use the `geoCoordinates` to display places on a map.\n*   The `ticketPricing` and `travelTime` can be used to help plan transportation.\n*   The `hotelOptions` can be displayed in a list, allowing users to choose and book.\n\nThis JSON structure is flexible and can be easily expanded with more details as needed. This should help your clients plan a great budget trip to Pokhara!\n',
        },
      ],
    },
  ],
});
