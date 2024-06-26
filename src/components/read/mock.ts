export interface WordType {
  word: string;
  phonetic: string;
  phonetics: Array<{ text: string; audio: string; sourceUrl: string }>;
  meanings: Array<{
    // 词性
    partOfSpeech: string;
    definitions: {
      definition: string;
      // 同义词
      synonyms: string[],
      // 反义词
      antonyms: string[]
    }[]
  }>;
}


export const mockData = [
  {
    "word": "apple",
    "phonetic": "/ˈæp.əl/",
    "phonetics": [
      {
        "text": "/ˈæp.əl/",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/apple-uk.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9014262",
        "license": {
          "name": "BY 3.0 US",
          "url": "https://creativecommons.org/licenses/by/3.0/us"
        }
      },
      {
        "text": "/ˈæp.əl/",
        "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/apple-us.mp3",
        "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=718877",
        "license": {
          "name": "BY-SA 3.0",
          "url": "https://creativecommons.org/licenses/by-sa/3.0"
        }
      }
    ],
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "A common, round fruit produced by the tree Malus domestica, cultivated in temperate climates.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "Any of various tree-borne fruits or vegetables especially considered as resembling an apple; also (with qualifying words) used to form the names of other specific fruits such as custard apple, rose apple, thorn apple etc.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "The fruit of the Tree of Knowledge, eaten by Adam and Eve according to post-Biblical Christian tradition; the forbidden fruit.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "A tree of the genus Malus, especially one cultivated for its edible fruit; the apple tree.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "The wood of the apple tree.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "(in the plural) Short for apples and pears, slang for stairs.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "The ball in baseball.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "When smiling, the round, fleshy part of the cheeks between the eyes and the corners of the mouth.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "A Native American or red-skinned person who acts and/or thinks like a white (Caucasian) person.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "(ice hockey slang) An assist.",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": [],
        "antonyms": []
      },
      {
        "partOfSpeech": "verb",
        "definitions": [
          {
            "definition": "To become apple-like.",
            "synonyms": [],
            "antonyms": []
          },
          {
            "definition": "To form buds.",
            "synonyms": [],
            "antonyms": []
          }
        ],
        "synonyms": [],
        "antonyms": []
      }
    ],
    "license": {
      "name": "CC BY-SA 3.0",
      "url": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "sourceUrls": [
      "https://en.wiktionary.org/wiki/apple"
    ]
  }
]