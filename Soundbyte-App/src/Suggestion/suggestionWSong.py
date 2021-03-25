#Temp python script, returns fake data.
import sys
import json
import math

g = open("./log.txt","w")
thisdict = {
    "songs": [
        {
            "songName": "song1New",
            "author": "auth1",
            "features": {
                "bpm": 100,
                "key": "A",
                "scale": "Minor" 
            }
        },
        {
            "songName": "song2New",
            "author": "auth2",
            "features": {
                "bpm": 200,
                "key": "B",
                "scale": "Major" 
            }
        },
        {
            "songName": "song3New",
            "author": "auth3",
            "features": {
                "bpm": 300,
                "key": "C",
                "scale": "Minor" 
            }
        }

    ]
}

#inputFeatures = json.loads(sys.argv)
#print(sys.argv[1])
#input = sys.argv[1]
#songFeat = json.loads(input) #input = sys.argv[1]
inputValue = json.loads(sys.argv[1])

with open('./Libraries/songLibrary/library.json') as f:
    data = json.load(f)

songResults = dict()
for d in data['songs']:
    score = d['features']['bpm']
    songResults[score] = d

output = list()
for song in songResults.values():
    output.append(song)

#for value in songResults.items():
    #output += json.dumps(value)
print(json.dumps(output))
#inputValue = json.loads(inputTemp)
#print(inputValue["songName"])
#output = json.dumps(data)
#print(inputValue)
#output = json.loads(sys.argv[0])
#g.write(sys.argv[1])
#print(sys.argv[1],flush =True)
sys.stdout.flush()